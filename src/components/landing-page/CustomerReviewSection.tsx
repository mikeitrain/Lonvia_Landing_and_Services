import React from "react";
import { Card, CardContent } from "@/components/landing-page/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/landing-page/avatar";
import { useLanguage } from "@/contexts/LanguageContext";
import { StarIcon } from '@heroicons/react/24/solid';

export const CustomerReviewSection: React.FC = () => {
  const { t } = useLanguage();

  // Review data for mapping
  const reviews = [
    {
      title: t('reviews.exceptional.title'),
      body: t('reviews.exceptional.body'),
      reviewer: "Sarah Johnson",
      date: "March 2024",
      stars: 5,
    },
    {
      title: t('reviews.recommended.title'),
      body: t('reviews.recommended.body'),
      reviewer: "Michael Chen",
      date: "February 2024",
      stars: 5,
    },
    {
      title: t('reviews.outstanding.title'),
      body: t('reviews.outstanding.body'),
      reviewer: "Emily Rodriguez",
      date: "March 2024",
      stars: 5,
    },
  ];

  return (
    <section className="w-full py-20 bg-background-primary">
      <div className="max-w-6xl mx-auto px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground-primary mb-4">
            {t('landing.reviews.title')}
          </h2>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
            {t('landing.reviews.subtitle')}
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <Card
              key={`review-${index}`}
              className="border border-border-primary hover:shadow-box transition-shadow duration-300 bg-background-primary"
            >
              <CardContent className="p-8">
                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(review.stars)].map((_, i) => (
                    <StarIcon
                      key={`star-${i}`}
                      className="w-5 h-5 text-warning-400"
                    />
                  ))}
                </div>

                {/* Review Content */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-foreground-primary mb-3">
                    {review.title}
                  </h3>
                  <p className="text-foreground-secondary leading-relaxed">
                    &ldquo;{review.body}&rdquo;
                  </p>
                </div>

                {/* Reviewer Info */}
                <div className="flex items-center">
                  <Avatar className="w-12 h-12 mr-4">
                    <AvatarImage src="/shape-2.png" alt="Reviewer avatar" />
                    <AvatarFallback className="bg-primary-600 text-white font-semibold">
                      {review.reviewer.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-foreground-primary">
                      {review.reviewer}
                    </div>
                    <div className="text-sm text-foreground-tertiary">
                      {review.date}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">500+</div>
              <div className="text-foreground-secondary">{t('stats.happyPatients')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">50+</div>
              <div className="text-foreground-secondary">{t('stats.medicalSpecialists')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">10+</div>
              <div className="text-foreground-secondary">{t('stats.yearsExcellence')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-2">24/7</div>
              <div className="text-foreground-secondary">{t('stats.emergencyCare')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 