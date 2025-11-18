// Symptom interface for API responses
export interface Symptom {
  id: number;
  caseId: number;
  description: string;
  duration: SymptomDuration;
  severity: SymptomSeverity;
  symptom_notes?: string | null;
  admin_notes?: string | null;
}

// Symptom duration enum
export type SymptomDuration = 
  | 'less_than_24h'
  | '1_to_3_days'
  | '3_to_7_days'
  | '1_to_2_weeks'
  | 'more_than_2_weeks';

// Symptom severity enum
export type SymptomSeverity = 
  | 'mild'
  | 'moderate'
  | 'severe';

// Symptom duration enum object for type safety
export const SYMPTOM_DURATION = {
  LESS_THAN_24H: 'less_than_24h' as SymptomDuration,
  ONE_TO_THREE_DAYS: '1_to_3_days' as SymptomDuration,
  THREE_TO_SEVEN_DAYS: '3_to_7_days' as SymptomDuration,
  ONE_TO_TWO_WEEKS: '1_to_2_weeks' as SymptomDuration,
  MORE_THAN_TWO_WEEKS: 'more_than_2_weeks' as SymptomDuration,
} as const;

// Symptom severity enum object for type safety
export const SYMPTOM_SEVERITY = {
  MILD: 'mild' as SymptomSeverity,
  MODERATE: 'moderate' as SymptomSeverity,
  SEVERE: 'severe' as SymptomSeverity,
} as const;

// Form data interface for creating symptoms
export interface CreateSymptomFormData {
  description: string;
  duration: SymptomDuration;
  severity: SymptomSeverity;
  custom_notes?: string;
} 