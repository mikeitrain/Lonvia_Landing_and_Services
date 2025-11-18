import { LoadingService } from './loadingService';
import { User } from '@/types/user';
import { HttpError, HttpErrorCode } from '@/types/httpError';
import { fetchAuthSession } from 'aws-amplify/auth';
import { authService } from '@/services/authService';
import { Case, CaseListPaginatedResponse } from '@/types/case';
import { CaseStatus } from '@/types/status';
import { AppointmentList } from '@/types/appointment';
import { DoctorFilters, DoctorProfile, PaginatedDoctorResponse, Specialty, Subspecialty } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type HttpHeaders = Record<string, string>;

interface RequestConfig {
    headers?: HttpHeaders;
    params?: Record<string, string>;
    signal?: AbortSignal;
}

interface RequestConfigWithBody extends RequestConfig {
    body?: unknown;
}

export class HttpService {
    private static instance: HttpService | null = null;
    private baseUrl: string;
    private defaultHeaders: HttpHeaders;
    private activeRequests: Map<string, AbortController>;
    private requestCounter: number = 0;

    private constructor(baseUrl?: string) {
        if (!baseUrl && !API_BASE_URL) {
            throw new Error('API base URL is not configured. Please set NEXT_PUBLIC_API_BASE_URL in your .env file');
        }
        this.baseUrl = baseUrl || API_BASE_URL!;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
        };
        this.activeRequests = new Map();
    }

    public static getInstance(baseUrl?: string): HttpService {
        if (!HttpService.instance) {
            HttpService.instance = new HttpService(baseUrl);
        }
        return HttpService.instance;
    }

    public static resetInstance(): void {
        HttpService.instance = null;
    }

    // ------------------- Public methods -------------------------
    public cancelRequest(requestId: string): void {
        const controller = this.activeRequests.get(requestId);
        if (controller) {
            controller.abort();
            this.activeRequests.delete(requestId);
        }
    }

    public cancelAllRequests(): void {
        this.activeRequests.forEach(controller => controller.abort());
        this.activeRequests.clear();
    }
    // ------------------------------------------------------------

    // ------------------ Private methods -------------------------
    private generateRequestId(prefix: string = 'req'): string {
        this.requestCounter++;
        return `${prefix}_${Date.now()}_${this.requestCounter}`;
    }

    private async handleResponse<T>(response: Response): Promise<T> {
        if (!response.ok) {
            // Try to get error message from response body
            let errorMessage: string | undefined;
            let errorType: string | undefined;
            try {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorData.error;
                    const headerErrorType = response.headers.get('x-amzn-ErrorType') || response.headers.get('x-amzn-errortype');
                    const bodyErrorType = errorData.__type;
                    const rawType: string | undefined = headerErrorType || bodyErrorType;
                    if (rawType) {
                        // Some AWS error types come as "Type:detail"; we only want the type prefix
                        errorType = String(rawType).split(':')[0];
                    }
                } else {
                    errorMessage = await response.text();
                }
            } catch {
                // If we can't parse the error response, use default message
                errorMessage = undefined;
            }

            throw new HttpError({ 
                code: response.status as HttpErrorCode, 
                message: errorMessage,
                type: errorType,
            });
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return response.json();
        }
        return response.text() as Promise<T>;
    }

    private buildUrl(path: string, params?: Record<string, string>): string {
        const url = new URL(`${this.baseUrl}${path}`);
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                url.searchParams.append(key, value);
            });
        }
        return url.toString();
    }

    private createRequestController(requestId: string): AbortController {
        this.cancelRequest(requestId);
        const controller = new AbortController();
        this.activeRequests.set(requestId, controller);
        return controller;
    }

    /**
     * Perform a fetch call and on 401 try to refresh the session and retry once.
     * If refresh or retry fails, perform a global logout and rethrow the error.
     */
    private async performFetchWithAuthRetry<T>(url: string, init: RequestInit): Promise<T> {
        try {
            const response = await fetch(url, init);
            return await this.handleResponse<T>(response);
        } catch (error) {
            if (error instanceof HttpError && error.code === 401) {
                try {
                    await fetchAuthSession({ forceRefresh: true });
                    const refreshedHeaders = await this.addAuthHeaders((init.headers as HttpHeaders) || {}, url);
                    const retryResponse = await fetch(url, { ...init, headers: refreshedHeaders });
                    return await this.handleResponse<T>(retryResponse);
                } catch (retryError) {
                    try {
                        await authService.logout();
                    } catch {
                        // Ignore logout errors; we'll still redirect via global error handling
                    }
                    // Prefer throwing the retry error if it's an HttpError, else rethrow original
                    if (retryError instanceof HttpError) {
                        throw retryError;
                    }
                    throw error;
                }
            }
            throw error;
        }
    }

    /**
     * Interceptor that adds authorization headers to requests
     * Skips auth header for public endpoints and S3 URLs
     */
    private async addAuthHeaders(headers: HttpHeaders, url: string): Promise<HttpHeaders> {
        // Skip auth header for public endpoints and S3 URLs
        if (url.includes('/auth') || url.includes('/public') || url.includes('s3.')) {
            return headers;
        }

        const session = await fetchAuthSession();
        const token = session.tokens?.accessToken?.toString();
        
        if (token) {
            return {
                ...headers,
                'Authorization': `Bearer ${token}`
            };
        }

        return headers;
    }
    // ------------------------------------------------------------

    // ----------------- Generic API calls ------------------------
    async get<T>(path: string, config: RequestConfig = {}): Promise<T> {
        const requestId = this.generateRequestId(`get_${path}`);
        const controller = this.createRequestController(requestId);
        const signal = config.signal || controller.signal;
        const url = this.buildUrl(path, config.params);

        return LoadingService.withLoading(
            (async () => {
                try {
                    const headers = await this.addAuthHeaders({
                        ...this.defaultHeaders,
                        ...config.headers,
                    }, url);

                    return await this.performFetchWithAuthRetry<T>(url, {
                        method: 'GET',
                        headers,
                        signal,
                    });
                } finally {
                    this.activeRequests.delete(requestId);
                }
            })(),
            requestId
        );
    }

    async post<T>(path: string, config: RequestConfigWithBody = {}): Promise<T> {
        const requestId = this.generateRequestId(`post_${path}`);
        const controller = this.createRequestController(requestId);
        const signal = config.signal || controller.signal;
        const url = this.buildUrl(path, config.params);

        return LoadingService.withLoading(
            (async () => {
                try {
                    const headers = await this.addAuthHeaders({
                        ...this.defaultHeaders,
                        ...config.headers,
                    }, url);

                    return await this.performFetchWithAuthRetry<T>(url, {
                        method: 'POST',
                        headers,
                        signal,
                        body: config.body ? JSON.stringify(config.body) : undefined,
                    });
                } finally {
                    this.activeRequests.delete(requestId);
                }
            })(),
            requestId
        );
    }

    async put<T>(path: string, config: RequestConfigWithBody = {}): Promise<T> {
        const requestId = this.generateRequestId(`put_${path}`);
        const controller = this.createRequestController(requestId);
        const signal = config.signal || controller.signal;
        const url = this.buildUrl(path, config.params);

        return LoadingService.withLoading(
            (async () => {
                try {
                    const headers = await this.addAuthHeaders({
                        ...this.defaultHeaders,
                        ...config.headers,
                    }, url);

                    return await this.performFetchWithAuthRetry<T>(url, {
                        method: 'PUT',
                        headers,
                        signal,
                        body: config.body ? JSON.stringify(config.body) : undefined,
                    });
                } finally {
                    this.activeRequests.delete(requestId);
                }
            })(),
            requestId
        );
    }

    async delete<T>(path: string, config: RequestConfig = {}): Promise<T> {
        const requestId = this.generateRequestId(`delete_${path}`);
        const controller = this.createRequestController(requestId);
        const signal = config.signal || controller.signal;
        const url = this.buildUrl(path, config.params);

        return LoadingService.withLoading(
            (async () => {
                try {
                    const headers = await this.addAuthHeaders({
                        ...this.defaultHeaders,
                        ...config.headers,
                    }, url);

                    return await this.performFetchWithAuthRetry<T>(url, {
                        method: 'DELETE',
                        headers,
                        signal,
                    });
                } finally {
                    this.activeRequests.delete(requestId);
                }
            })(),
            requestId
        );
    }
    // ------------------------------------------------------------

    // ----------------- Custom API calls -------------------------

    async getUser(): Promise<User> {
        return (await this.get<User>('/user'));
    }

    async updateUser(user: User): Promise<User> {
        return (await this.put<User>('/user', { body: user }));
    }

    async getAllCases(): Promise<CaseListPaginatedResponse> {
        return (await this.get<CaseListPaginatedResponse>('/case'));
    }

    async getCaseById(id: string): Promise<Case> {
        return (await this.get<Case>(`/case/${id}`));
    }

    async createCase(caseData: { has_diagnosis?: boolean; symptoms?: Array<{ description: string; duration: string; severity: string; custom_notes?: string | null }>; custom_notes?: string | null; attachments?: Array<{ id: number; originalName?: string | null; type: { name: string } }> }): Promise<Case> {
        return (await this.post<Case>('/case', { body: caseData }));
    }

    async updateCase(id: string, caseData: Case): Promise<Case> {
        return (await this.put<Case>(`/case/${id}`, { body: caseData }));
    }

    async sendOffer(params: { caseId: string }, payload: { text: string; amount_gross: number }): Promise<Case> {
        return (await this.post<Case>(`/admin/send-offer`, { params, body: payload }));
    }

    async acceptOffer(caseId: string): Promise<Case> {
        return (await this.get<Case>(`/case/${caseId}/accept-offer`));
    }

    async getWorkInProcessCases(): Promise<CaseListPaginatedResponse> {
        return (await this.get<CaseListPaginatedResponse>('/case/work-in-process'));
    }

    async getWaitingForUserCases(): Promise<CaseListPaginatedResponse> {
        return (await this.get<CaseListPaginatedResponse>('/case/waiting-for-user'));
    }

    async getCasesByStatus(statusList: CaseStatus[]): Promise<CaseListPaginatedResponse> {
        return (await this.get<CaseListPaginatedResponse>('/case/by-status', { params: { statusList: statusList.join(',') } }));
    }

    async createAttachment(payload: { caseId?: number; originalName?: string | null; url?: string | null; description?: string | null; type?: { name: string } | null; is_diagnosis?: boolean }): Promise<{ url?: string | null; attachmentId?: number }> {
        return (await this.post<{ url?: string | null; attachmentId?: number }>(`/case/attachment`, { body: payload }));
    }

    async getAttachmentUrl(params: { attachmentId: string; caseId: number }): Promise<{ url: string }> {
        return (await this.get<{ url: string }>(`/case/attachment`, { params: { attachmentId: params.attachmentId, caseId: String(params.caseId) } }));
    }

    async deleteAttachment(params: { attachmentId: string; caseId?: number | null }): Promise<{ message: string }> {
        const qp: Record<string, string> = { attachmentId: params.attachmentId };
        if (typeof params.caseId === 'number') {
            qp.caseId = String(params.caseId);
        }
        return (await this.delete<{ message: string }>(`/case/attachment`, { params: qp }));
    }

    async getDocumentUrl(params: { caseId: string; docType: string }): Promise<{ url: string }> {
        return (await this.get<{ url: string }>(`/case/document`, { params }));
    }

    async markInvoicePaid(params: { caseId: string }): Promise<Case> {
        return (await this.post<Case>(`/admin/invoice-paid`, { params }));
    }

    async suggestAppointment(payload: { caseId: number; doctorId: number; suggestedAppointments: AppointmentList }): Promise<Case> {
        return (await this.post<Case>(`/admin/suggest-appointment`, { body: payload }));
    }

    async getAllDoctors(filters: DoctorFilters): Promise<PaginatedDoctorResponse> {
        const params: Record<string, string> = {};
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined) {
                params[key] = String(value);
            }
        });
        return (await this.get<PaginatedDoctorResponse>('/doctor', { params }));
    }

    async getDoctorSelf(): Promise<DoctorProfile> {
        return (await this.get<DoctorProfile>('/doctor/self'));
    }

    async upsertDoctor(doctor: DoctorProfile, queryParams?: Record<string, string>): Promise<DoctorProfile> {
        return (await this.post<DoctorProfile>('/doctor', { body: doctor, params: queryParams }));
    }

    async deleteDoctor(id: string): Promise<{ message: string }> {
        return (await this.delete<{ message: string }>(`/doctor`, { params: { id: id } }));
    }

    async getAllSpecialties(): Promise<Specialty[]> {
        return (await this.get<Specialty[]>('/admin/specialty'));
    }

    async upsertSpecialty(specialty: Specialty): Promise<Specialty> {
        return (await this.post<Specialty>('/admin/specialty', { body: specialty }));
    }

    async deleteSpecialty(id: string): Promise<{ message: string }> {
        return (await this.delete<{ message: string }>(`/admin/specialty`, { params: { id: id } }));
    }

    async getAllSubspecialties(specialtyId: number): Promise<Subspecialty[]> {
        return (await this.get<Subspecialty[]>('/admin/subspecialty', { params: { specialtyId: String(specialtyId) } }));
    }

    async upsertSubspecialty(subspecialty: Subspecialty, specialtyId: number): Promise<Subspecialty> {
        return (await this.post<Subspecialty>('/admin/subspecialty', { body: subspecialty, params: { specialtyId: String(specialtyId) } }));
    }

    async deleteSubspecialty(id: string): Promise<{ message: string }> {
        return (await this.delete<{ message: string }>(`/admin/subspecialty`, { params: { id: id } }));
    }

    async acceptAppointment(appointmentId: string, caseId: string): Promise<Case> {
        return (await this.get<Case>(`/case/appointment`, { params: { appointmentId: appointmentId, caseId: caseId } }));
    }

    async declineAppointment(caseId: string): Promise<Case> {
        return (await this.delete<Case>(`/case/appointment`, { params: { caseId: caseId } }));
    }

    // ------------------------------------------------------------
}