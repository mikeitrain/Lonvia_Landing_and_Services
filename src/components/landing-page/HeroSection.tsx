import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";

export const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const router = useRouter();

  const handleBookAppointment = () => {
    // Navigate to the case creation page with authentication flow
    router.push('/case/create');
  };

  return (
    <div className="w-full relative">
      <div className="relative overflow-hidden mt-4 md:rounded-5xl md:border md:border-border-primary md:max-w-[95%] md:mx-auto">
        <Image
          className="w-full h-[600px] object-cover"
          alt="Healthcare professionals"
          src="/test-5.jpg"
          width={1440}
          height={600}
          priority
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>

        {/* Hero Text Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white px-4 md:mr-48 w-full flex flex-col items-end">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight text-right max-w-sm">
              {t('landing.hero.title')}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-gray-100 text-right max-w-2xl">
              {t('landing.hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <button 
                onClick={handleBookAppointment}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold transition-all duration-300 hover:shadow-box"
              >
                {t('landing.hero.bookAppointment')}
              </button>
              <button className="bg-white bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 text-white border-2 border-white px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold transition-all duration-300">
                {t('landing.hero.learnMore')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 