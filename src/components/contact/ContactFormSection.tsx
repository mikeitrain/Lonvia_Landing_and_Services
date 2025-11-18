import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export const ContactFormSection: React.FC = () => {
  const { t } = useLanguage();

  const formFields = [
    {
      name: "name",
      type: "text",
      label: t('contact.form.name'),
      placeholder: t('contact.form.namePlaceholder')
    },
    {
      name: "email",
      type: "email",
      label: t('contact.form.email'),
      placeholder: t('contact.form.emailPlaceholder')
    },
    {
      name: "subject",
      type: "text",
      label: t('contact.form.subject'),
      placeholder: t('contact.form.subjectPlaceholder')
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">{t('contact.form.title')}</h2>

      <form className="space-y-4">
        {formFields.map((field, index) => (
          <div key={index}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
            </label>
            <input
              type={field.type}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#35ae2a]"
              placeholder={field.placeholder}
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('contact.form.message')}
          </label>
          <textarea
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#35ae2a]"
            placeholder={t('contact.form.messagePlaceholder')}
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-[#35ae2a] hover:bg-[#2d9624] text-white py-2 px-4 rounded-md font-semibold transition-colors"
        >
          {t('contact.form.send')}
        </button>
      </form>
    </div>
  );
}; 