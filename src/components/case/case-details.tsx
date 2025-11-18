import React, { useEffect, useState } from 'react';
import { Case } from '@/types/case';
import { Attachment } from '@/types/attachment';
import { DoctorProfile } from '@/types/doctor';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatDate } from '@/lib/utils';
import { StatusUtils } from '@/lib/statusUtils';
import { Gender } from '@/lib/genderUtils';
import { translateDocumentType } from '@/lib/documentUtils';
import { ConfirmationModal } from '@/components/common/ConfirmationModal';
import UploadAttachmentWizard from '@/components/case/UploadAttachmentWizard';
import { HttpService } from '@/services/httpService';
import StatusFlowModal from '@/components/status/status-flow-modal';
import CaseDetailsAdmin from '@/components/case/case-details-admin';
import { CaseWorkflowInfo } from '@/components/case/case-workflow-info';
import { DocumentTextIcon, ArrowDownTrayIcon, CalendarDaysIcon, LinkIcon } from '@heroicons/react/24/outline';
import AttachmentList from '@/components/attachment/AttachmentList';
import { CASE_STATUS, CaseStatusObject } from '@/types/status';

interface CaseDetailsProps {
  caseData: Case;
  onUpdated?: (updated: Case) => void;
  doctors?: DoctorProfile[];
}

