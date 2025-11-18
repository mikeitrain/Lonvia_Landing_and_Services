import React from "react";
import { useRouter } from "next/router";
import { useLanguage } from "@/contexts/LanguageContext";

export const CallToActionSection: React.FC = () => {
  const { t } = useLanguage();
  const router = useRouter();

  const handleContactClick = () => {
    router.push("/about/contact");
  };

  return (
    <section className="w-full py-16 bg-primary-600">
      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">
          {t('landing.cta.title')}
        </h2>
        <p className="text-lg md:text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
          {t('landing.cta.subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleContactClick}
            className="bg-white text-primary-600 hover:bg-neutral-100 px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold transition-all duration-300 hover:shadow-box"
          >
            {t('landing.cta.getStarted')}
          </button>
          <button
            onClick={handleContactClick}
            className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold transition-all duration-300"
          >
            {t('landing.cta.contactUs')}
          </button>
        </div>
      </div>
    </section>
  );
}; 