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
      {/* Hero Section with Color Block */}
      <section className="pt-12 pb-20 md:pt-16 md:pb-28">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left: Text Content */}
            <div>
              <span className="inline-block text-[11px] font-medium text-[#1E6B52] uppercase tracking-widest mb-4">
                Vertrauenswürdige Partner
              </span>
              
              <h1 className="text-4xl md:text-5xl font-bold text-[#2C2C2C] mb-6 leading-[1.15]">
                Unsere Partner
              </h1>
              
              <p className="text-[17px] text-[#5A5A5A] leading-[1.7] mb-8">
                Lonvia arbeitet mit führenden Experten und Unternehmen im Bereich Gesundheit, Diagnostik und Nahrungsergänzung zusammen – für Ihre optimale Versorgung.
              </p>

              <button 
                onClick={() => router.push('/contact')}
                className="bg-[#1E6B52] text-white text-[13px] font-medium px-8 py-4 rounded-lg uppercase tracking-wide hover:bg-[#165A45] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                Partner werden
              </button>
            </div>

            {/* Right: Color Block Feature */}
            <div className="bg-[#1E6B52] rounded-xl p-8 md:p-10 text-white">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-2xl font-bold mb-3">Exzellenz-Netzwerk</h3>
              <p className="text-white/80 leading-relaxed mb-6">
                Über 50 zertifizierte Partner in Deutschland, Österreich und der Schweiz.
              </p>
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/20">
                <div className="text-center">
                  <div className="text-3xl font-bold">50+</div>
                  <div className="text-xs uppercase tracking-wide text-white/60 mt-1">Partner</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">3</div>
                  <div className="text-xs uppercase tracking-wide text-white/60 mt-1">Länder</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">24/7</div>
                  <div className="text-xs uppercase tracking-wide text-white/60 mt-1">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Partners */}
      <section className="py-16 md:py-24 border-t border-[#D6D3CD]">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <span className="text-[11px] font-medium text-[#1E6B52] uppercase tracking-widest">01 — Klinisch</span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#2C2C2C] mt-2">
                Klinische Partner & Ärzte
              </h2>
            </div>
            <p className="text-[#777777] mt-3 md:mt-0 md:max-w-sm text-right leading-relaxed">
              Medizinische Expertise auf höchstem Niveau für Ihre Gesundheit
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {clinicalPartners.map((partner, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-8 border border-[#D6D3CD] hover:border-[#1E6B52] transition-all duration-300 group"
              >
                <span className="inline-block text-[10px] font-medium text-[#1E6B52] bg-[#1E6B52]/10 uppercase tracking-wide px-3 py-1.5 rounded-md">
                  {partner.type}
                </span>
                <h3 className="text-xl font-bold mt-5 text-[#2C2C2C] group-hover:text-[#1E6B52] transition-colors">{partner.name}</h3>
                <p className="text-[#666666] mt-3 leading-[1.7]">{partner.description}</p>
                <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-[#E8E6E1]">
                  {partner.features.map((feature, i) => (
                    <span key={i} className="text-[11px] text-[#888888] bg-[#F2F0EB] px-3 py-1 rounded-md">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supplement Partners - Featured Section with Color Block */}
      <section className="py-16 md:py-24 border-t border-[#D6D3CD]">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <span className="text-[11px] font-medium text-[#1E6B52] uppercase tracking-widest">02 — Supplements</span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#2C2C2C] mt-2">
                Supplement & Pharma Partner
              </h2>
            </div>
            <p className="text-[#777777] mt-3 md:mt-0 md:max-w-sm text-right leading-relaxed">
              Höchste Qualitätsstandards für Ihre Nahrungsergänzung und Medikamente
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {supplementPartners.map((partner, index) => (
              <div 
                key={index} 
                className={`rounded-xl p-8 transition-all duration-300 ${
                  partner.highlight 
                    ? 'bg-[#1E6B52] text-white' 
                    : 'bg-white border border-[#D6D3CD] hover:border-[#1E6B52] group'
                }`}
              >
                {partner.highlight && (
                  <span className="inline-block text-[10px] font-medium bg-white/20 text-white uppercase tracking-wide px-3 py-1.5 rounded-md mb-4">
                    ⭐ Empfohlen
                  </span>
                )}
                <span className={`inline-block text-[10px] font-medium uppercase tracking-wide px-3 py-1.5 rounded-md ${
                  partner.highlight 
                    ? 'bg-white/20 text-white' 
                    : 'text-[#1E6B52] bg-[#1E6B52]/10'
                }`}>
                  {partner.type}
                </span>
                <h3 className={`text-xl font-bold mt-5 ${partner.highlight ? 'text-white' : 'text-[#2C2C2C] group-hover:text-[#1E6B52]'} transition-colors`}>{partner.name}</h3>
                <p className={`mt-3 leading-[1.7] ${partner.highlight ? 'text-white/80' : 'text-[#666666]'}`}>{partner.description}</p>
                <div className={`flex flex-wrap gap-2 mt-6 pt-5 border-t ${partner.highlight ? 'border-white/20' : 'border-[#E8E6E1]'}`}>
                  {partner.features.map((feature, i) => (
                    <span key={i} className={`text-[11px] px-3 py-1 rounded-md ${
                      partner.highlight ? 'text-white/70 bg-white/10' : 'text-[#888888] bg-[#F2F0EB]'
                    }`}>
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lab Partners */}
      <section className="py-16 md:py-24 border-t border-[#D6D3CD]">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <span className="text-[11px] font-medium text-[#1E6B52] uppercase tracking-widest">03 — Diagnostik</span>
              <h2 className="text-2xl md:text-3xl font-bold text-[#2C2C2C] mt-2">
                Labor & Diagnostik Partner
              </h2>
            </div>
            <p className="text-[#777777] mt-3 md:mt-0 md:max-w-sm text-right leading-relaxed">
              Präzise Diagnostik als Grundlage für Ihre personalisierte Gesundheitsoptimierung
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {labPartners.map((partner, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-8 border border-[#D6D3CD] hover:border-[#1E6B52] transition-all duration-300 group"
              >
                <span className="inline-block text-[10px] font-medium text-[#1E6B52] bg-[#1E6B52]/10 uppercase tracking-wide px-3 py-1.5 rounded-md">
                  {partner.type}
                </span>
                <h3 className="text-xl font-bold mt-5 text-[#2C2C2C] group-hover:text-[#1E6B52] transition-colors">{partner.name}</h3>
                <p className="text-[#666666] mt-3 leading-[1.7]">{partner.description}</p>
                <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-[#E8E6E1]">
                  {partner.features.map((feature, i) => (
                    <span key={i} className="text-[11px] text-[#888888] bg-[#F2F0EB] px-3 py-1 rounded-md">
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
      <section className="py-16 md:py-24 border-t border-[#D6D3CD]">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <span className="text-[11px] font-medium text-[#1E6B52] uppercase tracking-widest">04 — Vertrauen</span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2C2C2C] mt-2">
              Qualität & Vertrauen
            </h2>
            <p className="text-[#777777] mt-3 max-w-xl mx-auto leading-relaxed">
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
              <div 
                key={i} 
                className="bg-white rounded-xl p-6 text-center border border-[#D6D3CD] hover:border-[#1E6B52] hover:shadow-md transition-all duration-300"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-[#2C2C2C] text-sm">{item.title}</h3>
                <p className="text-[12px] text-[#888888] mt-2 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="bg-[#1E6B52] rounded-2xl p-10 md:p-16">
            <div className="max-w-2xl mx-auto text-center">
              <span className="inline-block text-[11px] font-medium text-white/60 uppercase tracking-widest mb-4">
                Partnerschaft
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                Werden Sie Partner
              </h2>
              <p className="text-lg text-white/80 mb-10 leading-relaxed">
                Sie sind Arzt, Klinik oder Unternehmen im Gesundheitsbereich? 
                Kontaktieren Sie uns für Partnerschaftsmöglichkeiten.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => router.push('/contact')} 
                  className="bg-white text-[#1E6B52] text-[13px] font-semibold px-8 py-4 rounded-lg uppercase tracking-wide hover:bg-[#F2F0EB] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                >
                  Kontakt aufnehmen
                </button>
                <button 
                  onClick={() => router.push('/lonvia-labs')}
                  className="border-2 border-white/40 text-white text-[13px] font-semibold px-8 py-4 rounded-lg uppercase tracking-wide hover:bg-white/10 hover:border-white transition-all duration-200"
                >
                  Zu Lonvia Labs
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

