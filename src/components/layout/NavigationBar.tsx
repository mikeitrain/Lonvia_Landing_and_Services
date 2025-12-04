import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useLanguage } from '../../contexts/LanguageContext';
import LanguageSelector from '../common/LanguageSelector';
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

export const NavigationBar: React.FC = () => {
  const { t } = useLanguage();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
    const handleRouteChange = () => {
      setIsMenuOpen(false);
      setIsServicesOpen(false);
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
    {
      name: t('services.ent'),
      route: "/ent",
      icon: "👂"
    },
    {
      name: t('services.ophthalmology'),
      route: "/ophthalmology",
      icon: "👁️"
    },
    {
      name: t('services.dermatology'),
      route: "/dermatology",
      icon: "🧴"
    },
    {
      name: t('services.neurology'),
      route: "/neurology",
      icon: "🧠"
    },
    {
      name: t('services.pediatrics'),
      route: "/pediatrics",
      icon: "👶"
    },
    {
      name: t('services.geriatrics'),
      route: "/geriatrics",
      icon: "👴"
    },
    {
      name: t('services.otherMedicalDomains'),
      route: "/other-medical-domains",
      icon: "🏥"
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

  const handleLonviaLabsClick = () => {
    router.push("/lonvia-labs");
    setIsMenuOpen(false);
  };

  const handlePartnersClick = () => {
    router.push("/partners");
    setIsMenuOpen(false);
  };

  const handleAboutClick = () => {
    router.push("/about");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-background-primary shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-end items-center py-2">
          <div className="flex items-center space-x-10">
            <LanguageSelector />
          </div>
        </div>

        <div className="flex items-end h-22 pb-8 pt-8">
          <div className="flex items-end flex-shrink-0">
            <Link href="/" className="flex items-end">
              <Image
                src="/Lonvia-Logo.svg"
                alt="Lonvia"
                width={200}
                height={64}
                priority
                className="hidden md:block h-16 w-auto"
              />
              <Image
                src="/Lonvia-Kurzlogo.svg"
                alt="Lonvia"
                width={64}
                height={64}
                priority
                className="block md:hidden h-16 w-auto"
              />
            </Link>
          </div>

          <div className="hidden md:flex items-end space-x-8 flex-1 justify-end">
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
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsServicesOpen(false)}
                  />

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
              onClick={handleLonviaLabsClick}
              className="text-foreground-secondary hover:text-primary-600 transition-colors"
            >
              {t('nav.lonviaLabs')}
            </button>

            <button
              onClick={handlePartnersClick}
              className="text-foreground-secondary hover:text-primary-600 transition-colors"
            >
              {t('nav.partners')}
            </button>

            <button
              onClick={handleAboutClick}
              className="text-foreground-secondary hover:text-primary-600 transition-colors"
            >
              {t('nav.about')}
            </button>
          </div>

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

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border-primary">
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

              <button
                onClick={handleContactClick}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-foreground-secondary hover:text-primary-600 hover:bg-background-secondary"
              >
                {t('nav.contact')}
              </button>

              <button
                onClick={handleLonviaLabsClick}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-foreground-secondary hover:text-primary-600 hover:bg-background-secondary"
              >
                {t('nav.lonviaLabs')}
              </button>

              <button
                onClick={handlePartnersClick}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-foreground-secondary hover:text-primary-600 hover:bg-background-secondary"
              >
                {t('nav.partners')}
              </button>

              <button
                onClick={handleAboutClick}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-foreground-secondary hover:text-primary-600 hover:bg-background-secondary"
              >
                {t('nav.about')}
              </button>

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
