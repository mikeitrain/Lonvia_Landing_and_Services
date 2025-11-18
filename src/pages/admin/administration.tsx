'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { AdminRoute } from '@/components/common/AdminRoute';
import SidebarMenu, { MenuItem } from '@/components/common/SidebarMenu';
import DoctorOverview from '@/components/administration/doctor/overview';
import SpecialtiesContainer from '@/components/administration/specialties/specialties-container';
import { useLanguage } from '@/contexts/LanguageContext';
import { Specialty } from '@/types';
import { HttpService } from '@/services/httpService';

export default function AdministrationPage() {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState('doctors');
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [isLoadingSpecialties, setIsLoadingSpecialties] = useState(true); // eslint-disable-line @typescript-eslint/no-unused-vars
  const httpService = HttpService.getInstance();

  // Load specialties once for the entire administration
  const loadSpecialties = useCallback(async () => {
    setIsLoadingSpecialties(true);
    try {
      const specialtiesData = await httpService.getAllSpecialties();
      setSpecialties(specialtiesData);
    } finally {
      setIsLoadingSpecialties(false);
    }
  }, [httpService]);

  useEffect(() => {
    loadSpecialties();
  }, [loadSpecialties]);

  // Function to refresh specialties (called by child components)
  const handleSpecialtiesUpdate = useCallback(() => {
    loadSpecialties();
  }, [loadSpecialties]);

  // Menu items for the administration sidebar
  const menuItems: MenuItem[] = useMemo(() => [
    { id: 'doctors', label: t('admin.administration.doctors') },
    { id: 'specialties', label: t('admin.administration.specialties') },
    { id: 'users', label: t('admin.administration.users') },
    { id: 'settings', label: t('admin.administration.settings') },
    { id: 'reports', label: t('admin.administration.reports') },
  ], [t]);

  // Components for each section
  const renderSection = () => {
    switch (activeSection) {
      case 'doctors':
        return (
          <div className="p-6">
            <DoctorOverview specialties={specialties} onSpecialtiesUpdate={handleSpecialtiesUpdate} />
          </div>
        );
      case 'specialties':
        return (
          <div className="p-6">
            <SpecialtiesContainer specialties={specialties} onSpecialtiesUpdate={handleSpecialtiesUpdate} />
          </div>
        );
      case 'settings':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-foreground-primary">
              {t('admin.administration.settings')}
            </h2>
            <div className="text-center py-8">
              <p className="text-foreground-secondary">
                System settings functionality will be implemented here.
              </p>
            </div>
          </div>
        );
      case 'reports':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-foreground-primary">
              {t('admin.administration.reports')}
            </h2>
            <div className="text-center py-8">
              <p className="text-foreground-secondary">
                Reports and analytics functionality will be implemented here.
              </p>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-foreground-primary">
              {t('admin.administration.doctors')}
            </h2>
            <div className="text-center py-8">
              <p className="text-foreground-secondary">
                Doctor management functionality will be implemented here.
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <AdminRoute>
      <SidebarMenu
        title={t('admin.administration.title')}
        subtitle={t('admin.administration.subtitle')}
        menuItems={menuItems}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      >
        {renderSection()}
      </SidebarMenu>
    </AdminRoute>
  );
}
