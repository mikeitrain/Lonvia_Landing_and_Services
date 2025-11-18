import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';

export const ContactInfoSection: React.FC = () => {
  const { t } = useLanguage();

  const contactInfo = [
    {
      icon: <PhoneIcon className="w-4 h-4 text-white" />,
      label: t('contact.phone'),
      value: "(555) 123-4567"
    },
    {
      icon: <EnvelopeIcon className="w-4 h-4 text-white" />,
      label: t('contact.email'),
      value: "info@lonvia.com"
    },
    {
      icon: <MapPinIcon className="w-4 h-4 text-white" />,
      label: t('contact.address'),
      value: "123 Healthcare Ave\nCity, State 12345"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">{t('contact.info.title')}</h2>

      <div className="space-y-4">
        {contactInfo.map((info, index) => (
          <div key={index} className="flex items-center">
            <div className="w-8 h-8 bg-[#35ae2a] rounded-full flex items-center justify-center mr-3">
              {info.icon}
            </div>
            <div>
              <p className="font-medium text-gray-800">{info.label}</p>
              <p className="text-gray-600 whitespace-pre-line">{info.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 