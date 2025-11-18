import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { FormDataManager } from '@/lib/formDataManager';
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline';

export const FormDataExpiryWarning: React.FC = () => {
  const { t } = useLanguage();
  const [showWarning, setShowWarning] = useState(false);
  const [hoursLeft, setHoursLeft] = useState(0);

  useEffect(() => {
    const checkExpiry = () => {
      if (FormDataManager.hasPendingData() && FormDataManager.isExpiringSoon()) {
        const data = FormDataManager.getPendingCaseData();
        if (data) {
          const now = Date.now();
          const hoursUntilExpiry = Math.ceil((data.expiresAt - now) / (1000 * 60 * 60));
          setHoursLeft(hoursUntilExpiry);
          setShowWarning(true);
        }
      } else {
        setShowWarning(false);
      }
    };

    // Check immediately
    checkExpiry();

    // Check every hour
    const interval = setInterval(checkExpiry, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const handleDismiss = () => {
    setShowWarning(false);
  };

  const handleSubmitNow = () => {
    // This will trigger the form submission flow
    window.location.href = '/case/create';
  };

  if (!showWarning) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-yellow-50 border border-yellow-200 rounded-lg shadow-lg p-4 max-w-sm z-50">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" />
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-yellow-800">
            {t('formData.expiryWarning') || 'Form Data Expiring Soon'}
          </h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>
              {t('formData.expiryMessage')?.replace('{hours}', hoursLeft.toString()) || 
               `Your saved form data will expire in ${hoursLeft} hours.`}
            </p>
          </div>
          <div className="mt-4 flex space-x-3">
            <button
              type="button"
              className="bg-yellow-50 px-2 py-1.5 rounded-md text-sm font-medium text-yellow-800 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-yellow-50 focus:ring-yellow-600"
              onClick={handleSubmitNow}
            >
              {t('formData.submitNow') || 'Submit Now'}
            </button>
            <button
              type="button"
              className="bg-yellow-50 px-2 py-1.5 rounded-md text-sm font-medium text-yellow-800 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-yellow-50 focus:ring-yellow-600"
              onClick={handleDismiss}
            >
              {t('formData.dismiss') || 'Dismiss'}
            </button>
          </div>
        </div>
        <div className="ml-auto pl-3">
          <button
            type="button"
            className="inline-flex bg-yellow-50 rounded-md p-1.5 text-yellow-500 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-yellow-50 focus:ring-yellow-600"
            onClick={handleDismiss}
          >
            <span className="sr-only">Dismiss</span>
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}; 