import React from "react";
import { Card, CardContent } from "@/components/landing-page/card";
import { useLanguage } from "@/contexts/LanguageContext";

export const BenefitsSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="w-full py-16 bg-background-primary">
      <div className="max-w-6xl mx-auto px-8">
        <h3 className="text-3xl font-bold text-center mb-12 text-foreground-primary">{t('benefits.whyChoose')}</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: t('benefits.expertCare'),
              description: t('benefits.expertCareDesc'),
              icon: "👨‍⚕️"
            },
            {
              title: t('benefits.convenientScheduling'),
              description: t('benefits.convenientSchedulingDesc'),
              icon: "📅"
            },
            {
              title: t('benefits.comprehensiveServices'),
              description: t('benefits.comprehensiveServicesDesc'),
              icon: "🏥"
            }
          ].map((benefit, index) => (
            <Card key={index} className="text-center hover:shadow-box transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h4 className="text-xl font-semibold mb-3 text-foreground-primary">{benefit.title}</h4>
                <p className="text-foreground-secondary">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}; 