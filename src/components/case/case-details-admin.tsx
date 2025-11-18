import React, { useEffect, useState } from 'react';
import Divider from '@/components/common/Divider';
import { CurrencyInputFieldControlled } from '@/components/common/CurrencyInputField';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { Case } from '@/types/case';
import { useLanguage } from '@/contexts/LanguageContext';
import { StatusUtils } from '@/lib/statusUtils';
import { CaseStatus, CASE_STATUS } from '@/types/status';
import { HttpService } from '@/services/httpService';
import { fetchAuthSession } from 'aws-amplify/auth';
import { DoctorProfile } from '@/types/doctor';
import { formatDate, formatTime } from '@/lib/utils';

interface CaseDetailsAdminProps {
    caseData: Case;
    onCaseUpdated?: (updated: Case) => void;
    doctors?: DoctorProfile[];
}

const CaseDetailsAdmin: React.FC<CaseDetailsAdminProps> = ({ caseData, onCaseUpdated, doctors = [] }) => {
    const { t, translateStatus, language } = useLanguage();
    const [adminNotes, setAdminNotes] = useState<string>(caseData.admin_notes || '');
    const [nextStatus, setNextStatus] = useState<string>('');
    const [appointmentDate1, setAppointmentDate1] = useState<string>('');
    const [appointmentDate2, setAppointmentDate2] = useState<string>('');
    const [appointmentDuration, setAppointmentDuration] = useState<number>(30);
    const [appointmentError, setAppointmentError] = useState<string>('');
    const [selectedDoctorId, setSelectedDoctorId] = useState<number | ''>('');

    // Calculate minimum date (2 days from now) for appointment selection
    const getMinAppointmentDate = () => {
        const now = new Date();
        const twoDaysFromNow = new Date(now.getTime() + (2 * 24 * 60 * 60 * 1000));
        return twoDaysFromNow.toISOString().slice(0, 16); // Format for datetime-local input
    };
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [offerAmount, setOfferAmount] = useState<string>('');
    const [offerText, setOfferText] = useState<string>('');

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const session = await fetchAuthSession();
                const idPayload = session.tokens?.idToken?.payload as Record<string, unknown> | undefined;
                const groups = (idPayload?.['cognito:groups'] as string[] | undefined) || [];
                if (mounted) setIsAdmin(groups.includes('admin'));
            } catch {
                if (mounted) setIsAdmin(false);
            }
        })();
        return () => { mounted = false; };
    }, []);

    const currentStatus = StatusUtils.toCaseStatus(caseData.status?.name || '');
    const validNextStatuses: CaseStatus[] = currentStatus ? StatusUtils.getValidTransitions(currentStatus as CaseStatus) : [];

    // Row enablement based on status
    const canEditNotes = currentStatus ? StatusUtils.isActiveStatus(currentStatus as CaseStatus) : false;
    const canSendOffer = currentStatus === CASE_STATUS.NEW;
    const canMarkPaid = currentStatus === CASE_STATUS.WAITING_FOR_PAYMENT;
    const canSetAppointment = currentStatus === CASE_STATUS.PAID;

    useEffect(() => {
        setAdminNotes(caseData.admin_notes || '');
    }, [caseData.id, caseData.admin_notes]);

    const handleSaveNotes = async () => {
        if (!caseData.id) return;
        const http = HttpService.getInstance();
        const payload: Partial<Case> = {};
        payload.admin_notes = adminNotes;
        const updated = await http.updateCase(String(caseData.id), payload as Case);
        if (onCaseUpdated) onCaseUpdated(updated);
    };

    const handleSetStatus = async () => {
        if (!caseData.id || !nextStatus) return;
        const http = HttpService.getInstance();
        const payload: Partial<Case> = {};
        const statusPayload = { id: 0 as number, name: nextStatus as CaseStatus } as unknown as NonNullable<Case['status']>;
        payload.status = statusPayload;
        const updated = await http.updateCase(String(caseData.id), payload as Case);
        if (onCaseUpdated) onCaseUpdated(updated);
    };


    const handleSendOffer = async () => {
        if (!caseData.id) return;
        const http = HttpService.getInstance();
        const amount = Number(offerAmount);
        if (!offerText || !amount || amount <= 0) return;
        const updated = await http.sendOffer({ caseId: String(caseData.id) }, { text: offerText, amount_gross: amount });
        if (onCaseUpdated) onCaseUpdated(updated);
    };

    const handleMarkInvoicePaid = async () => {
        if (!caseData.id) return;
        const http = HttpService.getInstance();
        const updated = await http.markInvoicePaid({ caseId: String(caseData.id) });
        if (onCaseUpdated) onCaseUpdated(updated);
    };

    const handleSetAppointment = async () => {
        if (!caseData.id) return;
        
        // Clear any previous errors
        setAppointmentError('');
        
        // Validate that at least one appointment date is filled
        if (!appointmentDate1 && !appointmentDate2) {
            setAppointmentError(t('case.details.appointmentError'));
            return;
        }
        
        // Validate that a doctor is selected
        if (!selectedDoctorId) {
            setAppointmentError(t('case.details.doctorError'));
            return;
        }
        
        const http = HttpService.getInstance();
        const suggestedAppointments = [];
        
        if (appointmentDate1) {
            suggestedAppointments.push({
                scheduledStart: appointmentDate1,
                meetingStatus: 'suggested',
                durationMinutes: appointmentDuration
            });
        }
        
        if (appointmentDate2) {
            suggestedAppointments.push({
                scheduledStart: appointmentDate2,
                meetingStatus: 'suggested',
                durationMinutes: appointmentDuration
            });
        }
        
        const payload = {
            caseId: caseData.id,
            doctorId: selectedDoctorId,
            suggestedAppointments: suggestedAppointments
        };
        
        const updated = await http.suggestAppointment(payload);
        if (onCaseUpdated) onCaseUpdated(updated);
        
        // Clear the appointment dates and doctor selection after successful submission
        setAppointmentDate1('');
        setAppointmentDate2('');
        setSelectedDoctorId('');
    };

    if (!isAdmin) return null;

    const buttonWidthClass = 'w-48';

    return (
        <div className="mb-6 bg-background-secondary rounded-lg border border-border-primary p-4 space-y-4">
            <h2 className="text-lg font-semibold text-foreground-primary">{t('admin.panel.title') || 'Admin Panel'}</h2>

            {/* Divider between rows */}
            <Divider marginClass="my-1" />

            {/* Row 1: Notes + Save button */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                <div className="md:col-span-4">
                    <label className="block text-sm font-medium text-foreground-secondary mb-1">{t('case.details.notes') || 'Notes'}</label>
                    <textarea
                        className="w-full input-field min-h-[80px] disabled:opacity-60 disabled:cursor-not-allowed"
                        value={adminNotes}
                        onChange={(e) => setAdminNotes(e.target.value)}
                        disabled={!canEditNotes}
                    />
                </div>
                <div className="md:col-span-1 flex md:justify-end">
                    <button disabled={!canEditNotes} onClick={handleSaveNotes} className={`bg-primary-600 text-white px-4 py-2 rounded-md font-medium hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed ${buttonWidthClass}`}>{t('common.save') || 'Save'}</button>
                </div>
            </div>

            {/* Divider */}
            <Divider marginClass="my-3" />

            {/* Row 2: Offer amount (left) + Send offer (right) */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                <div className="md:col-span-3">
                    <label className="block text-sm font-medium text-foreground-secondary mb-1">{t('offer.text') || 'Offer text'}</label>
                    <textarea
                        className="w-full input-field min-h-[80px] disabled:opacity-60 disabled:cursor-not-allowed"
                        value={offerText}
                        onChange={(e) => setOfferText(e.target.value)}
                        disabled={!canSendOffer}
                    />
                </div>
                <div className="md:col-span-1 h-full">
                    <CurrencyInputFieldControlled
                        label={t('offer.amount') || 'Amount'}
                        value={offerAmount}
                        onChange={(e) => setOfferAmount(e.target.value)}
                        disabled={!canSendOffer}
                        placeholder={t('offer.amount') || 'Amount'}
                    />
                </div>
                <div className="md:col-span-1 flex md:justify-end">
                    <button disabled={!canSendOffer} onClick={handleSendOffer} className={`bg-primary-600 text-white px-4 py-2 rounded-md font-medium hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed ${buttonWidthClass}`}>{t('offer.send') || 'Send offer'}</button>
                </div>
            </div>

            {/* Divider */}
            <Divider marginClass="my-3" />

            {/* Row 3: Mark invoice as paid (right aligned) */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                <div className="md:col-span-4" />
                <div className="md:col-span-1 flex md:justify-end">
                    <button disabled={!canMarkPaid} onClick={handleMarkInvoicePaid} className={`bg-primary-600 text-white px-4 py-2 rounded-md font-medium hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed ${buttonWidthClass}`}>{t('invoice.paid') || 'Paid'}</button>
                </div>
            </div>

            {/* Divider */}
            <div className="my-3 flex justify-center">
                <div className="h-[1px] w-full" style={{ backgroundColor: 'var(--border-secondary)' }} />
            </div>

            {/* Row 4: Existing Appointments */}
            {caseData.appointments && caseData.appointments.length > 0 && (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground-primary">
                        {t('case.details.existingAppointments') || 'Existing Appointments'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {caseData.appointments.map((appointment) => {
                            const statusColor = appointment.meetingStatus === 'accepted' ? 'bg-green-100 border-green-300 text-green-800' :
                                              appointment.meetingStatus === 'suggested' ? 'bg-blue-100 border-blue-300 text-blue-800' :
                                              appointment.meetingStatus === 'declined' ? 'bg-red-100 border-red-300 text-red-800' :
                                              appointment.meetingStatus === 'completed' ? 'bg-gray-100 border-gray-300 text-gray-800' :
                                              appointment.meetingStatus === 'canceled' ? 'bg-orange-100 border-orange-300 text-orange-800' :
                                              'bg-gray-100 border-gray-300 text-gray-800';
                            
                            return (
                                <div key={appointment.id} className={`border rounded-lg p-4 ${statusColor}`}>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-start">
                                            <div className="text-sm font-medium">
                                                {formatDate(appointment.scheduledStart, language)} - {formatTime(appointment.scheduledStart, language)}
                                            </div>
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColor}`}>
                                                {appointment.meetingStatus}
                                            </span>
                                        </div>
                                        <div className="flex justify-between items-start">
                                            {appointment.doctorName && (
                                                <div className="text-sm font-medium">
                                                    {appointment.doctorName}
                                                </div>
                                            )}
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColor}`}>
                                                {appointment.durationMinutes} min
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Row 5: Appointment suggestions */}
            <div className="space-y-4">
                {canSetAppointment && (
                <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                    <p className="text-sm text-blue-800">
                        <strong>{t('case.details.timezoneInfo.title') || 'Hinweis:'}</strong> {t('case.details.timezoneInfo.message') || 'Die eingegebene Zeit ist immer in deutscher Zeit (GMT+2).'}
                    </p>
                </div>
                )}

                {/* Appointment Details Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-foreground-secondary mb-1">
                            {t('case.details.appointmentDate')} 1
                        </label>
                        <input
                            type="datetime-local"
                            className={`w-full input-field disabled:opacity-60 disabled:cursor-not-allowed ${
                                appointmentError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                            }`}
                            value={appointmentDate1}
                            min={getMinAppointmentDate()}
                            onChange={(e) => {
                                setAppointmentDate1(e.target.value);
                                // Clear error when user starts typing
                                if (appointmentError) {
                                    setAppointmentError('');
                                }
                            }}
                            disabled={!canSetAppointment}
                        />
                        {appointmentError && (
                            <p className="mt-1 text-sm text-red-600">{appointmentError}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-foreground-secondary mb-1">
                            {t('case.details.appointmentDate')} 2
                        </label>
                        <input
                            type="datetime-local"
                            className="w-full input-field disabled:opacity-60 disabled:cursor-not-allowed"
                            value={appointmentDate2}
                            min={getMinAppointmentDate()}
                            onChange={(e) => {
                                setAppointmentDate2(e.target.value);
                                // Clear error when user starts typing
                                if (appointmentError) {
                                    setAppointmentError('');
                                }
                            }}
                            disabled={!canSetAppointment}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-foreground-secondary mb-1">
                            {t('case.details.duration')}
                        </label>
                        <select
                            className="w-full input-field disabled:opacity-60 disabled:cursor-not-allowed"
                            value={appointmentDuration}
                            onChange={(e) => setAppointmentDuration(Number(e.target.value))}
                            disabled={!canSetAppointment}
                        >
                            <option value={10}>{t('case.details.durationOptions.10min')}</option>
                            <option value={15}>{t('case.details.durationOptions.15min')}</option>
                            <option value={20}>{t('case.details.durationOptions.20min')}</option>
                            <option value={30}>{t('case.details.durationOptions.30min')}</option>
                            <option value={45}>{t('case.details.durationOptions.45min')}</option>
                            <option value={60}>{t('case.details.durationOptions.60min')}</option>
                            <option value={90}>{t('case.details.durationOptions.90min')}</option>
                            <option value={120}>{t('case.details.durationOptions.120min')}</option>
                        </select>
                    </div>
                </div>
                
                {/* Doctor Selection Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-4">
                        <label className="block text-sm font-medium text-foreground-secondary mb-1">
                            {t('case.details.doctor')}
                        </label>
                        <select
                            className={`w-full input-field disabled:opacity-60 disabled:cursor-not-allowed ${
                                appointmentError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''
                            }`}
                            value={selectedDoctorId}
                            onChange={(e) => {
                                setSelectedDoctorId(e.target.value ? Number(e.target.value) : '');
                                // Clear error when user makes a selection
                                if (appointmentError) {
                                    setAppointmentError('');
                                }
                            }}
                            disabled={!canSetAppointment}
                        >
                            <option value="">{t('case.details.selectDoctor')}</option>
                            {doctors.map(doctor => (
                                <option key={doctor.id} value={doctor.id}>
                                    {doctor.user?.firstName} {doctor.user?.lastName}
                                    {doctor.title && ` (${doctor.title})`}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                
                <div className="flex justify-end">
                    <button 
                        disabled={!canSetAppointment || (!appointmentDate1 && !appointmentDate2) || !selectedDoctorId} 
                        onClick={handleSetAppointment} 
                        className={`bg-primary-600 text-white px-4 py-2 rounded-md font-medium hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed ${buttonWidthClass}`}
                    >
                        {t('case.details.suggestAppointments') || 'Suggest appointments'}
                    </button>
                </div>
            </div>

            {/* Divider between rows */}
            <Divider marginClass="my-1" />

            {/* Divider between rows */}
            <Divider marginClass="my-1" />

            {/* Row 5: Status + Set status button */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-foreground-secondary mb-1">{t('status.next') || 'Next status'}</label>
                    <select
                        className="input-field w-full disabled:opacity-60 disabled:cursor-not-allowed"
                        value={nextStatus}
                        onChange={(e) => setNextStatus(e.target.value)}
                    >
                        <option value="">{t('common.select') || 'Select'}</option>
                        {validNextStatuses.map(s => (
                            <option key={s} value={s}>{translateStatus(s)}</option>
                        ))}
                    </select>
                </div>
                <div className="md:col-span-3">
                    <div className="flex items-start gap-2 bg-warning-50 text-warning-800 border border-warning-300 rounded-md p-3">
                        <ExclamationTriangleIcon className="h-5 w-5 text-warning-600 mt-0.5" />
                        <p className="text-sm">
                            {t('admin.status.manualChangeWarning') || 'This action should only be used in special cases. Normally, the status changes automatically.'}
                        </p>
                    </div>
                </div>
                <div className="md:col-span-1 flex md:justify-end">
                    <button onClick={handleSetStatus} className={`bg-primary-600 text-white px-4 py-2 rounded-md font-medium hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed ${buttonWidthClass}`}>{t('status.set') || 'Set status'}</button>
                </div>
            </div>
        </div>
    );
};

export default CaseDetailsAdmin;


