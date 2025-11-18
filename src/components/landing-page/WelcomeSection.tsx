import React from "react";
import { Card, CardContent } from "./card";
import { useLanguage } from "@/contexts/LanguageContext";

export const WelcomeSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="w-full py-20 bg-background-primary">
      <div className="max-w-6xl mx-auto px-8">
        <Card className="border-none shadow-box bg-background-primary">
          <CardContent className="p-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground-primary">
              <span className="text-primary-600">{t('landing.welcome.title').split(' ')[0]}</span>
              <span className="text-foreground-primary"> {t('landing.welcome.title').split(' ').slice(1).join(' ')}</span>
            </h2>

            <p className="text-lg md:text-xl text-foreground-secondary max-w-4xl mx-auto leading-relaxed">
              {t('landing.welcome.description')}
            </p>

            {/* Key Features */}
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-200 bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏥</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground-primary mb-2">{t('landing.welcome.expertCare')}</h3>
                <p className="text-foreground-secondary">{t('landing.welcome.expertCareDesc')}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-200 bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground-primary mb-2">{t('landing.welcome.easyAccess')}</h3>
                <p className="text-foreground-secondary">{t('landing.welcome.easyAccessDesc')}</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-200 bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground-primary mb-2">{t('landing.welcome.securePlatform')}</h3>
                <p className="text-foreground-secondary">{t('landing.welcome.securePlatformDesc')}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}; 