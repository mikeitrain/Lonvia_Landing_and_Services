import React from 'react';
import { Case } from '@/types/case';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { CASE_STATUS } from '@/types/status';

interface CaseWorkflowInfoProps {
  caseData: Case;
}

export const CaseWorkflowInfo: React.FC<CaseWorkflowInfoProps> = ({ caseData }) => {
  const { userGroups } = useAuth();
  const { t } = useLanguage();

  return (
    <>
      {/* Payment info */}
      {userGroups?.includes('patient') && caseData.status?.name === CASE_STATUS.WAITING_FOR_PAYMENT && (
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <InformationCircleIcon className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-medium text-blue-800">
                {t('case.details.paymentWarning.title') || 'Payment Required'}
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  {t('case.details.paymentWarning.message') || 'Please pay the invoice to continue with your case. You received the invoice via email. You can also download the invoice below.'}
                </p>
              </div>
              <div className="mt-3 text-xs text-blue-600">
                <p>
                  {t('case.details.paymentWarning.alreadyPaid') || 'Already paid? This info will disappear once payment is confirmed.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}      

      {/* Offer info */}
      {userGroups?.includes('patient') && caseData.status?.name === CASE_STATUS.OFFER_SENT && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <InformationCircleIcon className="h-5 w-5 text-green-400" />
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-medium text-green-800">
                {t('case.details.offerInfo.title') || 'Offer Received'}
              </h3>
              <div className="mt-2 text-sm text-green-700">
                <p>
                  {t('case.details.offerInfo.message') || 'Please read the offer carefully. You received it via email or you can download it below. You need to accept it to continue.'}
                </p>
              </div>
              <div className="mt-3 text-xs text-green-600">
                <p>
                  {t('case.details.offerInfo.validity') || 'The offer is valid for 2 weeks.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Timeslots info */}
      {userGroups?.includes('patient') && caseData.status?.name === CASE_STATUS.TIMESLOTS_SENT && (
        <div className="mb-6 bg-purple-50 border border-purple-200 rounded-lg p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <InformationCircleIcon className="h-5 w-5 text-purple-400" />
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-medium text-purple-800">
                {t('case.details.timeslotsInfo.title') || 'Choose Your Appointment'}
              </h3>
              <div className="mt-2 text-sm text-purple-700">
                <p>
                  {t('case.details.timeslotsInfo.message') || 'Please select one of the suggested appointment times below to continue with your case.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
