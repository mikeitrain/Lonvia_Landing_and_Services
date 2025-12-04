import React from "react";
import { useRouter } from "next/router";
import { AnimatedButton } from "@/components/common/AnimatedButton";
import { Button } from "@/components/common/Button";

export default function PartnersPage() {
  const router = useRouter();

  const clinicalPartners = [
    {
      name: "Partnerkliniken EU",
      type: "Klinisches Netzwerk",
      description: "Über 50 zertifizierte Partnerkliniken in Deutschland, Österreich und der Schweiz für persönliche Konsultationen und Behandlungen.",
      features: ["ISO-zertifiziert", "Deutschsprachig", "Persönliche Betreuung"]
    },
    {
      name: "Telemedizin-Ärzte",
      type: "Digitale Gesundheit",
      description: "Approbierte Ärzte mit Spezialisierung auf Hormontherapie, Longevity-Medizin und präventive Gesundheitsversorgung.",
      features: ["24/7 Verfügbarkeit", "Videokonsultation", "E-Rezept"]
    },
  ];

  const supplementPartners = [
    {
      name: "Moleqlar",
      type: "Premium Nahrungsergänzung",
      description: "Wissenschaftlich fundierte Longevity-Supplements mit höchsten Qualitätsstandards. NAD+ Booster, Spermidine und weitere innovative Formulierungen.",
      features: ["Laborgeprüft", "Made in EU", "Wissenschaftlich validiert"],
      highlight: true
    },
    {
      name: "Pharmazeutische Partner",
      type: "Medikamentenversorgung",
      description: "Zugelassene Apotheken für die sichere Bereitstellung von verschreibungspflichtigen Medikamenten mit diskretem Versand.",
      features: ["Lizenziert", "Diskret", "Express-Lieferung"]
    },
  ];

  const labPartners = [
    {
      name: "Diagnostik-Labore",
      type: "Labordiagnostik",
      description: "Akkreditierte Labore für umfassende Blutanalysen, Hormontests und Biomarker-Untersuchungen.",
      features: ["Schnelle Ergebnisse", "Heimtests verfügbar", "Digitale Befunde"]
    },
    {
      name: "Genetik-Partner",
      type: "Genetische Analysen",
      description: "Modernste genetische Testung für personalisierte Gesundheitsempfehlungen und Longevity-Optimierung.",
      features: ["DSGVO-konform", "Wissenschaftlich", "Personalisiert"]
    },
  ];

  return (
    <div className="bg-background-primary min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0E5A46] to-[#10552E] text-white py-24">
        <div className="max-w-6xl mx-auto px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <span className="text-xl">🤝</span>
            <span className="text-sm font-semibold">Vertrauenswürdige Partner</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Unsere Partner
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-100 leading-relaxed">
            Lonvia arbeitet mit führenden Experten und Unternehmen im Bereich Gesundheit, Diagnostik und Nahrungsergänzung zusammen – für Ihre optimale Versorgung.
          </p>
        </div>
      </section>

      {/* Clinical Partners */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-center mb-4 text-foreground-primary">
            Klinische Partner & Ärzte
          </h2>
          <p className="text-center text-foreground-secondary mb-12 max-w-2xl mx-auto">
            Medizinische Expertise auf höchstem Niveau für Ihre Gesundheit
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {clinicalPartners.map((partner, index) => (
              <div key={index} className="bg-white border border-border-primary rounded-xl p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-sm font-medium text-[#10552E] bg-[#10552E]/10 px-3 py-1 rounded-full">
                      {partner.type}
                    </span>
                    <h3 className="text-2xl font-bold mt-3 text-foreground-primary">{partner.name}</h3>
                  </div>
                </div>
                <p className="text-foreground-secondary mb-6 leading-relaxed">{partner.description}</p>
                <div className="flex flex-wrap gap-2">
                  {partner.features.map((feature, i) => (
                    <span key={i} className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supplement Partners - Featured Moleqlar */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-center mb-4 text-foreground-primary">
            Supplement & Pharma Partner
          </h2>
          <p className="text-center text-foreground-secondary mb-12 max-w-2xl mx-auto">
            Höchste Qualitätsstandards für Ihre Nahrungsergänzung und Medikamente
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {supplementPartners.map((partner, index) => (
              <div 
                key={index} 
                className={`bg-white border rounded-xl p-8 hover:shadow-xl transition-shadow duration-300 ${
                  partner.highlight ? 'border-[#10552E] border-2 relative' : 'border-border-primary'
                }`}
              >
                {partner.highlight && (
                  <div className="absolute -top-3 left-6">
                    <span className="bg-[#10552E] text-white text-xs font-bold px-3 py-1 rounded-full">
                      ⭐ Empfohlener Partner
                    </span>
                  </div>
                )}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-sm font-medium text-[#10552E] bg-[#10552E]/10 px-3 py-1 rounded-full">
                      {partner.type}
                    </span>
                    <h3 className="text-2xl font-bold mt-3 text-foreground-primary">{partner.name}</h3>
                  </div>
                </div>
                <p className="text-foreground-secondary mb-6 leading-relaxed">{partner.description}</p>
                <div className="flex flex-wrap gap-2">
                  {partner.features.map((feature, i) => (
                    <span key={i} className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lab & Diagnostic Partners */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-center mb-4 text-foreground-primary">
            Labor & Diagnostik Partner
          </h2>
          <p className="text-center text-foreground-secondary mb-12 max-w-2xl mx-auto">
            Präzise Diagnostik als Grundlage für Ihre personalisierte Gesundheitsoptimierung
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {labPartners.map((partner, index) => (
              <div key={index} className="bg-white border border-border-primary rounded-xl p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-sm font-medium text-[#10552E] bg-[#10552E]/10 px-3 py-1 rounded-full">
                      {partner.type}
                    </span>
                    <h3 className="text-2xl font-bold mt-3 text-foreground-primary">{partner.name}</h3>
                  </div>
                </div>
                <p className="text-foreground-secondary mb-6 leading-relaxed">{partner.description}</p>
                <div className="flex flex-wrap gap-2">
                  {partner.features.map((feature, i) => (
                    <span key={i} className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground-primary">
              Qualität & Vertrauen
            </h2>
            <p className="text-foreground-secondary max-w-2xl mx-auto">
              Alle unsere Partner erfüllen strenge Qualitätskriterien und sind für den europäischen Markt zugelassen.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: "🏥", title: "Medizinisch geprüft", desc: "Alle Angebote von Ärzten validiert" },
              { icon: "🇪🇺", title: "EU-konform", desc: "DSGVO & EU-Regulierungen" },
              { icon: "🔬", title: "Wissenschaftlich", desc: "Evidenzbasierte Empfehlungen" },
              { icon: "✅", title: "Zertifiziert", desc: "ISO & GMP Standards" },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl text-center border border-border-primary">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-foreground-primary mb-2">{item.title}</h3>
                <p className="text-sm text-foreground-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#10552E] text-white">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Werden Sie Partner
          </h2>
          <p className="text-xl mb-8 text-gray-100">
            Sie sind Arzt, Klinik oder Unternehmen im Gesundheitsbereich? 
            Kontaktieren Sie uns für Partnerschaftsmöglichkeiten.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AnimatedButton onClick={() => router.push('/contact')} className="px-8 py-4">
              Kontakt aufnehmen
            </AnimatedButton>
            <Button 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-[#10552E] px-8 py-4"
              onClick={() => router.push('/lonvia-labs')}
            >
              Zu Lonvia Labs
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

