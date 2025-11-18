import React, { useEffect, useRef, useState } from 'react';
import Modal from '@/components/common/Modal';
import { useLanguage } from '@/contexts/LanguageContext';
import { HttpService } from '@/services/httpService';
import { getAttachmentTypeNameForFilename, buildAcceptStringForAllFiles, buildAcceptStringForQrImages } from '@/lib/attachmentTypeUtils';
import { useForm, Path } from 'react-hook-form';
import { FormInputField } from '@/components/common/FormInputField';

type UploadMode = 'file' | 'link' | 'qr';

interface UploadAttachmentWizardProps {
  isOpen: boolean;
  onClose: () => void;
  caseId?: number;
  onUploaded?: (attachmentId?: number, displayName?: string, typeName?: string) => void;
  isDiagnosis?: boolean;
}

type LinkForm = { linkUrl: string; description: string };

export const UploadAttachmentWizard: React.FC<UploadAttachmentWizardProps> = ({ isOpen, onClose, caseId, onUploaded, isDiagnosis = false }) => {
  const { t } = useLanguage();
  const [mode, setMode] = useState<UploadMode>('file');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const qrInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const [selectedQrFileName, setSelectedQrFileName] = useState<string>('');

  const http = HttpService.getInstance();

  const { register, getValues, reset, watch, formState: { errors } } = useForm<{ linkUrl: string; description: string }>();

  const watchedLinkUrl = watch('linkUrl');
  const watchedDescription = watch('description');

  // Reset ephemeral state whenever the modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedFileName('');
      setSelectedQrFileName('');
      setError(null);
      try {
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        if (qrInputRef.current) {
          qrInputRef.current.value = '';
        }
      } catch {}
      reset({ linkUrl: '', description: '' });
    }
  }, [isOpen, reset]);

  const validateUrl = (value: string) => {
    try {
      // Accepts http(s), mailto, tel and bare domains (backend validates too)
      if (/^(mailto:|tel:)/i.test(value)) return true;
      if (/^www\./i.test(value)) return true;
      // Try URL parsing, prepend http if missing scheme
      const u = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
      return !!u.hostname;
    } catch {
      return false;
    }
  };

  const uploadFileFlow = async (file: File) => {
    // 1) Ask backend for presigned URL and DB record
    // Provide type hint derived from extension to satisfy API model validators
    const typeName = getAttachmentTypeNameForFilename(file.name);
    const createRes = await http.createAttachment({ caseId, originalName: file.name, type: typeName ? { name: typeName } : null, is_diagnosis: isDiagnosis });
    const presignedUrl: string | null | undefined = (createRes as { url?: string | null; attachmentId?: number })?.url;
    const createdAttachmentId: string | number | undefined = (createRes as { url?: string | null; attachmentId?: number })?.attachmentId;

    if (!presignedUrl) {
      throw new Error('Upload URL not returned');
    }

    // 2) PUT file to S3 directly
    const urlObj = new URL(String(presignedUrl));
    const signedContentType = urlObj.searchParams.get('Content-Type') || undefined;
    const putRes = await fetch(presignedUrl, {
      method: 'PUT',
      headers: signedContentType ? { 'Content-Type': signedContentType } : (file.type ? { 'Content-Type': file.type } : {}),
      body: file,
    });
    if (!putRes.ok) {
      const text = await putRes.text();
      // Attempt to delete the created DB record on failure
      try {
        if (createdAttachmentId && typeof caseId === 'number') {
          await http.deleteAttachment({ attachmentId: String(createdAttachmentId), caseId });
        }
      } catch {
        // If cleanup fails, we leave the failed record; API might have marked it successfully though
      }
      throw new Error(text || 'Failed to upload to storage');
    }
    // Report created attachment id back to parent
    if (createdAttachmentId) {
      const idNum = typeof createdAttachmentId === 'number' ? createdAttachmentId : Number(createdAttachmentId);
      if (!Number.isNaN(idNum)) {
        onUploaded?.(idNum, file.name, typeName || undefined);
      }
    }
  };

  const uploadLinkFlow = async (urlValue: string, description: string) => {
    const res = await http.createAttachment({ caseId, url: urlValue, description, type: { name: 'Link' }, is_diagnosis: isDiagnosis });
    if (res && typeof res.attachmentId === 'number') {
      onUploaded?.(res.attachmentId, description || urlValue, 'Link');
    }
  };

  const decodeQrFromImage = async (file: File): Promise<string | null> => {
    const jsQRModule = await import('jsqr');
    const jsQR = jsQRModule.default as unknown as (data: Uint8ClampedArray, width: number, height: number) => { data: string } | null;

    const drawToCanvas = async (img: HTMLImageElement | ImageBitmap) => {
      const width: number = (img as HTMLImageElement).width ?? (img as ImageBitmap).width ?? 0;
      const height: number = (img as HTMLImageElement).height ?? (img as ImageBitmap).height ?? 0;
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;
      ctx.drawImage(img as CanvasImageSource, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);
      return code?.data || null;
    };

    // Handle SVG separately by rasterizing via Image element
    if (/\.svg$/i.test(file.name) || file.type === 'image/svg+xml') {
      const dataUrl: string = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = dataUrl;
      });
      return drawToCanvas(img);
    }

    const bitmap = await createImageBitmap(file);
    return drawToCanvas(bitmap);
  };

  const handleSubmit = async () => {
    try {
      setError(null);
      setIsSubmitting(true);

      if (mode === 'file') {
        const file = fileInputRef.current?.files?.[0];
        if (!file) throw new Error('Please select a file');
        await uploadFileFlow(file);
      } else if (mode === 'link') {
        const value = (getValues('linkUrl') || '').trim();
        if (!validateUrl(value)) throw new Error('Please enter a valid link');
        const desc = (getValues('description') || '').trim();
        if (!desc) throw new Error('Please enter a description');
        // Normalize domain-only to https://
        const normalized = /^(https?:\/\/|mailto:|tel:)/i.test(value) ? value : (value.startsWith('www.') ? `https://${value}` : `https://${value}`);
        await uploadLinkFlow(normalized, desc);
      } else if (mode === 'qr') {
        const file = qrInputRef.current?.files?.[0];
        if (!file) throw new Error('Please select an image or PDF with QR');

        if (/\.pdf$/i.test(file.name)) {
          // Basic PDF path: rely on user to upload a screenshot/image for now
          throw new Error('QR decoding from PDF is not supported in-browser. Please upload an image containing the QR code.');
        }

        const decoded = await decodeQrFromImage(file);
        if (!decoded) throw new Error('Could not read a QR code from the image');
        if (!validateUrl(decoded)) throw new Error('QR code does not contain a valid link');
        const desc = (getValues('description') || '').trim();
        if (!desc) throw new Error('Please enter a description');
        const normalized = /^(https?:\/\/|mailto:|tel:)/i.test(decoded) ? decoded : (decoded.startsWith('www.') ? `https://${decoded}` : `https://${decoded}`);
        await uploadLinkFlow(normalized, desc);
      }
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  // ---------- File selection helpers ----------
  const allowedFileExtensions = buildAcceptStringForAllFiles().split(',');
  const allowedQrExtensions = buildAcceptStringForQrImages().split(',');

  const validateExtension = (filename: string, allowed: string[]): boolean => {
    const lower = filename.toLowerCase();
    return allowed.some(ext => lower.endsWith(ext));
  };

  const onChooseFileClick = () => fileInputRef.current?.click();
  const onChooseQrClick = () => qrInputRef.current?.click();

  const onFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!validateExtension(file.name, allowedFileExtensions)) {
      setSelectedFileName('');
      e.currentTarget.value = '';
      setError(t('validation.fileTypeNotAllowed') || 'This file type is not allowed');
      return;
    }
    setError(null);
    setSelectedFileName(file.name);
  };

  const onQrSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!validateExtension(file.name, allowedQrExtensions)) {
      setSelectedQrFileName('');
      e.currentTarget.value = '';
      setError(t('validation.fileTypeNotAllowed') || 'This file type is not allowed');
      return;
    }
    if (/\.pdf$/i.test(file.name)) {
      // Just in case, although accept excludes pdf for QR
      setSelectedQrFileName('');
      e.currentTarget.value = '';
      setError(t('case.details.qrPdfNotSupported') || 'QR decoding from PDF is not supported');
      return;
    }
    setError(null);
    setSelectedQrFileName(file.name);
  };
  // -------------------------------------------

  const renderStep = () => {
    if (mode === 'file') {
      return (
        <div className="p-6 space-y-4">
          <p className="text-sm text-foreground-secondary">{t('case.details.uploadFileHint') || 'Upload PNG, JPG, JPEG, PDF, DICOM, NIfTI, etc.'}</p>
          <div className="flex items-center gap-3">
          <input
              ref={fileInputRef}
              type="file"
            accept={buildAcceptStringForAllFiles()}
              className="hidden"
              onChange={onFileSelected}
            />
            <button
              type="button"
              onClick={onChooseFileClick}
              className="px-4 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-700"
            >
              {t('common.chooseFile') || 'Choose file'}
            </button>
            <span className="text-sm text-foreground-secondary">
              {selectedFileName ? `${t('common.selectedFile') || 'Selected'}: ${selectedFileName}` : (t('common.noFileChosen') || 'No file chosen')}
            </span>
          </div>
        </div>
      );
    }
    if (mode === 'link') {
      return (
        <div className="p-6 space-y-4">
          <FormInputField<LinkForm>
            label={t('case.details.modeLink') || 'Link'}
            name={'linkUrl' as Path<LinkForm>}
            register={register}
            type="url"
            validation={{
              required: 'Link is required',
              validate: (value: string) => validateUrl(value) || 'Please enter a valid link'
            }}
            error={errors.linkUrl?.message as string}
          />
          <p className="text-xs text-foreground-tertiary">{t('case.details.linkHint') || 'Accepts http(s), mailto:, tel:, or domain names. Will be validated.'}</p>
          <FormInputField<LinkForm>
            label={'Description'}
            name={'description' as Path<LinkForm>}
            register={register}
            required={true}
            validation={{ required: 'Description is required', maxLength: { value: 256, message: 'Max 256 characters' } }}
            error={errors.description?.message as string}
          />
        </div>
      );
    }
    return (
      <div className="p-6 space-y-4">
        <p className="text-sm text-foreground-secondary">{t('case.details.qrHint') || 'Upload an image (PNG/JPG/JPEG/SVG) containing a QR code. We will read it and store the link.'}</p>
        <div className="flex items-center gap-3">
          <input
            ref={qrInputRef}
            type="file"
            accept={buildAcceptStringForQrImages()}
            className="hidden"
            onChange={onQrSelected}
          />
          <button
            type="button"
            onClick={onChooseQrClick}
            className="px-4 py-2 rounded-md bg-primary-600 text-white hover:bg-primary-700"
          >
            {t('common.chooseFile') || 'Choose file'}
          </button>
          <span className="text-sm text-foreground-secondary">
            {selectedQrFileName ? `${t('common.selectedFile') || 'Selected'}: ${selectedQrFileName}` : (t('common.noFileChosen') || 'No file chosen')}
          </span>
        </div>
        <FormInputField<LinkForm>
          label={'Description'}
          name={'description' as Path<LinkForm>}
          register={register}
          required={true}
          validation={{ required: 'Description is required', maxLength: { value: 256, message: 'Max 256 characters' } }}
          error={errors.description?.message as string}
        />
      </div>
    );
  };

  // Determine whether submit is allowed based on current mode
  const canSubmit = (() => {
    if (mode === 'file') {
      return Boolean(selectedFileName);
    }
    if (mode === 'link') {
      return Boolean(watchedDescription?.trim()) && Boolean(watchedLinkUrl) && validateUrl(watchedLinkUrl);
    }
    // mode === 'qr'
    return Boolean(selectedQrFileName) && Boolean(watchedDescription?.trim());
  })();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('case.details.upload') || 'Upload'} size="lg">
      {/* Mode Selector */}
      <div className="px-6 pt-4">
        <div className="inline-flex rounded-md border border-border-primary overflow-hidden w-full">
          {(['file','link','qr'] as UploadMode[]).map((m) => (
            <button
              key={m}
              className={`px-4 py-2 text-sm w-full ${mode === m ? 'bg-primary-600 text-white' : 'bg-background-secondary text-foreground-primary'}`}
              onClick={() => setMode(m)}
              disabled={isSubmitting}
            >
              {m === 'file' ? (t('case.details.modeFile') || 'File') : m === 'link' ? (t('case.details.modeLink') || 'Link') : (t('case.details.modeQr') || 'QR')}
            </button>
          ))}
        </div>
      </div>

      {/* Diagnosis flag removed from UI; parent controls via prop */}

      {renderStep()}

      {error && <div className="px-6 pb-2 text-sm text-red-600">{error}</div>}

      <div className="px-6 pb-6 flex justify-end gap-3">
        <button onClick={onClose} className="px-4 py-2 rounded-md border border-border-primary">
          {t('common.cancel') || 'Cancel'}
        </button>
        <button onClick={handleSubmit} disabled={isSubmitting || !canSubmit} className="px-4 py-2 rounded-md bg-primary-600 text-white disabled:opacity-60">
          {isSubmitting ? (t('common.working') || 'Working...') : (t('common.submit') || 'Submit')}
        </button>
      </div>
    </Modal>
  );
};

export default UploadAttachmentWizard;


