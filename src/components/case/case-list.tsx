import React from 'react';
import { Case } from '@/types/case';
import { useLanguage } from '@/contexts/LanguageContext';
import { StatusUtils } from '@/lib/statusUtils';
import { useLoadingStore } from '@/services/loadingService';
import { DocumentTextIcon, ClockIcon, BoltIcon } from '@heroicons/react/24/outline';

interface CaseListProps {
  cases: Case[];
  onCaseClick?: (caseId: string) => void;
  className?: string;
  viewMode?: 'standard' | 'arranged';
}

const CaseList: React.FC<CaseListProps> = ({ cases, onCaseClick, className = '', viewMode = 'standard' }) => {
  const { t, translateStatus } = useLanguage();
  const { isLoading } = useLoadingStore();

  const getStatusColor = (status: Case['status']) => {
    if (!status || !status.name) {
      return 'status-neutral';
    }
    const caseStatus = StatusUtils.toCaseStatus(status.name);
    if (caseStatus) {
      return StatusUtils.getStatusColorClasses(caseStatus);
    }
    return 'status-neutral';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusLabel = (status: Case['status']) => {
    if (!status || !status.name) {
      return t('status.unknown') || 'Unknown';
    }
    const caseStatus = StatusUtils.toCaseStatus(status.name);
    if (caseStatus) {
      return translateStatus(caseStatus);
    }
    return status.name.replace(/_/g, ' ');
  };

  const getCaseDescription = (caseItem: Case): string => {
    // If case has diagnosis, show diagnosis text
    if (caseItem.has_diagnosis) {
      return t('case.details.withExistingDiagnosis') || 'With an existing diagnosis';
    }
    
    // First try to use the case description
    if (caseItem.description && caseItem.description.trim()) {
      return caseItem.description;
    }
    
    // If no description, try to use the first symptom's description
    if (caseItem.symptoms && caseItem.symptoms.length > 0) {
      const firstSymptom = caseItem.symptoms[0];
      if (firstSymptom.description && firstSymptom.description.trim()) {
        // Truncate if too long and add ellipsis
        const description = firstSymptom.description.trim();
        return description.length > 100 ? `${description.substring(0, 100)}...` : description;
      }
    }
    
    // If no symptoms, try case notes
    if (caseItem.case_notes && caseItem.case_notes.trim()) {
      const notes = caseItem.case_notes.trim();
      return notes.length > 100 ? `${notes.substring(0, 100)}...` : notes;
    }
    
    // Fallback to translated "no description"
    return t('case.noDescription') || 'No description';
  };

  // Get accepted appointment (the one that is arranged/accepted)
  const getAcceptedAppointment = (caseItem: Case) => {
    if (!caseItem.appointments || caseItem.appointments.length === 0) {
      return null;
    }
    
    // Find appointment with scheduledStart (accepted appointment)
    // Usually the most recent one with a scheduledStart
    const acceptedAppointments = caseItem.appointments
      .filter(apt => apt.scheduledStart)
      .sort((a, b) => {
        const dateA = a.scheduledStart ? new Date(a.scheduledStart).getTime() : 0;
        const dateB = b.scheduledStart ? new Date(b.scheduledStart).getTime() : 0;
        return dateB - dateA; // Most recent first
      });
    
    return acceptedAppointments.length > 0 ? acceptedAppointments[0] : null;
  };

  // Format duration from minutes to readable format
  const formatDuration = (minutes?: number): string => {
    if (!minutes) return '';
    if (minutes < 60) {
      return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (mins === 0) {
      return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
    }
    return `${hours}h ${mins}min`;
  };

  // Get customer name
  const getCustomerName = (caseItem: Case): string => {
    if (caseItem.customer?.firstName && caseItem.customer?.lastName) {
      return `${caseItem.customer.firstName} ${caseItem.customer.lastName}`;
    }
    if (caseItem.customer?.firstName) {
      return caseItem.customer.firstName;
    }
    if (caseItem.customer?.lastName) {
      return caseItem.customer.lastName;
    }
    return t('case.details.customerName')?.replace(':', '') || 'Customer';
  };

  // Show loading state when data is being fetched
  if (isLoading) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="text-foreground-tertiary">
          <h3 className="text-lg font-semibold text-foreground-primary mb-2">
            {t('common.loading') || 'Loading cases...'}
          </h3>
          <p className="text-sm text-foreground-secondary">
            {t('case.loadingDescription') || 'Please wait while we fetch your cases.'}
          </p>
        </div>
      </div>
    );
  }

  if (cases.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="text-foreground-tertiary">
          <DocumentTextIcon className="mx-auto h-16 w-16 text-foreground-tertiary mb-4" />
          <h3 className="text-lg font-semibold text-foreground-primary mb-2">
            {t('case.noCases') || 'No cases found'}
          </h3>
          <p className="text-sm text-foreground-secondary">
            {t('case.noCasesDescription') || 'Get started by creating your first case.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {cases.map((caseItem) => (
        <div
          key={caseItem.id}
          className={`bg-background-primary border border-border-primary rounded-lg p-6 hover:shadow-lg transition-all duration-200 ${
            onCaseClick ? 'cursor-pointer hover:border-border-secondary' : ''
          }`}
          onClick={() => onCaseClick?.(caseItem.id?.toString() || '')}
        >
          <div className="flex items-start justify-between">
            {/* Left side - Content */}
            <div className="flex-1 min-w-0">
              {viewMode !== 'arranged' && (
                <div className="flex items-center space-x-3 mb-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium shadow-sm min-w-[100px] justify-center ${getStatusColor(caseItem.status)}`}>
                    {getStatusLabel(caseItem.status)}
                  </span>
                </div>
              )}
              
              {viewMode === 'arranged' ? (
                <>
                  {/* Arranged view: Date and duration row */}
                  {(() => {
                    const appointment = getAcceptedAppointment(caseItem);
                    return (
                      <div className="flex items-center gap-4 text-sm text-foreground-secondary mb-2">
                        <div>
                          <span className="font-medium text-foreground-primary">{t('case.details.appointmentArranged.date') || 'Appointment Date'}:</span> {appointment?.scheduledStart ? formatDate(appointment.scheduledStart) : (formatDate(caseItem.createdAt || ''))}
                        </div>
                        {appointment?.durationMinutes && (
                          <div className="flex items-center gap-1">
                            <ClockIcon className="w-4 h-4 text-foreground-tertiary" />
                            <span className="font-medium text-foreground-primary">{t('case.details.duration') || 'Duration'}:</span> {formatDuration(appointment.durationMinutes)}
                          </div>
                        )}
                      </div>
                    );
                  })()}

                  {/* Arranged view: Customer name */}
                  <div className="text-base text-foreground-primary font-medium mb-2">
                    {getCustomerName(caseItem)}
                  </div>
                  
                  {/* Arranged view: Additional content can go here if needed */}
                </>
              ) : (
                <>
                  {/* Standard view: Case description */}
                  <div className="text-base text-foreground-primary font-medium mb-2">
                    {getCaseDescription(caseItem)}
                  </div>
                  
                  {/* Additional case details */}
                  {(caseItem.duration || caseItem.severity) && (
                    <div className="flex items-center space-x-6 text-sm text-foreground-secondary">
                      {caseItem.duration && (
                        <div className="flex items-center space-x-1">
                          <ClockIcon className="w-4 h-4 text-foreground-tertiary" />
                          <span>{t('case.duration') || 'Duration'}: {caseItem.duration}</span>
                        </div>
                      )}
                      {caseItem.severity && (
                        <div className="flex items-center space-x-1">
                          <BoltIcon className="w-4 h-4 text-foreground-tertiary" />
                          <span>{t('case.severity') || 'Severity'}: {caseItem.severity}</span>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
            
            {/* Right side - Status/Date */}
            <div className="flex-shrink-0 ml-4 text-right">
              {viewMode === 'arranged' ? (
                <>
                  {/* Arranged view: Status pill aligned right */}
                  <div className="flex justify-end">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium shadow-sm min-w-[100px] justify-center text-foreground-primary ${getStatusColor(caseItem.status)}`}>
                      {getStatusLabel(caseItem.status)}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  {/* Standard view: Creation date */}
                  <div className="text-sm text-foreground-tertiary">
                    <div className="font-medium text-foreground-primary">
                      {t('case.created') || 'Created'}
                    </div>
                    <div className="text-foreground-tertiary">
                      {formatDate(caseItem.createdAt || '')}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CaseList;
