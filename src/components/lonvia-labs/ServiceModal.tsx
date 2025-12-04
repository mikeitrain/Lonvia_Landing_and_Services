import React from 'react';
import Modal from '@/components/common/Modal';
import { ServiceDetail } from '@/data/serviceDetails';
import { AnimatedButton } from '@/components/common/AnimatedButton';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceDetail | null;
  onStartAssessment: () => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({ 
  isOpen, 
  onClose, 
  service,
  onStartAssessment
}) => {
  if (!service) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <article className="p-8">
        {/* Main Headline */}
        <header className="mb-6">
          <h2 className="text-3xl font-bold text-[#10552E] mb-4">
            {service.headline}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {service.intro}
          </p>
        </header>

        {/* Typical Concerns Section */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-3 text-[#10552E]">📋</span>
            Typical Concerns & Symptoms
          </h3>
          <ul className="space-y-2">
            {service.typicalConcerns.map((concern, index) => (
              <li key={index} className="flex items-start text-gray-700">
                <CheckCircleIcon className="w-5 h-5 text-[#10552E] mr-3 mt-0.5 flex-shrink-0" />
                <span>{concern}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Diagnostic Approach Section */}
        <section className="mb-8 bg-green-50 rounded-lg p-6">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-3 text-[#10552E]">🔬</span>
            {service.diagnosticApproach.title}
          </h3>
          <ul className="space-y-3">
            {service.diagnosticApproach.items.map((item, index) => (
              <li key={index} className="flex items-start text-gray-700">
                <span className="inline-block w-2 h-2 bg-[#10552E] rounded-full mr-3 mt-2 flex-shrink-0"></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Lonvia Support Section */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-3 text-[#10552E]">💚</span>
            {service.lonviaSupport.title}
          </h3>
          <p className="text-gray-700 mb-4 leading-relaxed">
            {service.lonviaSupport.description}
          </p>
          <ol className="space-y-3">
            {service.lonviaSupport.steps.map((step, index) => (
              <li key={index} className="flex items-start text-gray-700">
                <span className="inline-flex items-center justify-center w-7 h-7 bg-[#10552E] text-white rounded-full mr-3 mt-0.5 flex-shrink-0 text-sm font-semibold">
                  {index + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* Safety Notes Section */}
        <section className="mb-8 bg-amber-50 border-l-4 border-amber-500 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
            <span className="mr-2 text-amber-600">⚠️</span>
            {service.safetyNotes.title}
          </h3>
          <ul className="space-y-2 mb-4">
            {service.safetyNotes.notes.map((note, index) => (
              <li key={index} className="flex items-start text-gray-700 text-sm">
                <span className="inline-block w-1.5 h-1.5 bg-amber-600 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-gray-600 italic border-t border-amber-200 pt-3">
            <strong>Disclaimer:</strong> {service.safetyNotes.disclaimer}
          </p>
        </section>

        {/* Call to Action */}
        <footer className="pt-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <AnimatedButton
              onClick={onStartAssessment}
              className="px-8 py-4 text-lg font-semibold"
            >
              {service.ctaLabel}
            </AnimatedButton>
            <button
              onClick={onClose}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Close
            </button>
          </div>
        </footer>
      </article>
    </Modal>
  );
};

