import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useNotifications } from '@/contexts/NotificationContext';
import CaseList from '@/components/case/case-list';
import { CaseDetails } from '@/components/case/case-details';
import Modal from '@/components/common/Modal';
import { Case } from '@/types/case';
import { HttpService } from '@/services/httpService';
import { ExclamationTriangleIcon, ArrowPathIcon, PlusIcon } from '@heroicons/react/24/outline';

const CaseOverview: React.FC = React.memo(() => {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const { addNotification } = useNotifications();
  const router = useRouter();
  const [cases, setCases] = useState<Case[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasLoadedRef = useRef(false);
  const isLoadingRef = useRef(false);
  const currentRequestIdRef = useRef<string | null>(null);

  const MAX_RETRIES = 3;

  const fetchCases = useCallback(async (isRetry = false) => {
    // Generate a unique request ID
    const requestId = Math.random().toString(36).substring(7);
    
    // Prevent multiple simultaneous requests - check and set immediately
    if (isLoadingRef.current) {
      return;
    }
    
    // Set loading state immediately to prevent other calls
    isLoadingRef.current = true;
    currentRequestIdRef.current = requestId;
    setIsLoading(true);
    
    // Check retry limit after setting loading state
    if (isRetry && retryCount >= MAX_RETRIES) {
      const errorMessage = t('case.maxRetriesReached') || 'Maximum retry attempts reached';
      setError(errorMessage);
      addNotification('error', errorMessage, 5000);
      // Reset loading state
      setIsLoading(false);
      isLoadingRef.current = false;
      currentRequestIdRef.current = null;
      return;
    }
    
    try {
      setError(null);
      
      const response = await HttpService.getInstance().getAllCases();
      
      // Only update state if this is still the current request
      if (currentRequestIdRef.current === requestId) {
        setCases(response?.cases || []);
        hasLoadedRef.current = true;
        setRetryCount(0); // Reset retry count on success
      } else {
      }
    } catch {
      const errorMessage = t('case.fetchError') || 'Failed to load cases';
      
      // Only update state if this is still the current request
      if (currentRequestIdRef.current === requestId) {
        if (isRetry) {
          setRetryCount(prev => prev + 1);
        }
        
        setError(errorMessage);
        addNotification('error', errorMessage, 5000);
      }
    } finally {
      // Only reset loading state if this is still the current request
      if (currentRequestIdRef.current === requestId) {
        setIsLoading(false);
        isLoadingRef.current = false;
        currentRequestIdRef.current = null;
      }
    }
  }, [t, addNotification, retryCount]);

  const refreshCases = useCallback(() => {
    hasLoadedRef.current = false;
    setRetryCount(0); // Reset retry count when manually refreshing
    fetchCases(true); // Mark as retry
  }, [fetchCases]);

  useEffect(() => {
    if (isAuthenticated && !hasLoadedRef.current) {
      fetchCases(false); // Initial load, not a retry
    }
    
    // Cleanup function to cancel ongoing requests
    return () => {
      currentRequestIdRef.current = null;
      isLoadingRef.current = false;
    };
  }, [isAuthenticated, fetchCases]);

  const handleCaseClick = (caseId: string) => {
    const selectedCaseData = cases.find(c => c.id?.toString() === caseId);
    if (selectedCaseData) {
      setSelectedCase(selectedCaseData);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCase(null);
  };

  const handleCaseUpdated = (updated: Case) => {
    setSelectedCase(updated);
    setCases(prev => {
      const id = updated.id;
      if (id == null) return prev;
      const idx = prev.findIndex(c => String(c.id||'') === String(id));
      if (idx === -1) return [updated, ...prev];
      const copy = prev.slice();
      copy[idx] = updated;
      return copy;
    });
  };

  const handleCreateCase = () => {
    router.push('/case/create');
  };

  if (error) {
    const maxRetriesReached = retryCount >= MAX_RETRIES;
    
    return (
      <div className="min-h-[400px] flex items-center justify-center px-6 py-12">
        <div className="max-w-md w-full text-center">
          <div className="bg-background-primary rounded-xl shadow-lg p-8 border border-border-primary">
            <div className="text-error-500 mb-6">
              <ExclamationTriangleIcon className="mx-auto h-16 w-16 text-error-400 mb-4" />
              <h3 className="text-lg font-semibold text-foreground-primary mb-2">
                {t('case.errorTitle') || 'Error loading cases'}
              </h3>
              <p className="text-sm text-foreground-secondary mb-4">{error}</p>
              {retryCount > 0 && (
                <p className="text-xs text-foreground-tertiary mb-4">
                  {t('case.retryAttempts') || `Retry attempts: ${retryCount}/${MAX_RETRIES}`}
                </p>
              )}
            </div>
            
            {!maxRetriesReached && (
              <button
                onClick={refreshCases}
                disabled={isLoading}
                className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
              >
                {isLoading ? (
                  <>
                    <ArrowPathIcon className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" />
                    {t('common.loading') || 'Loading...'}
                  </>
                ) : (
                  t('common.retry') || 'Retry'
                )}
              </button>
            )}
            
            {maxRetriesReached && (
              <div className="bg-background-secondary rounded-lg p-4">
                <p className="text-sm text-foreground-secondary">
                  {t('case.maxRetriesMessage') || 'Maximum retry attempts reached. Please try again later.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8 px-6 py-8">
        {/* Header */}
        <div className="bg-background-primary rounded-xl shadow-sm border border-border-primary p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-foreground-primary mb-3">
                {t('case.overview.title') || 'My Cases'}
              </h2>
              <p className="text-base text-foreground-secondary leading-relaxed">
                {t('case.overview.description') || 'View and manage your medical cases'}
              </p>
            </div>
            <div className="flex-shrink-0">
              <button
                onClick={handleCreateCase}
                className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
              >
                <PlusIcon className="w-5 h-5 mr-3" />
                {t('case.create') || 'Create New Case'}
              </button>
            </div>
          </div>
        </div>

        {/* Case List */}
        <div className="bg-background-primary rounded-xl shadow-sm border border-border-primary overflow-hidden">
          <CaseList 
            cases={cases} 
            onCaseClick={handleCaseClick}
            className="p-6"
          />
        </div>
      </div>

      {/* Case Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={selectedCase ? `Case ${selectedCase.id}` : ''}
        size="xl"
      >
        {selectedCase && <CaseDetails caseData={selectedCase} onUpdated={handleCaseUpdated} />}
      </Modal>
    </>
  );
});

CaseOverview.displayName = 'CaseOverview';

export default CaseOverview;
