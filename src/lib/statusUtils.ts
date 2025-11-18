import { CaseStatus, CASE_STATUS, CaseStatusObject } from '../types/status';

// Status validation and conversion utilities
export class StatusUtils {
  /**
   * Extract CaseStatus from either a string or CaseStatusObject
   */
  static extractStatus(status: string | CaseStatusObject | undefined): CaseStatus | null {
    if (!status) {
      return null;
    }
    
    if (typeof status === 'string') {
      return this.toCaseStatus(status);
    }
    
    if (typeof status === 'object' && status.name) {
      return this.toCaseStatus(status.name);
    }
    
    return null;
  }

  /**
   * Validate if a string is a valid case status
   */
  static isValidStatus(status: string): status is CaseStatus {
    return Object.values(CASE_STATUS).includes(status as CaseStatus);
  }

  /**
   * Normalize status string (convert to uppercase and trim)
   */
  static normalizeStatus(status: string): string | null {
    if (!status || typeof status !== 'string') {
      return null;
    }
    return status.toUpperCase().trim();
  }

  /**
   * Convert any case status string to CaseStatus type
   */
  static toCaseStatus(status: string): CaseStatus | null {
    const normalized = this.normalizeStatus(status);
    if (normalized && this.isValidStatus(normalized)) {
      return normalized;
    }
    return null;
  }

  /**
   * Get all available status values
   */
  static getAllStatuses(): CaseStatus[] {
    return Object.values(CASE_STATUS);
  }

  /**
   * Valid transitions from each status (mirrors backend logic)
   * Note: Backend does not have ACCEPTED status - transitions directly from OFFER_SENT to WAITING_FOR_PAYMENT
   */
  static readonly VALID_TRANSITIONS: Record<CaseStatus, CaseStatus[]> = {
    [CASE_STATUS.NEW]: [CASE_STATUS.OFFER_SENT],
    [CASE_STATUS.OFFER_SENT]: [CASE_STATUS.WAITING_FOR_PAYMENT, CASE_STATUS.DECLINED],
    [CASE_STATUS.ACCEPTED]: [CASE_STATUS.WAITING_FOR_PAYMENT], // ACCEPTED may exist in frontend but transitions to WAITING_FOR_PAYMENT
    [CASE_STATUS.WAITING_FOR_PAYMENT]: [CASE_STATUS.PAID],
    [CASE_STATUS.PAID]: [CASE_STATUS.TIMESLOTS_SENT],
    [CASE_STATUS.TIMESLOTS_SENT]: [CASE_STATUS.ARRANGED, CASE_STATUS.PAID], // Can loop back to PAID
    [CASE_STATUS.ARRANGED]: [CASE_STATUS.IN_CONSULTATION],
    [CASE_STATUS.IN_CONSULTATION]: [CASE_STATUS.NEW, CASE_STATUS.FINISHED],
    [CASE_STATUS.DECLINED]: [CASE_STATUS.OFFER_SENT],
    [CASE_STATUS.FINISHED]: []
  } as Record<CaseStatus, CaseStatus[]>;

  /**
   * Get valid transitions for a given status
   */
  static getValidTransitions(status: CaseStatus): CaseStatus[] {
    return this.VALID_TRANSITIONS[status] || [];
  }

  /**
   * Check whether a transition is allowed
   */
  static isValidTransition(from: CaseStatus, to: CaseStatus): boolean {
    return this.getValidTransitions(from).includes(to);
  }

  /**
   * Check if a status is terminal (cannot be changed)
   */
  static isTerminalStatus(status: CaseStatus): boolean {
    return status === CASE_STATUS.FINISHED;
  }

  /**
   * Check if a status is active (not terminal)
   */
  static isActiveStatus(status: CaseStatus): boolean {
    return !this.isTerminalStatus(status);
  }

  /**
   * Get status display properties
   */
  static getStatusInfo(status: CaseStatus) {
    const statusMap = {
      [CASE_STATUS.NEW]: {
        color: 'blue',
        icon: '📋',
        description: 'New case created and waiting for offer'
      },
      [CASE_STATUS.OFFER_SENT]: {
        color: 'yellow',
        icon: '📤',
        description: 'Offer has been sent to customer'
      },
      [CASE_STATUS.ACCEPTED]: {
        color: 'green',
        icon: '✅',
        description: 'Customer has accepted the offer'
      },
      [CASE_STATUS.WAITING_FOR_PAYMENT]: {
        color: 'yellow',
        icon: '💰',
        description: 'Waiting for customer payment'
      },
      [CASE_STATUS.PAID]: {
        color: 'green',
        icon: '💳',
        description: 'Payment has been received'
      },
      [CASE_STATUS.TIMESLOTS_SENT]: {
        color: 'yellow',
        icon: '📅',
        description: 'Available time slots sent to customer'
      },
      [CASE_STATUS.ARRANGED]: {
        color: 'green',
        icon: '📞',
        description: 'Customer has selected a time slot'
      },
      [CASE_STATUS.IN_CONSULTATION]: {
        color: 'yellow',
        icon: '👨‍⚕️',
        description: 'Consultation is currently taking place'
      },
      [CASE_STATUS.DECLINED]: {
        color: 'red',
        icon: '❌',
        description: 'Customer has declined the offer'
      },
      [CASE_STATUS.FINISHED]: {
        color: 'gray',
        icon: '🏁',
        description: 'Consultation is complete'
      }
    };

    return statusMap[status] || {
      color: 'gray',
      icon: '❓',
      description: 'Unknown status'
    };
  }

  /**
   * Get CSS classes for status colors using custom CSS classes
   */
  static getStatusColorClasses(status: CaseStatus): string {
    const colorMap = {
      [CASE_STATUS.NEW]: 'status-new',
      [CASE_STATUS.OFFER_SENT]: 'status-pending',
      [CASE_STATUS.ACCEPTED]: 'status-active',
      [CASE_STATUS.WAITING_FOR_PAYMENT]: 'status-pending',
      [CASE_STATUS.PAID]: 'status-active',
      [CASE_STATUS.TIMESLOTS_SENT]: 'status-pending',
      [CASE_STATUS.ARRANGED]: 'status-active',
      [CASE_STATUS.IN_CONSULTATION]: 'status-pending',
      [CASE_STATUS.DECLINED]: 'status-error',
      [CASE_STATUS.FINISHED]: 'status-neutral'
    };

    return colorMap[status] || 'status-neutral';
  }

  /**
   * Parse status from API response
   */
  static parseStatusFromApi(status: string): CaseStatus | null {
    return this.toCaseStatus(status);
  }

  /**
   * Validate API response status
   */
  static validateApiStatus(status: unknown): CaseStatus | null {
    if (typeof status === 'string') {
      return this.toCaseStatus(status);
    }
    if (typeof status === 'object' && status !== null && 'name' in status) {
      const statusObj = status as { name: unknown };
      if (typeof statusObj.name === 'string') {
        return this.toCaseStatus(statusObj.name);
      }
    }
    return null;
  }

  /**
   * Convert status enum to translation key
   */
  static statusToTranslationKey(status: CaseStatus): string {
    return `status.${status.toLowerCase()}`;
  }

  /**
   * Get status name from either string or object format
   */
  static getStatusName(status: string | CaseStatusObject | undefined): string | null {
    if (!status) {
      return null;
    }
    
    if (typeof status === 'string') {
      return status;
    }
    
    if (typeof status === 'object' && status.name) {
      return status.name;
    }
    
    return null;
  }
} 