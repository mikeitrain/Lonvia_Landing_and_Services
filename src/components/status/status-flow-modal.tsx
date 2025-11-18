'use client';

import React, { useMemo } from 'react';
import Modal from '@/components/common/Modal';
import { useLanguage } from '@/contexts/LanguageContext';
import { StatusUtils } from '@/lib/statusUtils';
import { CaseStatus, CASE_STATUS } from '@/types/status';

interface StatusFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStatus?: CaseStatus | null;
}

// Use shared transition map from StatusUtils
const getValidTransitions = (status: CaseStatus): CaseStatus[] => StatusUtils.getValidTransitions(status);

export const StatusFlowModal: React.FC<StatusFlowModalProps> = ({ isOpen, onClose, currentStatus }) => {
  const { t } = useLanguage();
  // Explicit lifecycle order (memoized to keep a stable reference)
  const statusesInOrder: CaseStatus[] = useMemo(() => [
    CASE_STATUS.NEW,
    CASE_STATUS.OFFER_SENT,
    CASE_STATUS.WAITING_FOR_PAYMENT,
    CASE_STATUS.PAID,
    CASE_STATUS.TIMESLOTS_SENT,
    CASE_STATUS.ARRANGED,
    CASE_STATUS.IN_CONSULTATION,
    CASE_STATUS.FINISHED,
    CASE_STATUS.DECLINED,
  ], []);

  const allowedNext = currentStatus ? getValidTransitions(currentStatus) : [];

  // Compute a unified badge width based on the widest translated label
  const badgeWidth = useMemo(() => {
    const labels = statusesInOrder.map((s) => t(StatusUtils.statusToTranslationKey(s)));
    if (typeof window === 'undefined') {
      // Fallback approximation for SSR (won't be used in client-only modal)
      const maxChars = Math.max(...labels.map((l) => l.length));
      return Math.ceil(maxChars * 8 + 24); // ~8px per char + padding
    }
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return 0;
    // font-medium ~ 500 weight, text-sm ~ 14px
    ctx.font = '500 14px system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif';
    let max = 0;
    for (const label of labels) {
      const w = ctx.measureText(label).width;
      if (w > max) max = w;
    }
    // Add horizontal padding used by the pill (px-3 => ~24px total)
    return Math.ceil(max + 24);
  }, [t, statusesInOrder]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" title={t('status.flowTitle') || 'Status flow'}>
      <div className="p-6 space-y-6">
        <div className="text-sm text-foreground-secondary">{t('status.setByAdmin')}</div>

        {/* Overview of all statuses in lifecycle order as a vertical stepper timeline */}
        <div>
          <div className="text-sm text-foreground-secondary mb-3">{t('status.flowOverview') || 'Overview of statuses and their meaning:'}</div>
          <ol className="grid gap-3 m-0 p-0 list-none">
            {statusesInOrder.map((s) => {
              const info = StatusUtils.getStatusInfo(s);
              const colorClass = StatusUtils.getStatusColorClasses(s);
              const isCurrent = currentStatus === s;
              const isNext = allowedNext.includes(s);
              return (
                <li key={s} className="grid grid-cols-[24px_1fr] gap-3 items-stretch relative">
                  {/* Rail */}
                  <div className="relative flex items-stretch justify-center">
                    {/* vertical line spanning full item height */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-border-primary" />
                    {/* centered dot */}
                    <div className={`absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full ${isCurrent ? 'bg-primary-600 ring-4 ring-primary-600/20' : 'bg-foreground-tertiary ring-4 ring-white'}`} />
                  </div>
                  {/* Card */}
                  <div className={`w-full min-h-[72px] bg-background-primary border border-border-primary rounded-xl shadow-sm p-4 ${isNext ? 'ring-1 ring-primary-600/50' : ''}`}>
                    <div className="flex items-center gap-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium shrink-0 justify-center ${colorClass}`}
                        style={{ width: badgeWidth ? `${badgeWidth}px` : undefined }}
                      >
                        {t(StatusUtils.statusToTranslationKey(s))}
                      </span>
                      <span className="text-sm text-foreground-secondary">
                        {t(`status.flow.${s.toLowerCase()}`) || info.description}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Allowed transitions from current status */}
        {/* Note: allowed transitions are emphasized inline by ring on target statuses */}
      </div>
    </Modal>
  );
};

export default StatusFlowModal;


