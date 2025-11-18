import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationContext';
import LanguageSelector from '../common/LanguageSelector';
import { fetchAuthSession } from 'aws-amplify/auth';
import {
  ChevronDownIcon,
  UserIcon,
  KeyIcon,
  ClipboardDocumentListIcon,
  ArrowRightStartOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

export const NavigationBar: React.FC = () => {
  const { t } = useLanguage();
  const { isAuthenticated, logout, userGroups } = useAuth();
  const { addNotification } = useNotifications();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Determine the current section name based on the route
  const getCurrentSectionName = () => {
    const path = router.pathname;
    
    if (isAdmin) {
      if (path.startsWith('/admin/panel')) {
        return t('nav.adminPanel') || 'Admin Panel';
      }
      if (path.startsWith('/admin/administration')) {
        return t('admin.administration.title') || 'Administration';
      }
    } else if (userGroups.includes('doctor')) {
      if (path.startsWith('/doctor/panel')) {
        return t('nav.doctorPanel') || 'Doctor Panel';
      }
      if (path.startsWith('/doctor/profile')) {
        return t('nav.profile') || 'Profile';
      }
    } else {
      if (path.startsWith('/user/profile')) {
        return t('nav.profile') || 'Profile';
      }
    }
    
    return t('nav.account') || 'Account';
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        if (!isAuthenticated) {
          if (mounted) setIsAdmin(false);
          return;
        }
        const session = await fetchAuthSession();
        const idPayload = session.tokens?.idToken?.payload as Record<string, unknown> | undefined;
        const groups = (idPayload?.['cognito:groups'] as string[] | undefined) || [];
        if (mounted) setIsAdmin(groups.includes('admin'));
      } catch {
        if (mounted) setIsAdmin(false);
      }
    })();
    return () => { mounted = false; };
  }, [isAuthenticated]);

  // Ensure no dropdowns remain open when auth state changes (e.g., after login)
  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
    setIsUserMenuOpen(false);
  }, [isAuthenticated]);

  // Close any open menus on route changes
  useEffect(() => {
    const handleRouteChange = () => {
      setIsMenuOpen(false);
      setIsServicesOpen(false);
      setIsUserMenuOpen(false);
    };
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  const services = [
    {
      name: t('services.urology'),
      route: "/urology",
      icon: "🫁"
    },
    {
      name: t('services.orthopedics'),
      route: "/orthopedics",
      icon: "🦴"
    },
    {
      name: t('services.plasticSurgery'),
      route: "/plastic-surgery",
      icon: "✨"
    },
    {
      name: t('services.internalMedicine'),
      route: "/internal-medicine",
      icon: "🩺"
    },
    {
      name: t('services.surgery'),
      route: "/surgery",
      icon: "🏥"
    },
    {
      name: t('services.oncology'),
      route: "/oncology",
      icon: "🎗️"
    },
  ];

  const handleServiceClick = (route: string) => {
    router.push(route);
    setIsServicesOpen(false);
    setIsMenuOpen(false);
  };

  const handleOurTeamClick = () => {
    router.push("/our-team");
    setIsMenuOpen(false);
  };

  const handleContactClick = () => {
    router.push("/about/contact");
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    addNotification('success', t('message.loggedOut'), 3000);
    router.push('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <nav className="bg-background-primary shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        {/* Top Row - Action Buttons (Right Aligned) */}
        <div className="flex justify-end items-center py-2">
          <div className="flex items-center space-x-10">
            <LanguageSelector />

            {isAuthenticated ? (
              <div className="flex items-center space-x-10">
                <div className="relative">
                  <button
                    onClick={toggleUserMenu}
                    className="flex items-center gap-1 px-2 py-1 text-sm font-bold text-foreground-secondary hover:text-primary-600 transition-colors border border-primary-600 rounded bg-transparent"
                  >
                    {getCurrentSectionName()}
                    <ChevronDownIcon
                      className={`w-3 h-3 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {isUserMenuOpen && (
                    <>
                      {/* Backdrop */}
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsUserMenuOpen(false)}
                      />

                      {/* User Menu Dropdown */}
                      <div className="absolute top-full right-0 mt-2 w-48 bg-background-primary border border-border-primary rounded-lg shadow-lg z-20">
                        <div className="py-2">
                          {/* Profile Link based on role */}
                          {isAdmin ? (
                            <>
                              <Link
                                href="/admin/panel"
                                className="w-full flex items-center px-4 py-3 text-left text-foreground-secondary hover:bg-background-secondary transition-colors duration-200"
                                onClick={() => setIsUserMenuOpen(false)}
                              >
                                <ClipboardDocumentListIcon className="w-5 h-5 mr-3 text-foreground-tertiary" />
                                {t('nav.adminPanel')}
                              </Link>
                              <Link
                                href="/admin/administration"
                                className="w-full flex items-center px-4 py-3 text-left text-foreground-secondary hover:bg-background-secondary transition-colors duration-200"
                                onClick={() => setIsUserMenuOpen(false)}
                              >
                                <KeyIcon className="w-5 h-5 mr-3 text-foreground-tertiary" />
                                {t('admin.administration.title')}
                              </Link>
                            </>
                          ) : userGroups.includes('doctor') ? (
                            <>
                              <Link
                                href="/doctor/panel"
                                className="w-full flex items-center px-4 py-3 text-left text-foreground-secondary hover:bg-background-secondary transition-colors duration-200"
                                onClick={() => setIsUserMenuOpen(false)}
                              >
                                <ClipboardDocumentListIcon className="w-5 h-5 mr-3 text-foreground-tertiary" />
                                {t('nav.doctorPanel') || 'Doctor Panel'}
                              </Link>
                              <Link
                                href="/doctor/profile"
                                className="w-full flex items-center px-4 py-3 text-left text-foreground-secondary hover:bg-background-secondary transition-colors duration-200"
                                onClick={() => setIsUserMenuOpen(false)}
                              >
                                <UserIcon className="w-5 h-5 mr-3 text-foreground-tertiary" />
                                {t('nav.profile') || 'Profile'}
                              </Link>
                            </>
                          ) : (
                            <Link
                              href="/user/profile"
                              className="w-full flex items-center px-4 py-3 text-left text-foreground-secondary hover:bg-background-secondary transition-colors duration-200"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <UserIcon className="w-5 h-5 mr-3 text-foreground-tertiary" />
                              {t('nav.profile') || 'Profile'}
                            </Link>
                          )}
                          <div className="border-t border-border-light my-1"></div>
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center px-4 py-3 text-left text-foreground-secondary hover:bg-background-secondary transition-colors duration-200"
                          >
                            <ArrowRightStartOnRectangleIcon className="w-5 h-5 mr-3 text-foreground-tertiary" />
                            {t('nav.logout') || 'Logout'}
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-10">
                <Link
                  href="/auth/login"
                  className="px-2 py-1 text-sm font-bold text-foreground-secondary hover:text-primary-600 transition-colors"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  href="/auth/register"
                  className="px-2 py-1 text-sm font-bold text-foreground-secondary hover:text-primary-600 transition-colors border border-primary-600 rounded bg-transparent"
                >
                  {t('nav.register')}
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Row - Logo and Main Navigation */}
        <div className="flex items-end h-22 pb-8 pt-8">
          {/* Logo - Left */}
          <div className="flex items-end flex-shrink-0">
            <Link href="/" className="flex items-end">
              <Image
                src="/Lonvia-Logo.svg"
                alt="Lonvia"
                priority
                className="hidden md:block h-16 w-auto"
              />
              <Image
                src="/Lonvia-Kurzlogo.svg"
                alt="Lonvia"
                priority
                className="block md:hidden h-16 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation - Right Aligned */}
          <div className="hidden md:flex items-end space-x-8 flex-1 justify-end">
            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="flex items-center text-foreground-secondary hover:text-primary-600 transition-colors"
                aria-label={t('nav.services')}
              >
                <span>{t('nav.services')}</span>
                <ChevronDownIcon
                  className={`w-4 h-4 ml-1 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isServicesOpen && (
                <>
                  {/* Backdrop */}
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsServicesOpen(false)}
                  />

                  {/* Dropdown */}
                  <div className="absolute top-full right-0 mt-2 w-80 bg-background-primary border border-border-primary rounded-lg shadow-lg z-20">
                    <div className="py-2">
                      <div className="px-4 py-2 text-sm font-semibold text-foreground-secondary border-b border-border-light">
                        {t('landing.services.title')}
                      </div>
                      {services.map((service, index) => (
                        <button
                          key={index}
                          onClick={() => handleServiceClick(service.route)}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-background-secondary transition-colors duration-200"
                        >
                          <span className="text-xl">{service.icon}</span>
                          <span className="text-foreground-secondary hover:text-primary-600 font-medium">
                            {service.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={handleOurTeamClick}
              className="text-foreground-secondary hover:text-primary-600 transition-colors"
            >
              {t('nav.ourTeam')}
            </button>

            <button
              onClick={handleContactClick}
              className="text-foreground-secondary hover:text-primary-600 transition-colors"
            >
              {t('nav.contact')}
            </button>

            <button
              className="text-foreground-secondary hover:text-primary-600 transition-colors"
            >
              {t('nav.lonviaLabs')}
            </button>

            <button
              className="text-foreground-secondary hover:text-primary-600 transition-colors"
            >
              {t('nav.about')}
            </button>
          </div>

          {/* Mobile menu button - Right side */}
          <div className="md:hidden ml-auto flex items-end">
            <button
              onClick={toggleMenu}
              className="text-foreground-secondary hover:text-primary-600 focus:outline-none focus:text-primary-600"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border-primary">
              {/* Create Case Button - Mobile */}
              <Link
                href="/case/create"
                className="block w-full text-center px-3 py-3 rounded-lg text-base font-medium bg-primary-600 text-white hover:bg-primary-700 transition-colors mb-4"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center justify-center gap-2">
                  <PlusIcon className="w-5 h-5" />
                  {t('nav.createCase') || 'Create Case'}
                </div>
              </Link>

              {/* Services */}
              <div>
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="flex items-center justify-between w-full text-left px-3 py-2 rounded-md text-base font-medium text-foreground-secondary hover:text-primary-600 hover:bg-background-secondary"
                >
                  <span>{t('nav.services')}</span>
                  <ChevronDownIcon
                    className={`w-5 h-5 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isServicesOpen && (
                  <div className="mt-2 pl-4 space-y-3 border-l-2 border-border-primary">
                    {services.map((service, index) => (
                      <button
                        key={index}
                        onClick={() => handleServiceClick(service.route)}
                        className="flex items-center space-x-3 w-full text-left py-2 text-foreground-tertiary hover:text-primary-600 transition-colors duration-200"
                      >
                        <span className="text-xl">{service.icon}</span>
                        <span className="font-medium">{service.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={handleOurTeamClick}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-foreground-secondary hover:text-primary-600 hover:bg-background-secondary"
              >
                {t('nav.ourTeam')}
              </button>

              <Link
                href="/#about"
                className="block px-3 py-2 rounded-md text-base font-medium text-foreground-secondary hover:text-primary-600 hover:bg-background-secondary"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.about')}
              </Link>

              <button
                onClick={handleContactClick}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-foreground-secondary hover:text-primary-600 hover:bg-background-secondary"
              >
                {t('nav.contact')}
              </button>

              {isAuthenticated ? (
                <>
                  {/* User Profile Section - Only shown when authenticated */}
                  <div className="border-t border-border-primary pt-2 mt-2">
                    <div className="px-3 py-2 text-xs font-semibold text-foreground-tertiary uppercase tracking-wider">
                      {t('profile.title') || 'User Profile'}
                    </div>
                    {isAdmin ? (
                      <>
                        <Link
                          href="/admin/panel"
                          className="block px-3 py-2 rounded-md text-base font-medium text-foreground-secondary hover:text-primary-600 hover:bg-background-secondary"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {t('nav.adminPanel')}
                        </Link>
                        <Link
                          href="/admin/administration"
                          className="block px-3 py-2 rounded-md text-base font-medium text-foreground-secondary hover:text-primary-600 hover:bg-background-secondary"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {t('admin.administration.title')}
                        </Link>
                      </>
                    ) : userGroups.includes('doctor') ? (
                      <>
                        <Link
                          href="/doctor/panel"
                          className="block px-3 py-2 rounded-md text-base font-medium text-foreground-secondary hover:text-primary-600 hover:bg-background-secondary"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {t('nav.doctorPanel')}
                        </Link>
                        <Link
                          href="/doctor/profile"
                          className="block px-3 py-2 rounded-md text-base font-medium text-foreground-secondary hover:text-primary-600 hover:bg-background-secondary"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {t('nav.profile') || 'Profile'}
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/user/profile"
                          className="block px-3 py-2 rounded-md text-base font-medium text-foreground-secondary hover:text-primary-600 hover:bg-background-secondary"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {t('case.overview.title') || 'My Cases'}
                        </Link>
                        <Link
                          href="/user/profile?section=personal"
                          className="block px-3 py-2 rounded-md text-base font-medium text-foreground-secondary hover:text-primary-600 hover:bg-background-secondary"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {t('profile.personalInfo') || 'Personal Information'}
                        </Link>
                      </>
                    )}
                    <button
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-foreground-tertiary hover:text-foreground-secondary hover:bg-background-secondary"
                      disabled
                    >
                      {t('profile.security') || 'Security Settings'}
                    </button>
                    <button
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-foreground-tertiary hover:text-foreground-secondary hover:bg-background-secondary"
                      disabled
                    >
                      {t('profile.preferences') || 'Preferences'}
                    </button>
                    <button
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-foreground-tertiary hover:text-foreground-secondary hover:bg-background-secondary"
                      disabled
                    >
                      {t('profile.notifications') || 'Notifications'}
                    </button>
                  </div>

                  {/* Account Actions */}
                  <div className="border-t border-border-primary pt-2 mt-2">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-error-600 hover:text-error-700 hover:bg-error-50"
                    >
                      {t('nav.logout') || 'Logout'}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-foreground-secondary hover:text-primary-600 hover:bg-background-secondary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('nav.login')}
                  </Link>
                  <Link
                    href="/auth/register"
                    className="block px-3 py-2 rounded-md text-base font-medium text-foreground-secondary hover:text-primary-600 hover:bg-background-secondary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('nav.register')}
                  </Link>
                </>
              )}
              <div className="px-3 py-2">
                <LanguageSelector />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}; 