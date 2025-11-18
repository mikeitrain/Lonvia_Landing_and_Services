import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ContactInfoSection } from "@/components/contact/ContactInfoSection";
import { ContactFormSection } from "@/components/contact/ContactFormSection";

export default function ContactPage() {
    const { t } = useLanguage();

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        {t('contact.title')}
                    </h1>
                    <p className="text-xl text-gray-600">
                        {t('contact.subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ContactInfoSection />
                    <ContactFormSection />
                </div>
            </div>
        </div>
    );
} 