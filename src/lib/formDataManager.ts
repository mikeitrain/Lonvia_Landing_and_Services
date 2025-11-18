interface PendingCaseData {
  formData: Record<string, unknown>;
  timestamp: number;
  expiresAt: number;
  userId?: string; // For tracking if user was created but not confirmed
}

const STORAGE_KEY = 'pendingCaseFormData';
const EXPIRY_DAYS = 7; // Keep data for 7 days

export class FormDataManager {
  /**
   * Save form data with expiry timestamp
   */
  static saveFormData(formData: Record<string, unknown>, userId?: string): void {
    const now = Date.now();
    const expiresAt = now + (EXPIRY_DAYS * 24 * 60 * 60 * 1000); // 7 days from now
    
    const data: PendingCaseData = {
      formData,
      timestamp: now,
      expiresAt,
      userId
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  /**
   * Get saved form data if it exists and hasn't expired
   */
  static getFormData(): Record<string, unknown> | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return null;

      const data: PendingCaseData = JSON.parse(stored);
      const now = Date.now();

      // Check if data has expired
      if (now > data.expiresAt) {
        this.clearFormData();
        return null;
      }

      return data.formData;
    } catch {
      this.clearFormData();
      return null;
    }
  }

  /**
   * Get the full pending case data object
   */
  static getPendingCaseData(): PendingCaseData | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return null;

      const data: PendingCaseData = JSON.parse(stored);
      const now = Date.now();

      // Check if data has expired
      if (now > data.expiresAt) {
        this.clearFormData();
        return null;
      }

      return data;
    } catch {
      this.clearFormData();
      return null;
    }
  }

  /**
   * Update user ID in stored data (for when user registers but hasn't confirmed)
   */
  static updateUserId(userId: string): void {
    const data = this.getPendingCaseData();
    if (data) {
      data.userId = userId;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }

  /**
   * Check if there's pending form data
   */
  static hasPendingData(): boolean {
    return this.getFormData() !== null;
  }

  /**
   * Clear stored form data
   */
  static clearFormData(): void {
    localStorage.removeItem(STORAGE_KEY);
  }

  /**
   * Get data age in hours
   */
  static getDataAge(): number {
    const data = this.getPendingCaseData();
    if (!data) return 0;
    
    const now = Date.now();
    return Math.floor((now - data.timestamp) / (1000 * 60 * 60));
  }

  /**
   * Check if data is about to expire (within 24 hours)
   */
  static isExpiringSoon(): boolean {
    const data = this.getPendingCaseData();
    if (!data) return false;
    
    const now = Date.now();
    const hoursUntilExpiry = (data.expiresAt - now) / (1000 * 60 * 60);
    return hoursUntilExpiry < 24;
  }
} 