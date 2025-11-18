 'use client';

import React, { useEffect, useState } from 'react';
import { AdminRoute } from '@/components/common/AdminRoute';
import CaseList from '@/components/case/case-list';
import Modal from '@/components/common/Modal';
import { CaseDetails } from '@/components/case/case-details';
import { HttpService } from '@/services/httpService';
import { Case, CaseListPaginatedResponse } from '@/types/case';
import { CASE_STATUS, CaseStatus } from '@/types/status';
import { useLanguage } from '@/contexts/LanguageContext';
import { StatusUtils } from '@/lib/statusUtils';
import { DoctorProfile } from '@/types/doctor';
// no direct auth calls here; AdminRoute handles access control

export default function AdminPanelPage() {
  const { t } = useLanguage();
  const [workInProcess, setWorkInProcess] = useState<Case[]>([]);
  const [waitingForUser, setWaitingForUser] = useState<Case[]>([]);
  const [arranged, setArranged] = useState<Case[] | null>(null);
  const [inConsultation, setInConsultation] = useState<Case[] | null>(null);
  const [declined, setDeclined] = useState<Case[] | null>(null);
  const [finished, setFinished] = useState<Case[] | null>(null);
  const [initializing, setInitializing] = useState(true);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [doctors, setDoctors] = useState<DoctorProfile[]>([]);

  useEffect(() => {
    const init = async () => {
      try {
        const http = HttpService.getInstance();
        const [wipRes, wfuRes, doctorsRes] = await Promise.all([
          http.getWorkInProcessCases(),
          http.getWaitingForUserCases(),
          http.getAllDoctors({ isActive: true }),
        ]);
        setWorkInProcess(wipRes.cases || []);
        setWaitingForUser(wfuRes.cases || []);
        setDoctors(doctorsRes.doctors || []);
      } finally {
        setInitializing(false);
      }
    };
    init();
  }, []);

  const loadByStatus = async (status: CaseStatus, setter: (cases: Case[]) => void) => {
    const http = HttpService.getInstance();
    const res: CaseListPaginatedResponse = await http.getCasesByStatus([status]);
    setter(res.cases || []);
  };

  const insertOrReplace = (list: Case[], updated: Case): Case[] => {
    const id = updated.id;
    if (id == null) return list;
    const idx = list.findIndex(c => String(c.id||'') === String(id));
    if (idx === -1) return [updated, ...list];
    const copy = list.slice();
    copy[idx] = updated;
    return copy;
  };

  const removeFromList = (list: Case[], updated: Case): Case[] => list.filter(c => String(c.id||'') !== String(updated.id||''));

  const mapStatusToListKey = (status: CaseStatus | null): 'workInProcess' | 'waitingForUser' | 'arranged' | 'inConsultation' | 'declined' | 'finished' | null => {
    switch (status) {
      case CASE_STATUS.NEW:
      case CASE_STATUS.PAID:
        return 'workInProcess';
      case CASE_STATUS.OFFER_SENT:
      case CASE_STATUS.WAITING_FOR_PAYMENT:
      case CASE_STATUS.TIMESLOTS_SENT:
        return 'waitingForUser';
      case CASE_STATUS.ARRANGED:
        return 'arranged';
      case CASE_STATUS.IN_CONSULTATION:
        return 'inConsultation';
      case CASE_STATUS.DECLINED:
        return 'declined';
      case CASE_STATUS.FINISHED:
        return 'finished';
      default:
        return null;
    }
  };

  const handleCaseUpdated = (updated: Case) => {
    setSelectedCase(updated);
    const status = StatusUtils.toCaseStatus(updated.status?.name || '');
    const target = mapStatusToListKey(status);

    // Remove from all lists first
    setWorkInProcess(prev => removeFromList(prev, updated));
    setWaitingForUser(prev => removeFromList(prev, updated));
    setArranged(prev => (prev ? removeFromList(prev, updated) : prev));
    setInConsultation(prev => (prev ? removeFromList(prev, updated) : prev));
    setDeclined(prev => (prev ? removeFromList(prev, updated) : prev));
    setFinished(prev => (prev ? removeFromList(prev, updated) : prev));

    // Add to the appropriate list
    if (target === 'workInProcess') {
      setWorkInProcess(prev => insertOrReplace(prev, updated));
    } else if (target === 'waitingForUser') {
      setWaitingForUser(prev => insertOrReplace(prev, updated));
    } else if (target === 'arranged') {
      setArranged(prev => (prev ? insertOrReplace(prev, updated) : prev));
    } else if (target === 'inConsultation') {
      setInConsultation(prev => (prev ? insertOrReplace(prev, updated) : prev));
    } else if (target === 'declined') {
      setDeclined(prev => (prev ? insertOrReplace(prev, updated) : prev));
    } else if (target === 'finished') {
      setFinished(prev => (prev ? insertOrReplace(prev, updated) : prev));
    }
  };

  if (initializing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
      </div>
    );
  }

  return (
    <AdminRoute>
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <h1 className="text-3xl font-bold">{t('admin.panel.title')}</h1>

        <section className="bg-background-secondary border border-border-primary rounded-lg shadow-sm p-5">
          <h2 className="text-xl font-semibold mb-3">{t('admin.panel.workInProcess')}</h2>
          <div className="bg-background-primary border border-border-primary rounded-md p-4">
            <CaseList cases={workInProcess} onCaseClick={(id) => {
              const found = workInProcess.find(c => String(c.id||'') === String(id));
              if (found) setSelectedCase(found);
            }} />
          </div>
        </section>

        <section className="bg-background-secondary border border-border-primary rounded-lg shadow-sm p-5">
          <h2 className="text-xl font-semibold mb-3">{t('admin.panel.waitingForUser')}</h2>
          <div className="bg-background-primary border border-border-primary rounded-md p-4">
            <CaseList cases={waitingForUser} onCaseClick={(id) => {
              const found = waitingForUser.find(c => String(c.id||'') === String(id));
              if (found) setSelectedCase(found);
            }} />
          </div>
        </section>

        <section className="bg-background-secondary border border-border-primary rounded-lg shadow-sm p-5">
          <h2 className="text-xl font-semibold mb-4">{t('admin.panel.arranged')}</h2>
          {arranged === null ? (
            <div className="flex justify-center">
              <button
                className="bg-primary-600 text-white px-5 py-2 rounded-md font-medium hover:bg-primary-700"
                onClick={() => loadByStatus(CASE_STATUS.ARRANGED, (c) => setArranged(c))}
              >
                {t('admin.panel.loadCases')}
              </button>
            </div>
          ) : (
            <div className="bg-background-primary border border-border-primary rounded-md p-4">
              <CaseList cases={arranged} onCaseClick={(id) => {
                const found = arranged?.find(c => String(c.id||'') === String(id));
                if (found) setSelectedCase(found);
              }} />
            </div>
          )}
        </section>

        <section className="bg-background-secondary border border-border-primary rounded-lg shadow-sm p-5">
          <h2 className="text-xl font-semibold mb-4">{t('admin.panel.inConsultation')}</h2>
          {inConsultation === null ? (
            <div className="flex justify-center">
              <button
                className="bg-primary-600 text-white px-5 py-2 rounded-md font-medium hover:bg-primary-700"
                onClick={() => loadByStatus(CASE_STATUS.IN_CONSULTATION, (c) => setInConsultation(c))}
              >
                {t('admin.panel.loadCases')}
              </button>
            </div>
          ) : (
            <div className="bg-background-primary border border-border-primary rounded-md p-4">
              <CaseList cases={inConsultation} onCaseClick={(id) => {
                const found = inConsultation?.find(c => String(c.id||'') === String(id));
                if (found) setSelectedCase(found);
              }} />
            </div>
          )}
        </section>

        <section className="bg-background-secondary border border-border-primary rounded-lg shadow-sm p-5">
          <h2 className="text-xl font-semibold mb-4">{t('admin.panel.declined')}</h2>
          {declined === null ? (
            <div className="flex justify-center">
              <button
                className="bg-primary-600 text-white px-5 py-2 rounded-md font-medium hover:bg-primary-700"
                onClick={() => loadByStatus(CASE_STATUS.DECLINED, (c) => setDeclined(c))}
              >
                {t('admin.panel.loadCases')}
              </button>
            </div>
          ) : (
            <div className="bg-background-primary border border-border-primary rounded-md p-4">
              <CaseList cases={declined} onCaseClick={(id) => {
                const found = declined?.find(c => String(c.id||'') === String(id));
                if (found) setSelectedCase(found);
              }} />
            </div>
          )}
        </section>

        <section className="bg-background-secondary border border-border-primary rounded-lg shadow-sm p-5">
          <h2 className="text-xl font-semibold mb-4">{t('admin.panel.finished')}</h2>
          {finished === null ? (
            <div className="flex justify-center">
              <button
                className="bg-primary-600 text-white px-5 py-2 rounded-md font-medium hover:bg-primary-700"
                onClick={() => loadByStatus(CASE_STATUS.FINISHED, (c) => setFinished(c))}
              >
                {t('admin.panel.loadCases')}
              </button>
            </div>
          ) : (
            <div className="bg-background-primary border border-border-primary rounded-md p-4">
              <CaseList cases={finished} onCaseClick={(id) => {
                const found = finished?.find(c => String(c.id||'') === String(id));
                if (found) setSelectedCase(found);
              }} />
            </div>
          )}
        </section>
      </div>
      {/* Case details modal */}
      <Modal
        isOpen={selectedCase !== null}
        onClose={() => setSelectedCase(null)}
        size="xl"
        title={selectedCase ? `${t('case.overview.title')} #${selectedCase.id}` : undefined}
      >
        {selectedCase ? (
          <CaseDetails caseData={selectedCase as Case} doctors={doctors} onUpdated={handleCaseUpdated} />
        ) : null}
      </Modal>
    </AdminRoute>
  );
}

