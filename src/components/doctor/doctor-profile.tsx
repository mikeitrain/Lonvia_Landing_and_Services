'use client'

import React, { useState, useEffect, useMemo } from 'react';
import SidebarMenu, { MenuItem } from '@/components/common/SidebarMenu';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import DoctorDetailsForm from './doctor-details-form';

interface DoctorProfileProps {
  initialSection?: string;
}

const DoctorProfile: React.FC<DoctorProfileProps> = ({ initialSection = 'doctor-details' }) => {
  const { t } = useLanguage();
  const { userGroups } = useAuth();
  const isDoctor = useMemo(() => userGroups.includes('doctor'), [userGroups]);
  
  // Menu items for the sidebar
  const menuItems: MenuItem[] = useMemo(() => {
    const items: MenuItem[] = [
      { id: 'doctor-details', label: t('doctor.profile.title') || 'Doctor Profile' },
      { id: 'security', label: t('profile.security') || 'Security Settings' },
      { id: 'preferences', label: t('profile.preferences') || 'Preferences' },
      { id: 'notifications', label: t('profile.notifications') || 'Notifications' },
    ];
    return items;
  }, [t]);

  // State to track the active section
  const [activeSection, setActiveSection] = useState(initialSection);

  // Update active section when initialSection changes
  useEffect(() => {
    const allowedSections = ['doctor-details', 'security', 'preferences', 'notifications'];
    if (initialSection && allowedSections.includes(initialSection)) {
      setActiveSection(initialSection);
    }
  }, [initialSection]);

  // Components for each section
  const renderSection = () => {
    switch (activeSection) {
      case 'doctor-details':
        return <DoctorDetailsForm key="doctor-details" />;
      case 'security':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-foreground-primary">{t('profile.security') || 'Security Settings'}</h2>
            <div className="text-center py-8">
              <p className="text-foreground-secondary">
                {t('profile.securityComingSoon') || 'Security settings will be available soon'}
              </p>
            </div>
          </div>
        );
      case 'preferences':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-foreground-primary">{t('profile.preferences') || 'Preferences'}</h2>
            <div className="text-center py-8">
              <p className="text-foreground-secondary">
                {t('profile.preferencesComingSoon') || 'Preferences will be available soon'}
              </p>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-foreground-primary">{t('profile.notifications') || 'Notifications'}</h2>
            <div className="text-center py-8">
              <p className="text-foreground-secondary">
                {t('profile.notificationsComingSoon') || 'Notification settings will be available soon'}
              </p>
            </div>
          </div>
        );
      default:
        return <DoctorDetailsForm key="doctor-details-default" />;
    }
  };

  if (!isDoctor) {
    return (
      <div className="p-6">
        <p className="text-foreground-secondary">Access denied. Doctor profile access required.</p>
      </div>
    );
  }

  return (
    <SidebarMenu
      title={t('doctor.profile.title') || 'Doctor Profile'}
      subtitle={t('doctor.profile.subtitle') || 'Manage your professional profile'}
      menuItems={menuItems}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
    >
      {renderSection()}
    </SidebarMenu>
  );
};

export default DoctorProfile;
