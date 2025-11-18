// ConsultationNote interface based on ConsultationNoteModel
export interface ConsultationNote {
    id?: number;
    notes: string;
    recommendation: string;
    createdAt?: string;
    updatedAt?: string;
    version?: number;
}

export type ConsultationNoteList = ConsultationNote[];


// Appointment interface based on AppointmentModel
export interface Appointment {
    id?: number;
    doctorName?: string;
    scheduledStart?: string;
    durationMinutes?: number;
    meetingId?: string;
    meetingUrl?: string;
    consultationNotes?: ConsultationNoteList;
    createdAt?: string;
    updatedAt?: string;
    meetingStatus: string;
}

// AppointmentList interface based on AppointmentListModel
export type AppointmentList = Appointment[];

export type SuggestAppointment = {
    caseId: number;
    doctorId: number;
    suggestedAppointments: AppointmentList;
}