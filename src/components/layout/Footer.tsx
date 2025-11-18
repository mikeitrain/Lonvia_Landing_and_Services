import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export const Footer: React.FC = () => {
    const { t } = useLanguage();

    return (
        <footer className="w-full py-12 bg-neutral-800 text-white">
            <div className="max-w-6xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    <div>
                        <h3 className="text-xl md:text-2xl font-bold mb-4">
                            <span className="text-primary-600">L</span>onvia
                        </h3>
                        <p className="text-sm md:text-base text-neutral-300">
                            {t('footer.description')}
                        </p>
                    </div>
                    <div>
                        <h4 className="text-base md:text-lg font-semibold mb-4">{t('footer.services')}</h4>
                        <ul className="space-y-2 text-sm md:text-base text-neutral-300">
                            <li><a href="/urology" className="hover:text-primary-600 transition-colors">{t('services.urology')}</a></li>
                            <li><a href="/orthopedics" className="hover:text-primary-600 transition-colors">{t('services.orthopedics')}</a></li>
                            <li><a href="/oncology" className="hover:text-primary-600 transition-colors">{t('services.oncology')}</a></li>
                            <li><a href="/surgery" className="hover:text-primary-600 transition-colors">{t('services.surgery')}</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-base md:text-lg font-semibold mb-4">{t('footer.contact')}</h4>
                        <ul className="space-y-2 text-sm md:text-base text-neutral-300">
                            <li>📞 (555) 123-4567</li>
                            <li>✉️ info@lonvia.com</li>
                            <li>📍 123 Healthcare Ave</li>
                            <li>City, State 12345</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-base md:text-lg font-semibold mb-4">{t('footer.hours')}</h4>
                        <ul className="space-y-2 text-sm md:text-base text-neutral-300">
                            <li>{t('footer.monFri')}</li>
                            <li>{t('footer.saturday')}</li>
                            <li>{t('footer.sunday')}</li>
                            <li>{t('footer.emergency')}</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-neutral-700 mt-8 pt-8 text-center text-neutral-400">
                    <p className="text-sm md:text-base">{t('footer.copyright')}</p>
                </div>
            </div>
        </footer>
    );
}; 