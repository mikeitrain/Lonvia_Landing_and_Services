import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import UploadAttachmentWizard from '@/components/case/UploadAttachmentWizard';
import { Button } from '@/components/common/Button';
import AttachmentList from '@/components/attachment/AttachmentList';
import { HttpService } from '@/services/httpService';
import { Attachment } from '@/types/attachment';

interface DiagnosisFormProps {
  attachments: Pick<Attachment, 'id' | 'originalName' | 'type'>[];
  onAddDetailed: (payload: { id: number; originalName?: string; typeName: string }) => void;
  onDelete?: (id: number) => void;
  onValidityChange?: (isValid: boolean) => void;
}

export const DiagnosisForm: React.FC<DiagnosisFormProps> = ({ attachments, onAddDetailed, onDelete, onValidityChange }) => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const http = HttpService.getInstance();

  React.useEffect(() => {
    onValidityChange?.((attachments || []).length > 0);
  }, [attachments, onValidityChange]);

  return (
    <div className="space-y-4">
      <p className="text-body">{t('case.create.diagnosisUploadInfo') || 'Upload your diagnosis files now. They will be linked to your case after creation.'}</p>
      <UploadAttachmentWizard
        isOpen={open}
        onClose={() => setOpen(false)}
        isDiagnosis={true}
        onUploaded={(id, displayName, typeName) => {
          if (typeof id === 'number') {
            onAddDetailed({ id, originalName: displayName || undefined, typeName: typeName || 'File' });
          }
        }}
      />
      <AttachmentList
        items={(attachments || []).map((a, idx) => ({
          id: a.id || idx,
          label: a.originalName || `Document ${idx + 1}`,
          typeName: a.type?.name,
          metaLeft: undefined,
          metaRight: undefined,
          showDelete: true,
        }))}
        showOpen={false}
        openText={t('case.details.open') || 'Open'}
        deleteText={t('case.details.delete') || 'Delete'}
        onOpen={async (id) => {
          const item = (attachments || []).find(a => String(a.id) === String(id));
          if (!item) return;
          // Pre-case attachments still can be opened if backed by S3 URL via getAttachmentUrl, but they have no caseId → cannot fetch URL
          // So for now, skip opening when no caseId
        }}
        onDelete={async (id) => {
          try {
            // Delete pre-case attachment (no caseId)
            await http.deleteAttachment({ attachmentId: String(id), caseId: null });
          } catch {
            // ignore; backend handles validation
          }
          onDelete?.(Number(id));
        }}
      />
      {!open && (
        <div className="flex justify-end">
          <Button type="button" variant="default" className="bg-primary-600 hover:bg-primary-700 text-white" onClick={() => setOpen(true)}>
            {t('case.details.upload') || 'Upload'}
          </Button>
        </div>
      )}
      {/* Navigation buttons rendered by wizard */}
    </div>
  );
};

export default DiagnosisForm;


