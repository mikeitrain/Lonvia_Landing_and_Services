import React, { useEffect, useState } from 'react';
import { Case } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { HttpService } from '@/services/httpService';
import { AppointmentCalendar } from './AppointmentCalendar';
import CaseList from '@/components/case/case-list';
import { CaseDetails } from '@/components/case/case-details';
import Modal from '@/components/common/Modal';

export const DoctorPanel: React.FC = () => {
  const { t } = useLanguage();
  const httpService = HttpService.getInstance();
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadCases = React.useCallback(async () => {
    setLoading(true);
    const response = await httpService.getWorkInProcessCases();
    setCases(response.cases || []);
    setLoading(false);
  }, [httpService]);

  useEffect(() => {
    loadCases();
  }, [loadCases]);

  // Get today's cases (only accepted appointments)
  const getTodayCases = (): Case[] => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayCases: Case[] = [];

    cases.forEach((caseData) => {
      const hasAppointmentToday = caseData.appointments?.some((appointment) => {
        // Only show accepted appointments
        if (appointment.scheduledStart && appointment.meetingStatus === 'accepted') {
          const appointmentDate = new Date(appointment.scheduledStart);
          return appointmentDate >= today && appointmentDate < tomorrow;
        }
        return false;
      });

      if (hasAppointmentToday) {
        todayCases.push(caseData);
      }
    });

    return todayCases;
  };

  // Get all upcoming cases sorted by date (only accepted appointments)
  const getUpcomingCases = (): Case[] => {
    const now = new Date();
    
    const upcomingCases: Case[] = [];

    cases.forEach((caseData) => {
      const hasFutureAppointment = caseData.appointments?.some((appointment) => {
        // Only show accepted appointments
        if (appointment.scheduledStart && appointment.meetingStatus === 'accepted') {
          const appointmentDate = new Date(appointment.scheduledStart);
          return appointmentDate >= now;
        }
        return false;
      });

      if (hasFutureAppointment) {
        upcomingCases.push(caseData);
      }
    });

    return upcomingCases;
  };

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

  const todayCases = getTodayCases();
  const upcomingCases = getUpcomingCases();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">{t('common.loading') || 'Loading...'}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Calendar Section */}
      <AppointmentCalendar cases={cases} onCaseClick={handleCaseClick} />

      {/* Today Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Today</h2>
        <CaseList cases={todayCases} onCaseClick={handleCaseClick} viewMode="arranged"/>
      </div>

      {/* Next Meetings Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Next Meetings</h2>
        <CaseList cases={upcomingCases} onCaseClick={handleCaseClick} viewMode="arranged"/>
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
    </div>
  );
};