export const CaseDetails: React.FC<CaseDetailsProps> = ({ caseData, onUpdated, doctors = [] }) => {
  const { userGroups } = useAuth();
  const { language, t, translateSymptomSeverity, translateSymptomDuration, translateStatus, translateGender } = useLanguage();
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    attachment: Attachment | null;
  }>({
    isOpen: false,
    attachment: null,
  });
  // Removed per refactor; AttachmentList handles actions without per-item downloading state
  const [attachments, setAttachments] = useState<Attachment[]>(caseData.attachments || []);
  const [currentCase, setCurrentCase] = useState<Case>(caseData);
  const [canSeeDocuments, setCanSeeDocuments] = useState<boolean>(false);
  const [downloadingDocType, setDownloadingDocType] = useState<string | null>(null);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState<boolean>(false);
  const [isAccepting, setIsAccepting] = useState<boolean>(false);
  const [selectedTimeslotId, setSelectedTimeslotId] = useState<number | null>(null);

  useEffect(() => {
    setAttachments(caseData.attachments || []);
  }, [caseData.attachments]);

  useEffect(() => {
    setCanSeeDocuments(Array.isArray(userGroups) ? (userGroups.includes('admin') || userGroups.includes('patient')) : false);
  }, [userGroups]);

  const isPatient = Array.isArray(userGroups) ? userGroups.includes('patient') : false;
  const isOfferSent = StatusUtils.extractStatus(currentCase.status) === CASE_STATUS.OFFER_SENT;
  const canAcceptOffer = isPatient && isOfferSent;

  const offerDocument = (currentCase.documents || []).find(d => String(d.doc_type || '').toLowerCase() === 'offer');

  const getStatusColor = (status: Case['status'] | string | undefined) => {
    const extracted = StatusUtils.extractStatus(status);
    if (extracted) {
      return StatusUtils.getStatusColorClasses(extracted);
    }
    return 'status-neutral';
  };

  const getStatusLabel = (status: Case['status'] | string | undefined) => {
    const extracted = StatusUtils.extractStatus(status);
    if (extracted) {
      return translateStatus(extracted);
    }
    // Fallback: try to humanize string or unknown object
    let name: string | null = null;
    if (typeof status === 'string') {
      name = status;
    } else if (status && typeof status === 'object' && 'name' in status) {
      const s = status as Partial<CaseStatusObject>;
      name = typeof s.name === 'string' ? s.name : null;
    }
    return (name ? name.replace(/_/g, ' ') : (t('status.unknown') || 'Unknown')) as string;
  };

  const handleDeleteAttachment = (attachment: Attachment) => {
    setDeleteModal({
      isOpen: true,
      attachment,
    });
  };

  const confirmDelete = async () => {
    try {
      if (deleteModal.attachment && deleteModal.attachment.id && currentCase.id) {
        const http = HttpService.getInstance();
        await http.deleteAttachment({
          attachmentId: String(deleteModal.attachment.id),
          caseId: typeof currentCase.id === 'number' ? currentCase.id : Number(currentCase.id),
        });
        // Remove from the list only on successful deletion
        setAttachments(prev => prev.filter(a => a.id !== deleteModal.attachment!.id));
      }
    } finally {
      setDeleteModal({ isOpen: false, attachment: null });
    }
  };

  const getAttachmentButtonText = (typeName: string) => {
    switch (typeName) {
      case 'DICOM':
        return t('case.details.download');
      case 'Link':
        return t('case.details.open');
      default:
        return t('case.details.view');
    }
  };

  const handleOpenAttachment = async (attachment: Attachment) => {
    if (!attachment.id || !currentCase.id) return;
    const http = HttpService.getInstance();
    const { url } = await http.getAttachmentUrl({
      attachmentId: String(attachment.id),
      caseId: typeof currentCase.id === 'number' ? currentCase.id : Number(currentCase.id),
    });
    // Open in new tab; S3 responses may trigger download via content-disposition
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadDocument = async (docType: string) => {
    if (!currentCase.id) return;
    setDownloadingDocType(docType);
    try {
      const http = HttpService.getInstance();
      const { url } = await http.getDocumentUrl({ caseId: String(currentCase.id), docType });
      const a = document.createElement('a');
      a.href = url;
      a.download = '';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } finally {
      setDownloadingDocType(null);
    }
  };

  const confirmAcceptOffer = async () => {
    if (!currentCase.id) return;
    setIsAccepting(true);
    try {
      const http = HttpService.getInstance();
      const updatedCase: Case = await http.acceptOffer(String(currentCase.id));
      setCurrentCase(updatedCase);
      setAttachments(updatedCase.attachments || []);
      if (onUpdated) onUpdated(updatedCase);
    } finally {
      setIsAccepting(false);
    }
  };

  const handleAcceptTimeslot = async () => {
    if (!currentCase.id || !selectedTimeslotId) return;
    
    setIsAccepting(true);
    try {
      const http = HttpService.getInstance();
      const updated = await http.acceptAppointment(String(selectedTimeslotId), String(currentCase.id));
      setCurrentCase(updated);
      setAttachments(updated.attachments || []);
      if (onUpdated) onUpdated(updated);
    } finally {
      setIsAccepting(false);
    }
  };

  const handleDeclineTimeslot = async () => {
    if (!currentCase.id) return;
    
    setIsAccepting(true);
    try {
      const http = HttpService.getInstance();
      const updated = await http.declineAppointment(String(currentCase.id));
      setCurrentCase(updated);
      setAttachments(updated.attachments || []);
      if (onUpdated) onUpdated(updated);
    } finally {
      setIsAccepting(false);
    }
  };

  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isStatusInfoOpen, setIsStatusInfoOpen] = useState<boolean>(false);

  useEffect(() => {
  }, [caseData.id]);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground-primary">Case {currentCase.id}</h1>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setIsStatusInfoOpen(true)}
            className="text-sm text-primary-600 hover:underline"
          >
            {t('status.moreInfo') || 'Click here for more information'}
          </button>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium shadow-sm min-w-[100px] justify-center ${getStatusColor(currentCase.status)}`}>
            {getStatusLabel(currentCase.status)}
          </span>
        </div>
      </div>

      {/* Admin controls */}
      <CaseDetailsAdmin caseData={currentCase} doctors={doctors} onCaseUpdated={(updated) => {
        setCurrentCase(updated);
        setAttachments(updated.attachments || []);
        if (onUpdated) onUpdated(updated);
      }} />

      <CaseWorkflowInfo caseData={currentCase} />
    
      {/* Official Documents section */}
      {canSeeDocuments && currentCase.documents && currentCase.documents.length > 0 && (
        <div className="mb-6 bg-background-secondary rounded-lg border border-border-primary p-6">
          <h2 className="text-xl font-bold text-foreground-primary mb-4">{t('case.details.receipts') || 'Documents'}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {currentCase.documents.map((doc, idx) => (
              <div key={`${doc.doc_no || idx}`} className="flex items-center justify-between bg-neutral-50 rounded-md p-4 border border-border-primary">
                <div className="flex-1 mr-4">
                  <div className="text-xs font-bold text-foreground-tertiary mb-1">{translateDocumentType(doc.doc_type, t)}</div>
                  <div className="flex items-center gap-3">
                    <div className="shrink-0 text-primary-600">
                      <DocumentTextIcon className="w-10 h-10" />
                    </div>
                    <div className="text-foreground-secondary text-sm">
                      {doc.doc_no}
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => handleDownloadDocument(doc.doc_type)}
                    disabled={downloadingDocType === doc.doc_type}
                    className="bg-primary-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-700 transition-colors disabled:opacity-60 inline-flex items-center gap-2"
                  >
                    <ArrowDownTrayIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Accept Offer CTA (shown to patient when status is OFFER_SENT) */}
      {canAcceptOffer && (
        <div className="m-6 flex justify-center">
          <button
            type="button"
            onClick={() => setIsAcceptModalOpen(true)}
            className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-2 rounded-md font-medium transition-colors"
          >
            {t('case.details.acceptOffer') || 'Accept offer'}
          </button>
        </div>
      )}


      {/* Suggest Appointments CTA (shown to user and admin when status is TIMESLOTS_SENT) */}
      {currentCase.status?.name === CASE_STATUS.TIMESLOTS_SENT && currentCase.appointments && (
        <div className="mb-6 bg-background-secondary rounded-lg border border-border-primary p-6">
          <h2 className="text-xl font-bold text-foreground-primary mb-4">
            {t('case.details.suggestedTimeslots') || 'Suggested Timeslots'}
          </h2>
          
          {/* Timeslots Grid */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {currentCase.appointments
              .filter(appointment => appointment.meetingStatus === 'suggested')
              .map((appointment) => {
                const appointmentDate = new Date(appointment.scheduledStart || '');
                const isSelected = selectedTimeslotId === appointment.id;
                
                return (
                  <button
                    key={appointment.id}
                    onClick={() => {
                      // Only allow selection for patients
                      if (userGroups?.includes('patient')) {
                        setSelectedTimeslotId(isSelected ? null : (appointment.id || null));
                      }
                    }}
                    disabled={!userGroups?.includes('patient')}
                    className={`
                      px-4 py-3 rounded-lg border-2 text-center min-w-[200px] transition-all duration-200
                      ${isSelected 
                        ? 'border-primary-500 bg-primary-50 text-primary-700' 
                        : 'border-border-secondary bg-background-primary text-foreground-primary hover:border-primary-300'
                      }
                      ${!userGroups?.includes('patient') 
                        ? 'cursor-default opacity-75' 
                        : 'cursor-pointer hover:shadow-md'
                      }
                    `}
                  >
                    <div className="font-medium">
                      {appointmentDate.toLocaleDateString(language === 'ro' ? 'ro-RO' : language === 'de' ? 'de-DE' : 'en-GB', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        timeZone: language === 'ro' ? 'Europe/Bucharest' : language === 'de' ? 'Europe/Berlin' : 'Europe/London'
                      })}
                    </div>
                    <div className="text-sm text-foreground-secondary">
                      {appointmentDate.toLocaleTimeString(language === 'ro' ? 'ro-RO' : language === 'de' ? 'de-DE' : 'en-GB', {
                        hour: '2-digit',
                        minute: '2-digit',
                        timeZone: language === 'ro' ? 'Europe/Bucharest' : language === 'de' ? 'Europe/Berlin' : 'Europe/London'
                      })}
                    </div>
                    <div className="text-xs text-foreground-secondary mt-1">
                      {t('case.details.duration') || 'Duration'}: {appointment.durationMinutes || 30} min
                    </div>
                  </button>
                );
              })}
          </div>
          
          {/* Action Buttons - Only for patients */}
          {userGroups?.includes('patient') && (
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDeclineTimeslot}
                disabled={isAccepting}
                className={`
                  px-6 py-3 rounded-lg font-medium transition-all duration-200 border-2
                  ${!isAccepting
                    ? 'border-red-500 text-red-600 hover:bg-red-50 hover:border-red-600'
                    : 'border-gray-300 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                {isAccepting 
                  ? (t('common.working') || 'Working...') 
                  : (t('case.details.declineTimeslot') || 'Decline')
                }
              </button>
              <button
                onClick={handleAcceptTimeslot}
                disabled={!selectedTimeslotId || isAccepting}
                className={`
                  px-6 py-3 rounded-lg font-medium transition-all duration-200
                  ${selectedTimeslotId && !isAccepting
                    ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-md'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                {isAccepting 
                  ? (t('common.working') || 'Working...') 
                  : (t('case.details.acceptTimeslot') || 'Accept Timeslot')
                }
              </button>
            </div>
          )}
        </div>
      )}

      {/* Appointment Arranged Info Box (shown when status is ARRANGED) */}
      {StatusUtils.extractStatus(currentCase.status) === CASE_STATUS.ARRANGED && currentCase.appointments && (
        <div className="mb-6 bg-green-50 border-2 border-green-200 rounded-lg p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CalendarDaysIcon className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="ml-4 flex-1">
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                {t('case.details.appointmentArranged.title')}
              </h3>
              
              {/* Appointment Details */}
              {currentCase.appointments
                .filter(appointment => appointment.meetingStatus === 'accepted' || appointment.meetingStatus === 'arranged')
                .map((appointment) => {
                  const appointmentDate = new Date(appointment.scheduledStart || '');
                  
                  return (
                    <div key={appointment.id} className="bg-white rounded-md p-4 mb-4 border border-green-200">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <div className="text-sm font-medium text-green-700 mb-1">
                            {t('case.details.appointmentArranged.date')}
                          </div>
                          <div className="text-green-800">
                            {appointmentDate.toLocaleDateString(language === 'ro' ? 'ro-RO' : language === 'de' ? 'de-DE' : 'en-GB', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              timeZone: language === 'ro' ? 'Europe/Bucharest' : language === 'de' ? 'Europe/Berlin' : 'Europe/London'
                            })}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-green-700 mb-1">
                            {t('case.details.appointmentArranged.time')}
                          </div>
                          <div className="text-green-800">
                            {appointmentDate.toLocaleTimeString(language === 'ro' ? 'ro-RO' : language === 'de' ? 'de-DE' : 'en-GB', {
                              hour: '2-digit',
                              minute: '2-digit',
                              timeZone: language === 'ro' ? 'Europe/Bucharest' : language === 'de' ? 'Europe/Berlin' : 'Europe/London'
                            })}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-green-700 mb-1">
                            {t('case.details.appointmentArranged.duration')}
                          </div>
                          <div className="text-green-800">
                            {appointment.durationMinutes || 30} min
                          </div>
                        </div>
                      </div>
                      
                      {/* Meeting Link (if available) */}
                      {appointment.meetingUrl && (
                        <div className="mt-4 pt-4 border-t border-green-200">
                          <div className="text-sm font-medium text-green-700 mb-2">
                            Meeting Link:
                          </div>
                          <a 
                            href={appointment.meetingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors"
                          >
                            <LinkIcon className="w-4 h-4 mr-2" />
                            Join Meeting
                          </a>
                        </div>
                      )}
                    </div>
                  );
                })}
              
              {/* Instructions */}
              <div className="text-green-700 text-sm leading-relaxed">
                {t('case.details.appointmentArranged.message')}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content - Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Medical Form - Takes 1 column on desktop */}
        <div className="lg:col-span-1">
          <div className="bg-background-secondary rounded-lg border border-border-primary p-6 h-full">
            <h2 className="text-xl font-bold text-foreground-primary mb-4">
              {currentCase.has_diagnosis ? t('case.details.diagnosis') : t('case.details.medicalForm')}
            </h2>
            <div className="space-y-4">
              {currentCase.has_diagnosis ? (
                <AttachmentList
                  items={(attachments || []).filter(a => a.is_diagnosis).map((attachment, index) => ({
                    id: String(attachment.id || index),
                    label: attachment.type.name === 'Link' ? (attachment.description || attachment.url || `Link ${index + 1}`) : (attachment.originalName || `Document ${index + 1}`),
                    typeName: attachment.type.name,
                    showDelete: !attachment.is_diagnosis,
                    metaRight: formatDate(attachment.createdAt, language),
                  }))}
                  showOpen={true}
                  openText={(item) => {
                    const type = (attachments || []).find(a => String(a.id) === String(item.id))?.type?.name || '';
                    return getAttachmentButtonText(type);
                  }}
                  onOpen={(id) => {
                    const a = (attachments || []).find(x => String(x.id) === String(id));
                    if (a) handleOpenAttachment(a);
                  }}
                  deleteText={t('case.details.delete') || 'Delete'}
                />
              ) : (
                <>
                  {currentCase.symptoms && currentCase.symptoms.length > 0 ? (
                    currentCase.symptoms.map((symptom, index) => (
                      <div key={index} className="bg-neutral-50 rounded-md p-4 border border-border-primary">
                        <div className="font-medium text-foreground-primary mb-1">
                          {`${t('case.details.symptom')} ${index + 1} - ${translateSymptomSeverity(symptom.severity)} (${translateSymptomDuration(symptom.duration)})`}
                        </div>
                        <div className="text-foreground-secondary">
                          {symptom.description || t('case.details.answerOfUser')}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-foreground-tertiary">
                      <p className="text-sm">No symptoms recorded</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Notes - Takes 1 column on desktop */}
        <div className="lg:col-span-1">
          <div className="bg-background-secondary rounded-lg border border-border-primary p-6 h-full">
            <h2 className="text-xl font-bold text-foreground-primary mb-4">{t('case.details.notes')}</h2>
            <div className="bg-neutral-50 rounded-md p-4 min-h-[200px] border border-border-primary">
              <textarea
                className="w-full h-full bg-transparent border-none outline-none resize-none text-foreground-secondary placeholder-foreground-tertiary"
                placeholder={t('case.details.notesPlaceholder')}
                defaultValue={currentCase.case_notes || ''}
                rows={8}
              />
            </div>
          </div>
        </div>

        {/* Documents - Takes 1 column on desktop */}
        <div className="lg:col-span-1">
          <div className="bg-background-secondary rounded-lg border border-border-primary p-6 h-full">
            <h2 className="text-xl font-bold text-foreground-primary mb-4">{t('case.details.documents')}</h2>
            <div className="space-y-3">
              <AttachmentList
                items={(attachments || []).filter(a => !a.is_diagnosis).map((attachment, index) => ({
                  id: String(attachment.id || index),
                  label: attachment.type.name === 'Link' ? (attachment.description || attachment.url || `Link ${index + 1}`) : (attachment.originalName || `Document ${index + 1}`),
                  typeName: attachment.type.name,
                  showDelete: !attachment.is_diagnosis,
                  metaRight: formatDate(attachment.createdAt, language),
                }))}
                showOpen={true}
                openText={(item) => {
                  const type = (attachments || []).find(a => String(a.id) === String(item.id))?.type?.name || '';
                  return getAttachmentButtonText(type);
                }}
                onOpen={(id) => {
                  const a = (attachments || []).find(x => String(x.id) === String(id));
                  if (a) handleOpenAttachment(a);
                }}
                onDelete={(id) => {
                  const a = (attachments || []).find(x => String(x.id) === String(id));
                  if (a) handleDeleteAttachment(a);
                }}
                deleteText={t('case.details.delete') || 'Delete'}
              />
              <div className="flex justify-end pt-4">
                <button onClick={() => setIsUploadOpen(true)} className="bg-primary-600 text-white px-6 py-2 rounded-md font-medium hover:bg-primary-700 transition-colors">
                  {t('case.details.upload')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info - Takes 1 column on desktop */}
        <div className="lg:col-span-1">
          <div className="bg-background-secondary rounded-lg border border-border-primary p-6 h-full">
            <h2 className="text-xl font-bold text-foreground-primary mb-4">{t('case.details.infos')}</h2>
            <div className="bg-neutral-50 rounded-md p-4 space-y-3 border border-border-primary">
              <div className="flex justify-between items-center">
                <span className="font-medium text-foreground-primary">{t('case.details.customerName')}</span>
                <span className="text-foreground-secondary">
                  {currentCase.customer ? `${currentCase.customer.firstName || ''} ${currentCase.customer.lastName || ''}`.trim() || t('demographic.notProvided') : t('demographic.userNotFound')}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-foreground-primary">{t('case.details.appointmentDate')}</span>
                <span className="text-foreground-secondary">25.08.2025</span>
              </div>
              <hr className="border-border-primary" />
              <div className="flex justify-between items-center">
                <span className="font-medium text-foreground-primary">{t('case.details.gender')}</span>
                <span className="text-foreground-secondary">
                  {currentCase.customer?.gender ? translateGender(currentCase.customer.gender as Gender) : t('demographic.notProvided')}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-foreground-primary">{t('case.details.height')}</span>
                <span className="text-foreground-secondary">
                  {currentCase.customer?.height ? `${currentCase.customer.height}cm` : t('demographic.notProvided')}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-foreground-primary">{t('case.details.weight')}</span>
                <span className="text-foreground-secondary">
                  {currentCase.customer?.weight ? `${currentCase.customer.weight}kg` : t('demographic.notProvided')}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium text-foreground-primary">{t('case.details.dateOfBirth')}</span>
                <span className="text-foreground-secondary">
                  {currentCase.customer?.dateOfBirth ? (() => {
                    const dateString = typeof currentCase.customer!.dateOfBirth === 'string' 
                      ? currentCase.customer!.dateOfBirth as string 
                      : currentCase.customer!.dateOfBirth.toISOString();
                    return formatDate(dateString, language);
                  })() : t('demographic.notProvided')}
                </span>
              </div>
              <hr className="border-border-primary" />
              {/* Additional info fields can be added here as they become available */}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, attachment: null })}
        onConfirm={confirmDelete}
        title={t('case.details.deleteConfirmTitle')}
        message={t('case.details.deleteConfirm')}
      />

      {/* Accept Offer Confirmation Modal */}
      <ConfirmationModal
        isOpen={isAcceptModalOpen}
        onClose={() => setIsAcceptModalOpen(false)}
        onConfirm={confirmAcceptOffer}
        title={t('case.details.acceptOfferTitle') || 'Accept offer'}
        message={(t('case.details.acceptOfferMessage') || `Do you want to accept the offer${offerDocument?.doc_no ? ` ${offerDocument.doc_no}` : ''}? By accepting, you confirm that you have read and understood the offer.`) as string}
        confirmText={isAccepting ? (t('common.working') || 'Working...') : (t('case.details.acceptOffer') || 'Accept offer')}
        cancelText={t('case.details.cancel') || 'Cancel'}
      />

      {/* Upload Wizard */}
      <UploadAttachmentWizard
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        caseId={typeof currentCase.id === 'number' ? currentCase.id : (currentCase.id ? Number(currentCase.id) : undefined)}
        onUploaded={async () => {
          // After successful upload, refetch the case to refresh attachments
          if (!currentCase.id) return;
          const http = HttpService.getInstance();
          const refreshed = await http.getCaseById(String(currentCase.id));
          setAttachments(refreshed.attachments || []);
        }}
      />

      {/* Status flow modal */}
      <StatusFlowModal
        isOpen={isStatusInfoOpen}
        onClose={() => setIsStatusInfoOpen(false)}
        currentStatus={StatusUtils.extractStatus(currentCase.status)}
      />
    </div>
  );
};
