import { User } from './user';

// Subspecialty types
export interface Subspecialty {
  id: number;
  specialtyId: number;
  nameDe: string;
  nameEn: string;
  nameRo: string;
  description?: string | null;
  isActive: boolean;
  createdAt: Date;
}

// Specialty types
export interface Specialty {
  id: number;
  nameDe: string;
  nameEn: string;
  nameRo: string;
  description?: string | null;
  isActive: boolean;
  createdAt: Date;
  subspecialties?: Subspecialty[];
}

// Doctor Subspecialty Association
export interface DoctorSubspecialty {
  id: number;
  doctorProfileId: number;
  isPrimary: boolean;
  createdAt: Date;
  specialty: Specialty;
  subspecialty?: Subspecialty;
}

// Main Doctor Profile types
export interface DoctorProfile {
  id?: number;
  userId: string;
  title?: string | null;
  licenseNumber?: string | null;
  licenseExpiryDate?: string | null; // Date as string in API
  isActive: boolean;
  lan: string;
  bio?: string | null;
  consultationFee?: number | null;
  user?: User;
  subspecialties?: DoctorSubspecialty[]; // Legacy field for backward compatibility
  specialties?: DoctorSubspecialty[]; // New field with specialty objects
}


// Success response for delete operations
export interface SuccessResponse {
  success: boolean;
  message: string;
}

// Paginated response for get all doctors
export interface PaginatedDoctorResponse {
  doctors: DoctorProfile[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

// Filter parameters for get all doctors
export interface DoctorFilters {
  search?: string;
  isActive?: boolean;
  specialtyId?: number;
  subspecialtyId?: number;
  limit?: number;
  offset?: number;
}
