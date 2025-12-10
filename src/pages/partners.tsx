import React from "react";
import { useRouter } from "next/router";

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
    <div className="bg-[#F2F0EB] min-h-screen">
      {/* Hero Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-8">
          <div className="bg-gradient-to-br from-[#1E6B52] to-[#165A45] text-white py-16 md:py-24 px-8 md:px-16 rounded-3xl">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full mb-8">
                <span className="text-xl">🤝</span>
                <span className="text-sm font-semibold uppercase tracking-wide">Vertrauenswürdige Partner</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                Unsere Partner
              </h1>
              
              <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-white/90 leading-relaxed">
                Lonvia arbeitet mit führenden Experten und Unternehmen im Bereich Gesundheit, Diagnostik und Nahrungsergänzung zusammen – für Ihre optimale Versorgung.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Partners */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#333333] tracking-tight">
            Klinische Partner & Ärzte
          </h2>
          <p className="text-center text-[#666666] mb-12 max-w-2xl mx-auto leading-relaxed">
            Medizinische Expertise auf höchstem Niveau für Ihre Gesundheit
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {clinicalPartners.map((partner, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 transition-all duration-300 hover:translate-y-[-4px]">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs font-semibold text-[#1E6B52] bg-[#1E6B52]/10 px-4 py-1.5 rounded-full uppercase tracking-wide">
                      {partner.type}
                    </span>
                    <h3 className="text-2xl font-bold mt-4 text-[#333333]">{partner.name}</h3>
                  </div>
                </div>
                <p className="text-[#555555] mb-6 leading-relaxed">{partner.description}</p>
                <div className="flex flex-wrap gap-2">
                  {partner.features.map((feature, i) => (
                    <span key={i} className="text-xs font-medium bg-[#F2F0EB] text-[#555555] px-4 py-1.5 rounded-full">
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
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#333333] tracking-tight">
            Supplement & Pharma Partner
          </h2>
          <p className="text-center text-[#666666] mb-12 max-w-2xl mx-auto leading-relaxed">
            Höchste Qualitätsstandards für Ihre Nahrungsergänzung und Medikamente
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {supplementPartners.map((partner, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-2xl p-8 transition-all duration-300 hover:translate-y-[-4px] ${
                  partner.highlight ? 'ring-2 ring-[#1E6B52] relative' : ''
                }`}
              >
                {partner.highlight && (
                  <div className="absolute -top-3 left-6">
                    <span className="bg-[#1E6B52] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide">
                      ⭐ Empfohlener Partner
                    </span>
                  </div>
                )}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs font-semibold text-[#1E6B52] bg-[#1E6B52]/10 px-4 py-1.5 rounded-full uppercase tracking-wide">
                      {partner.type}
                    </span>
                    <h3 className="text-2xl font-bold mt-4 text-[#333333]">{partner.name}</h3>
                  </div>
                </div>
                <p className="text-[#555555] mb-6 leading-relaxed">{partner.description}</p>
                <div className="flex flex-wrap gap-2">
                  {partner.features.map((feature, i) => (
                    <span key={i} className="text-xs font-medium bg-[#F2F0EB] text-[#555555] px-4 py-1.5 rounded-full">
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
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#333333] tracking-tight">
            Labor & Diagnostik Partner
          </h2>
          <p className="text-center text-[#666666] mb-12 max-w-2xl mx-auto leading-relaxed">
            Präzise Diagnostik als Grundlage für Ihre personalisierte Gesundheitsoptimierung
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {labPartners.map((partner, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 transition-all duration-300 hover:translate-y-[-4px]">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs font-semibold text-[#1E6B52] bg-[#1E6B52]/10 px-4 py-1.5 rounded-full uppercase tracking-wide">
                      {partner.type}
                    </span>
                    <h3 className="text-2xl font-bold mt-4 text-[#333333]">{partner.name}</h3>
                  </div>
                </div>
                <p className="text-[#555555] mb-6 leading-relaxed">{partner.description}</p>
                <div className="flex flex-wrap gap-2">
                  {partner.features.map((feature, i) => (
                    <span key={i} className="text-xs font-medium bg-[#F2F0EB] text-[#555555] px-4 py-1.5 rounded-full">
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
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#333333] tracking-tight">
              Qualität & Vertrauen
            </h2>
            <p className="text-[#666666] max-w-2xl mx-auto leading-relaxed">
              Alle unsere Partner erfüllen strenge Qualitätskriterien und sind für den europäischen Markt zugelassen.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: "🏥", title: "Medizinisch geprüft", desc: "Alle Angebote von Ärzten validiert" },
              { icon: "🇪🇺", title: "EU-konform", desc: "DSGVO & EU-Regulierungen" },
              { icon: "🔬", title: "Wissenschaftlich", desc: "Evidenzbasierte Empfehlungen" },
              { icon: "✅", title: "Zertifiziert", desc: "ISO & GMP Standards" },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-[#333333] mb-2">{item.title}</h3>
                <p className="text-sm text-[#666666] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-8">
          <div className="bg-gradient-to-br from-[#1E6B52] to-[#165A45] text-white py-16 md:py-20 px-8 md:px-16 rounded-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
              Werden Sie Partner
            </h2>
            <p className="text-lg md:text-xl mb-10 text-white/90 max-w-2xl mx-auto leading-relaxed">
              Sie sind Arzt, Klinik oder Unternehmen im Gesundheitsbereich? 
              Kontaktieren Sie uns für Partnerschaftsmöglichkeiten.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => router.push('/contact')} 
                className="bg-white text-[#1E6B52] font-semibold px-8 py-4 rounded-full uppercase tracking-wide hover:bg-white/90 transition-colors duration-200"
              >
                Kontakt aufnehmen
              </button>
              <button 
                onClick={() => router.push('/lonvia-labs')}
                className="border-2 border-white text-white font-semibold px-8 py-4 rounded-full uppercase tracking-wide hover:bg-white hover:text-[#1E6B52] transition-colors duration-200"
              >
                Zu Lonvia Labs
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

