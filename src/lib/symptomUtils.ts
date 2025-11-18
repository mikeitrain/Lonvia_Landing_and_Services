import { SymptomSeverity, SymptomDuration } from '@/types/symptom';

export class SymptomUtils {
  /**
   * Convert symptom severity to translation key
   */
  static severityToTranslationKey(severity: SymptomSeverity): string {
    const keyMap: Record<SymptomSeverity, string> = {
      mild: 'symptoms.mild',
      moderate: 'symptoms.moderate',
      severe: 'symptoms.severe',
    };
    return keyMap[severity] || severity;
  }

  /**
   * Convert symptom duration to translation key
   */
  static durationToTranslationKey(duration: SymptomDuration): string {
    const keyMap: Record<SymptomDuration, string> = {
      less_than_24h: 'symptoms.lessThan24h',
      '1_to_3_days': 'symptoms.1to3Days',
      '3_to_7_days': 'symptoms.3to7Days',
      '1_to_2_weeks': 'symptoms.1to2Weeks',
      more_than_2_weeks: 'symptoms.moreThan2Weeks',
    };
    return keyMap[duration] || duration;
  }

  /**
   * Get all severity options
   */
  static getAllSeverities(): SymptomSeverity[] {
    return ['mild', 'moderate', 'severe'];
  }

  /**
   * Get all duration options
   */
  static getAllDurations(): SymptomDuration[] {
    return ['less_than_24h', '1_to_3_days', '3_to_7_days', '1_to_2_weeks', 'more_than_2_weeks'];
  }
} 