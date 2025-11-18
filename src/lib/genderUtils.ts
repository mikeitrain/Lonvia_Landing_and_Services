export type Gender = 'male' | 'female' | 'other';

export class GenderUtils {
  /**
   * Convert gender to translation key
   */
  static genderToTranslationKey(gender: Gender): string {
    const keyMap: Record<Gender, string> = {
      male: 'demographic.male',
      female: 'demographic.female',
      other: 'demographic.other',
    };
    return keyMap[gender] || gender;
  }

  /**
   * Get all gender options
   */
  static getAllGenders(): Gender[] {
    return ['male', 'female', 'other'];
  }

  /**
   * Validate if a string is a valid gender
   */
  static isValidGender(gender: string): gender is Gender {
    return ['male', 'female', 'other'].includes(gender);
  }
} 