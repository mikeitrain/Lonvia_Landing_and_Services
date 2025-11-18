'use client'

import React, { useState, useEffect, useMemo } from 'react';
import { PersonalInformation } from './personal-information/personal-information';
import CaseOverview from './case-overview/case-overview';
import SidebarMenu, { MenuItem } from '@/components/common/SidebarMenu';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';


interface UserProfileProps {
  initialSection?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ initialSection = 'cases' }) => {
  const { t } = useLanguage();
  const { userGroups } = useAuth();
  const isPatient = useMemo(() => userGroups.includes('patient'), [userGroups]);
  
  // Menu items for the sidebar - moved outside component to prevent recreation
  const menuItems: MenuItem[] = useMemo(() => {
    const items: MenuItem[] = [
      ...(isPatient ? [{ id: 'cases', label: t('case.overview.title') || 'My Cases' } as MenuItem] : []),
      { id: 'personal', label: t('profile.personalInfo') || 'Personal Information' },
      { id: 'security', label: t('profile.security') || 'Security Settings' },
      { id: 'preferences', label: t('profile.preferences') || 'Preferences' },
      { id: 'notifications', label: t('profile.notifications') || 'Notifications' },
    ];
    return items;
  }, [t, isPatient]);

  // State to track the active section
  const [activeSection, setActiveSection] = useState(initialSection);

  // Update active section when initialSection or role changes
  useEffect(() => {
    const allowedSections = ['personal', 'security', 'preferences', 'notifications', ...(isPatient ? ['cases'] : [])];
    if (initialSection && allowedSections.includes(initialSection)) {
      setActiveSection(initialSection);
    } else if (initialSection === 'cases' && !isPatient) {
      setActiveSection('personal');
    }
  }, [initialSection, isPatient]);

  // Ensure we never stay on a disallowed section when role changes
  useEffect(() => {
    if (!isPatient && activeSection === 'cases') {
      setActiveSection('personal');
    }
  }, [isPatient, activeSection]);

  // Components for each section
  const renderSection = () => {
    switch (activeSection) {
      case 'cases':
        return <CaseOverview key="case-overview" />;
      case 'personal':
        return <PersonalInformation />;
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
        return isPatient ? <CaseOverview key="case-overview-default" /> : <PersonalInformation />;
    }
  };

  return (
    <SidebarMenu
      title={t('profile.title')}
      subtitle={t('profile.subtitle')}
      menuItems={menuItems}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
    >
      {renderSection()}
    </SidebarMenu>
  );
};

export default UserProfile;