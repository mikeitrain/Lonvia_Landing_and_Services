import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText
}) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-background-primary rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground-primary">
            {title}
          </h3>
        </div>
        
        {/* Content */}
        <div className="mb-6">
          <p className="text-foreground-secondary">
            {message}
          </p>
        </div>
        
        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-foreground-secondary bg-background-secondary border border-border-primary rounded-md hover:bg-background-tertiary transition-colors"
          >
            {cancelText || t('case.details.cancel')}
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 text-sm font-medium text-white border border-accent-600 rounded-md bg-accent-500 hover:bg-accent-600 transition-colors"
          >
            {confirmText || t('case.details.delete')}
          </button>
        </div>
      </div>
    </div>
  );
}; 