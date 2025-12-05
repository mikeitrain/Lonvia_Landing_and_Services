import React from "react";
import { useRouter } from "next/router";
import { AnimatedButton } from "@/components/common/AnimatedButton";
import { Button } from "@/components/common/Button";

export default function AboutPage() {
  const router = useRouter();

  const values = [
    {
      icon: "🔬",
      title: "Wissenschaftlich fundiert",
      description: "Alle unsere Protokolle basieren auf aktueller medizinischer Forschung und klinischer Evidenz."
    },
    {
      icon: "🤝",
      title: "Patientenzentriert",
      description: "Ihr Wohlbefinden steht im Mittelpunkt. Wir entwickeln individuelle Lösungen für Ihre Gesundheitsziele."
    },
    {
      icon: "🔒",
      title: "Datenschutz & Sicherheit",
      description: "Ihre Gesundheitsdaten werden nach höchsten DSGVO-Standards geschützt und vertraulich behandelt."
    },
    {
      icon: "💡",
      title: "Innovation",
      description: "Wir integrieren neueste Erkenntnisse aus Longevity-Forschung und präventiver Medizin."
    },
    {
      icon: "🌍",
      title: "Europäische Qualität",
      description: "Alle Partner und Produkte erfüllen strenge EU-Regulierungen und Qualitätsstandards."
    },
    {
      icon: "📞",
      title: "Erreichbarkeit",
      description: "Unser Team steht Ihnen für Fragen und Unterstützung zur Verfügung – digital und persönlich."
    }
  ];

  const processSteps = [
    {
      number: "01",
      title: "Erstberatung",
      description: "Kostenlose Erstberatung zur Klärung Ihrer Gesundheitsziele und Bedürfnisse."
    },
    {
      number: "02",
      title: "Umfassende Diagnostik",
      description: "Detaillierte Blutanalysen und Gesundheitsassessment für ein vollständiges Bild."
    },
    {
      number: "03",
      title: "Ärztliche Konsultation",
      description: "Persönliches Gespräch mit spezialisierten Ärzten zur Besprechung der Ergebnisse."
    },
    {
      number: "04",
      title: "Individuelles Protokoll",
      description: "Maßgeschneiderter Behandlungsplan basierend auf Ihren Werten und Zielen."
    },
    {
      number: "05",
      title: "Kontinuierliche Betreuung",
      description: "Regelmäßige Kontrollen und Anpassungen für optimale Ergebnisse."
    }
  ];

  return (
    <div className="bg-background-primary min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0E5A46] to-[#10552E] text-white py-24">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <span className="text-xl">🏥</span>
                <span className="text-sm font-semibold">Über Lonvia</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Über uns
              </h1>
              
              <p className="text-xl text-gray-100 leading-relaxed mb-8">
                Lonvia verbindet modernste Telemedizin mit evidenzbasierter Gesundheitsoptimierung. 
                Unser Ziel: Ihnen den Zugang zu erstklassiger präventiver Medizin zu ermöglichen – 
                bequem, sicher und wissenschaftlich fundiert.
              </p>
              
              <AnimatedButton onClick={() => router.push('/lonvia-labs/questionnaire')}>
                Starten Sie Ihre Reise
              </AnimatedButton>
            </div>
            
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold">5000+</div>
                    <div className="text-sm opacity-80">Zufriedene Patienten</div>
                  </div>
                  <div className="bg-white/20 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold">50+</div>
                    <div className="text-sm opacity-80">Partnerkliniken</div>
                  </div>
                  <div className="bg-white/20 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold">100+</div>
                    <div className="text-sm opacity-80">Fachärzte</div>
                  </div>
                  <div className="bg-white/20 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold">98%</div>
                    <div className="text-sm opacity-80">Zufriedenheit</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-foreground-primary">
              Unsere Mission
            </h2>
            <p className="text-xl text-foreground-secondary leading-relaxed mb-8">
              Wir glauben, dass jeder Mensch Zugang zu hochwertiger präventiver Medizin verdient. 
              Lonvia macht fortschrittliche Gesundheitsoptimierung – von Hormonbalance bis Longevity – 
              für jeden zugänglich, der proaktiv in seine Gesundheit investieren möchte.
            </p>
            <p className="text-lg text-foreground-secondary leading-relaxed">
              Durch die Kombination aus digitaler Technologie, medizinischer Expertise und 
              wissenschaftlich validierten Protokollen bieten wir einen neuen Standard 
              in der personalisierten Gesundheitsversorgung.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <span className="text-sm font-medium text-[#10552E] bg-[#10552E]/10 px-3 py-1 rounded-full">
                Gründergeschichte
              </span>
              <h2 className="text-3xl font-bold mt-4 mb-6 text-foreground-primary">
                Mike Rain, CEO & Gründer
              </h2>
              <div className="space-y-4 text-foreground-secondary leading-relaxed">
                <p>
                  Die Idee zu Lonvia entstand aus einer persönlichen Erfahrung. Nach Jahren im 
                  Gesundheitssektor erkannte Mike Rain eine deutliche Lücke: Hochwertige 
                  präventive Medizin und Hormonoptimierung waren nur einer privilegierten 
                  Minderheit zugänglich.
                </p>
                <p>
                  &quot;Ich habe gesehen, wie transformativ die richtige medizinische Betreuung sein kann – 
                  aber auch, wie schwierig es für viele ist, Zugang zu spezialisierten Ärzten zu bekommen. 
                  Mit Lonvia wollte ich diese Barrieren abbauen.&quot;
                </p>
                <p>
                  Heute führt Mike ein Team aus Ärzten, Wissenschaftlern und Technologie-Experten, 
                  die gemeinsam daran arbeiten, Gesundheitsoptimierung für jeden erreichbar zu machen – 
                  mit dem Fokus auf den europäischen Markt und höchsten Qualitätsstandards.
                </p>
              </div>
            </div>
            
            <div className="order-1 md:order-2">
              <div className="bg-gradient-to-br from-[#10552E] to-[#0d4426] rounded-2xl p-8 text-white">
                <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-5xl">👨‍⚕️</span>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">Mike Rain</h3>
                  <p className="text-gray-200 mb-4">CEO & Gründer</p>
                  <div className="flex justify-center gap-4">
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Gesundheitsexperte</span>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Visionär</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-center mb-4 text-foreground-primary">
            So funktioniert Lonvia
          </h2>
          <p className="text-center text-foreground-secondary mb-12 max-w-2xl mx-auto">
            In fünf einfachen Schritten zu Ihrer optimierten Gesundheit
          </p>
          
          <div className="space-y-6">
            {processSteps.map((step, index) => (
              <div key={index} className="flex items-start gap-6 bg-white border border-border-primary rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 bg-[#10552E] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xl">{step.number}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground-primary mb-2">{step.title}</h3>
                  <p className="text-foreground-secondary">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-center mb-4 text-foreground-primary">
            Unsere Werte
          </h2>
          <p className="text-center text-foreground-secondary mb-12 max-w-2xl mx-auto">
            Die Prinzipien, die unsere Arbeit leiten
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white border border-border-primary rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-foreground-primary mb-2">{value.title}</h3>
                <p className="text-foreground-secondary">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Europe Focus */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-8">
          <div className="bg-[#10552E] rounded-2xl p-12 text-white text-center">
            <div className="text-5xl mb-6">🇪🇺</div>
            <h2 className="text-3xl font-bold mb-4">
              Fokus auf Europa
            </h2>
            <p className="text-xl text-gray-100 max-w-2xl mx-auto mb-8">
              Lonvia ist spezialisiert auf den europäischen Markt. Alle unsere Dienste, 
              Partner und Protokolle erfüllen die strengen EU-Vorschriften und Qualitätsstandards.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="bg-white/20 px-4 py-2 rounded-full">🇩🇪 Deutschland</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">🇦🇹 Österreich</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">🇨🇭 Schweiz</span>
              <span className="bg-white/20 px-4 py-2 rounded-full">🇳🇱 Niederlande</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 text-foreground-primary">
            Bereit für den nächsten Schritt?
          </h2>
          <p className="text-xl text-foreground-secondary mb-8">
            Starten Sie noch heute Ihre Reise zu optimierter Gesundheit. 
            Kostenlose Erstberatung, keine Verpflichtungen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AnimatedButton onClick={() => router.push('/lonvia-labs/questionnaire')} className="px-8 py-4">
              Jetzt starten
            </AnimatedButton>
            <Button 
              variant="outline" 
              className="border-2 border-[#10552E] text-[#10552E] hover:bg-[#10552E] hover:text-white px-8 py-4"
              onClick={() => router.push('/contact')}
            >
              Kontakt aufnehmen
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

