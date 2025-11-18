import React from "react";
import { HeroSection } from "@/components/landing-page/HeroSection";
import { WelcomeSection } from "@/components/landing-page/WelcomeSection";
import { DoctorsSection } from "@/components/landing-page/DoctorsSection";
import { ServicesSection } from "@/components/landing-page/ServicesSection";
import { BenefitsSection } from "@/components/landing-page/BenefitsSection";
import { CustomerReviewSection } from "@/components/landing-page/CustomerReviewSection";
import { CallToActionSection } from "@/components/landing-page/CallToActionSection";

export default function LandingPage() {
  return (
    <div className="bg-background-primary flex flex-row justify-center w-full min-h-screen">
      <div className="bg-background-primary w-full relative">
        <HeroSection />
        <WelcomeSection />
        <DoctorsSection />
        <ServicesSection />
        <BenefitsSection />
        <CustomerReviewSection />
        <CallToActionSection />
      </div>
    </div>
  );
} 