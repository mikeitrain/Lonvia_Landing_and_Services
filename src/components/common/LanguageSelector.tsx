'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { Button } from './Button';

const languageOptions = [
  { code: 'ro', name: 'Română', flag: '🇷🇴', symbol: 'RO' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪', symbol: 'DE' },
  { code: 'en', name: 'English', flag: '🇬🇧', symbol: 'EN' },
] as const;

export default function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setIsOpen(false);
  };

  const currentLanguage = languageOptions.find(lang => lang.code === language);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-2 py-1 text-sm font-bold text-gray-700 hover:text-[#35ae2a] transition-colors bg-transparent"
        aria-label={t('nav.language')}
      >
        <span>{currentLanguage?.symbol}</span>
        <ChevronDownIcon className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 bg-background-primary rounded-xl shadow-medium border border-border-primary z-50">
          <div className="py-1">
            {languageOptions.map((option) => (
              <Button
                key={option.code}
                variant="ghost"
                onClick={() => handleLanguageChange(option.code as Language)}
                className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left hover:bg-gray-50 transition-colors ${
                  language === option.code ? 'bg-[#35ae2a]/10 text-[#35ae2a]' : 'text-gray-700'
                }`}
              >
                <span className="text-lg">{option.flag}</span>
                <span>{option.name}</span>
                <div className={`ml-auto w-2 h-2 rounded-full ${
                  language === option.code ? 'bg-[#35ae2a]' : 'bg-transparent'
                }`}></div>
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 