import { CaseStatusObject } from './status';
import { Symptom } from './symptom';
import { Attachment } from './attachment';
import { Appointment } from './appointment';
import { Document } from './document';
import { User } from './user';

// Case interface for API responses
export interface Case {
  id?: number;
  status?: CaseStatusObject;
  case_notes?: string | null;
  admin_notes?: string | null;
  has_diagnosis?: boolean; // always present in API, default false
  symptoms?: Symptom[];
  attachments?: Attachment[];
  appointments?: Appointment[]; 
  documents?: Document[];
  customer?: User;
  createdAt?: string;
  updatedAt?: string;
  // Form fields for creating cases
  description?: string;
  duration?: string;
  severity?: string;
}

export interface CaseListPaginatedResponse {
  cases: Case[];
  limit: number;
  page: number;
  total: number;
}
