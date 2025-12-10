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
      <section className="pt-16 pb-24 md:pt-20 md:pb-32">
        <div className="max-w-5xl mx-auto px-8">
          <div className="text-center">
            <span className="inline-block text-[11px] font-medium text-[#1E6B52] uppercase tracking-[0.2em] mb-6 pb-4 border-b border-[#1E6B52]">
              Vertrauenswürdige Partner
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#2C2C2C] mb-8 tracking-tight leading-[1.1]">
              Unsere Partner
            </h1>
            
            <p className="text-lg md:text-xl text-[#555555] max-w-2xl mx-auto leading-[1.8]">
              Lonvia arbeitet mit führenden Experten und Unternehmen im Bereich Gesundheit, Diagnostik und Nahrungsergänzung zusammen – für Ihre optimale Versorgung.
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-8">
        <div className="border-t border-[#D1D5DB]" />
      </div>

      {/* Clinical Partners */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-8">
          <div className="mb-16">
            <span className="text-[11px] font-medium text-[#1E6B52] uppercase tracking-[0.2em]">01</span>
            <h2 className="text-2xl md:text-3xl font-light text-[#2C2C2C] mt-3 tracking-tight">
              Klinische Partner & Ärzte
            </h2>
            <p className="text-[#777777] mt-4 max-w-xl leading-[1.7]">
              Medizinische Expertise auf höchstem Niveau für Ihre Gesundheit
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-px bg-[#D1D5DB]">
            {clinicalPartners.map((partner, index) => (
              <div key={index} className="bg-white p-10 md:p-12">
                <span className="text-[10px] font-medium text-[#1E6B52] uppercase tracking-[0.15em] border border-[#1E6B52] px-3 py-1.5">
                  {partner.type}
                </span>
                <h3 className="text-xl font-medium mt-6 text-[#2C2C2C] tracking-tight">{partner.name}</h3>
                <p className="text-[#666666] mt-4 leading-[1.7] text-[15px]">{partner.description}</p>
                <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-[#E5E5E5]">
                  {partner.features.map((feature, i) => (
                    <span key={i} className="text-[11px] text-[#777777] tracking-wide">
                      {feature}{i < partner.features.length - 1 && <span className="ml-3 text-[#D1D5DB]">·</span>}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-8">
        <div className="border-t border-[#D1D5DB]" />
      </div>

      {/* Supplement Partners */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-8">
          <div className="mb-16">
            <span className="text-[11px] font-medium text-[#1E6B52] uppercase tracking-[0.2em]">02</span>
            <h2 className="text-2xl md:text-3xl font-light text-[#2C2C2C] mt-3 tracking-tight">
              Supplement & Pharma Partner
            </h2>
            <p className="text-[#777777] mt-4 max-w-xl leading-[1.7]">
              Höchste Qualitätsstandards für Ihre Nahrungsergänzung und Medikamente
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-px bg-[#D1D5DB]">
            {supplementPartners.map((partner, index) => (
              <div 
                key={index} 
                className={`bg-white p-10 md:p-12 relative ${partner.highlight ? 'ring-1 ring-[#1E6B52]' : ''}`}
              >
                {partner.highlight && (
                  <div className="absolute top-0 left-10 -translate-y-1/2">
                    <span className="bg-[#1E6B52] text-white text-[10px] font-medium px-4 py-2 uppercase tracking-[0.15em]">
                      Empfohlen
                    </span>
                  </div>
                )}
                <span className="text-[10px] font-medium text-[#1E6B52] uppercase tracking-[0.15em] border border-[#1E6B52] px-3 py-1.5">
                  {partner.type}
                </span>
                <h3 className="text-xl font-medium mt-6 text-[#2C2C2C] tracking-tight">{partner.name}</h3>
                <p className="text-[#666666] mt-4 leading-[1.7] text-[15px]">{partner.description}</p>
                <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-[#E5E5E5]">
                  {partner.features.map((feature, i) => (
                    <span key={i} className="text-[11px] text-[#777777] tracking-wide">
                      {feature}{i < partner.features.length - 1 && <span className="ml-3 text-[#D1D5DB]">·</span>}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-8">
        <div className="border-t border-[#D1D5DB]" />
      </div>

      {/* Lab Partners */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-8">
          <div className="mb-16">
            <span className="text-[11px] font-medium text-[#1E6B52] uppercase tracking-[0.2em]">03</span>
            <h2 className="text-2xl md:text-3xl font-light text-[#2C2C2C] mt-3 tracking-tight">
              Labor & Diagnostik Partner
            </h2>
            <p className="text-[#777777] mt-4 max-w-xl leading-[1.7]">
              Präzise Diagnostik als Grundlage für Ihre personalisierte Gesundheitsoptimierung
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-px bg-[#D1D5DB]">
            {labPartners.map((partner, index) => (
              <div key={index} className="bg-white p-10 md:p-12">
                <span className="text-[10px] font-medium text-[#1E6B52] uppercase tracking-[0.15em] border border-[#1E6B52] px-3 py-1.5">
                  {partner.type}
                </span>
                <h3 className="text-xl font-medium mt-6 text-[#2C2C2C] tracking-tight">{partner.name}</h3>
                <p className="text-[#666666] mt-4 leading-[1.7] text-[15px]">{partner.description}</p>
                <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-[#E5E5E5]">
                  {partner.features.map((feature, i) => (
                    <span key={i} className="text-[11px] text-[#777777] tracking-wide">
                      {feature}{i < partner.features.length - 1 && <span className="ml-3 text-[#D1D5DB]">·</span>}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-8">
        <div className="border-t border-[#D1D5DB]" />
      </div>

      {/* Trust Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-8">
          <div className="text-center mb-16">
            <span className="text-[11px] font-medium text-[#1E6B52] uppercase tracking-[0.2em]">04</span>
            <h2 className="text-2xl md:text-3xl font-light text-[#2C2C2C] mt-3 tracking-tight">
              Qualität & Vertrauen
            </h2>
            <p className="text-[#777777] mt-4 max-w-xl mx-auto leading-[1.7]">
              Alle unsere Partner erfüllen strenge Qualitätskriterien und sind für den europäischen Markt zugelassen.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 border border-[#D1D5DB]">
            {[
              { icon: "🏥", title: "Medizinisch geprüft", desc: "Alle Angebote von Ärzten validiert" },
              { icon: "🇪🇺", title: "EU-konform", desc: "DSGVO & EU-Regulierungen" },
              { icon: "🔬", title: "Wissenschaftlich", desc: "Evidenzbasierte Empfehlungen" },
              { icon: "✅", title: "Zertifiziert", desc: "ISO & GMP Standards" },
            ].map((item, i) => (
              <div key={i} className={`bg-white p-8 text-center ${i !== 3 ? 'border-r border-[#D1D5DB]' : ''} ${i < 2 ? 'border-b md:border-b-0' : ''}`}>
                <div className="text-3xl mb-5">{item.icon}</div>
                <h3 className="font-medium text-[#2C2C2C] text-sm tracking-tight">{item.title}</h3>
                <p className="text-[12px] text-[#888888] mt-2 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-[#1E6B52]">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <span className="inline-block text-[11px] font-medium text-white/60 uppercase tracking-[0.2em] mb-6">
            Partnerschaft
          </span>
          <h2 className="text-3xl md:text-4xl font-light text-white mb-6 tracking-tight leading-[1.2]">
            Werden Sie Partner
          </h2>
          <p className="text-lg text-white/80 mb-12 leading-[1.8] max-w-xl mx-auto">
            Sie sind Arzt, Klinik oder Unternehmen im Gesundheitsbereich? 
            Kontaktieren Sie uns für Partnerschaftsmöglichkeiten.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => router.push('/contact')} 
              className="bg-white text-[#1E6B52] text-[13px] font-medium px-10 py-4 uppercase tracking-[0.15em] hover:bg-[#F2F0EB] transition-colors duration-200"
            >
              Kontakt aufnehmen
            </button>
            <button 
              onClick={() => router.push('/lonvia-labs')}
              className="border border-white/40 text-white text-[13px] font-medium px-10 py-4 uppercase tracking-[0.15em] hover:bg-white/10 transition-colors duration-200"
            >
              Zu Lonvia Labs
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

