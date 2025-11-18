// Status object structure from API response
export interface CaseStatusObject {
  id: number;
  name: CaseStatus;
}

// Status enum type - matches the backend STATUS enum
export type CaseStatus = 
  | 'NEW'
  | 'OFFER_SENT'
  | 'ACCEPTED'
  | 'WAITING_FOR_PAYMENT'
  | 'PAID'
  | 'TIMESLOTS_SENT'
  | 'ARRANGED'
  | 'IN_CONSULTATION'
  | 'DECLINED'
  | 'FINISHED';

// Status enum object for type safety
export const CASE_STATUS = {
  NEW: 'NEW' as CaseStatus,
  OFFER_SENT: 'OFFER_SENT' as CaseStatus,
  ACCEPTED: 'ACCEPTED' as CaseStatus,
  WAITING_FOR_PAYMENT: 'WAITING_FOR_PAYMENT' as CaseStatus,
  PAID: 'PAID' as CaseStatus,
  TIMESLOTS_SENT: 'TIMESLOTS_SENT' as CaseStatus,
  ARRANGED: 'ARRANGED' as CaseStatus,
  IN_CONSULTATION: 'IN_CONSULTATION' as CaseStatus,
  DECLINED: 'DECLINED' as CaseStatus,
  FINISHED: 'FINISHED' as CaseStatus,
} as const;
