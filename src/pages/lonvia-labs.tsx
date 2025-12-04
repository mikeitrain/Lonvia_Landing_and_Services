import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  BeakerIcon,
  SparklesIcon,
  ClockIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import { AnimatedButton } from "@/components/common/AnimatedButton";
import { Button } from "@/components/common/Button";
import { Card, CardContent } from "@/components/landing-page/card";
import { ServiceModal } from "@/components/lonvia-labs/ServiceModal";
import { serviceDetails } from "@/data/serviceDetails";

export default function LonviaLabsPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLearnMore = (serviceId: number) => {
    setSelectedServiceId(serviceId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedServiceId(null);
  };

  const handleStartAssessment = () => {
    setIsModalOpen(false);
    const service = services.find(s => s.id === selectedServiceId);
    if (service) {
      router.push(`/lonvia-labs/questionnaire?category=${service.category}`);
    }
  };

  const categories = [
    { id: "all", label: "All Services", icon: "🔬" },
    { id: "hormones", label: "Hormones", icon: "⚡" },
    { id: "aesthetics", label: "Aesthetics", icon: "✨" },
    { id: "metabolic", label: "Metabolic", icon: "⚖️" },
    { id: "cognitive", label: "Cognitive", icon: "🧠" },
    { id: "mental", label: "Mental Health", icon: "🧘" },
    { id: "longevity", label: "Longevity", icon: "🧬" },
    { id: "sexual", label: "Sexual Health", icon: "❤️" },
    { id: "performance", label: "Performance", icon: "🏃‍♂️" },
    { id: "wellness", label: "Wellness", icon: "😴" }
  ];

  const services = [
    {
      id: 1,
      title: "Hormone Optimization",
      category: "hormones",
      icon: "⚡",
      description: "Comprehensive hormone testing and optimization therapy including testosterone, growth hormone, and thyroid optimization.",
      features: [
        "Testosterone Replacement Therapy (TRT)",
        "Growth Hormone Optimization",
        "Thyroid Optimization",
        "Comprehensive Hormone Panels"
      ],
      duration: "3-6 months"
    },
    {
      id: 2,
      title: "Hair Loss Prevention & Restoration",
      category: "aesthetics",
      icon: "💇‍♂️",
      description: "Advanced treatments for male and female pattern baldness using cutting-edge therapies and medications.",
      features: [
        "Finasteride & Dutasteride",
        "Minoxidil Therapy",
        "PRP Hair Restoration",
        "Hair Transplant Consultation"
      ],
      duration: "6-12 months"
    },
    {
      id: 3,
      title: "Weight Management & Body Composition",
      category: "metabolic",
      icon: "⚖️",
      description: "Personalized weight loss programs using GLP-1 medications, metabolic optimization, and body composition analysis.",
      features: [
        "Semaglutide (Ozempic/Wegovy)",
        "Tirzepatide (Mounjaro/Zepbound)",
        "Metabolic Panel Testing",
        "Body Composition Analysis"
      ],
      duration: "3-12 months"
    },
    {
      id: 4,
      title: "Cognitive Enhancement",
      category: "cognitive",
      icon: "🧠",
      description: "Optimize mental performance, focus, memory, and cognitive function through targeted nootropics and lifestyle interventions.",
      features: [
        "Cognitive Assessment",
        "Nootropic Protocols",
        "Memory Enhancement",
        "Focus Optimization"
      ],
      duration: "2-6 months"
    },
    {
      id: 5,
      title: "Mental Health & Wellness",
      category: "mental",
      icon: "🧘",
      description: "Comprehensive mental health support including stress management, anxiety and depression treatment, and therapeutic interventions.",
      features: [
        "Mental Health Assessment",
        "Stress Management",
        "Anxiety & Depression Support",
        "Therapy Referrals"
      ],
      duration: "3-12 months"
    },
    {
      id: 6,
      title: "Longevity & Anti-Aging",
      category: "longevity",
      icon: "🧬",
      description: "Comprehensive anti-aging protocols including peptide therapy, NAD+ optimization, and longevity biomarkers.",
      features: [
        "Peptide Therapy",
        "NAD+ IV Therapy",
        "Longevity Biomarkers",
        "Cellular Health Assessment"
      ],
      duration: "6-12 months"
    },
    {
      id: 7,
      title: "Sexual Health Optimization",
      category: "sexual",
      icon: "❤️",
      description: "Comprehensive sexual health optimization for men and women including hormone therapy and performance enhancement.",
      features: [
        "ED Treatment",
        "Libido Enhancement",
        "Hormone Optimization",
        "Performance Protocols"
      ],
      duration: "3-6 months"
    },
    {
      id: 8,
      title: "Athletic Performance Enhancement",
      category: "performance",
      icon: "🏃‍♂️",
      description: "Optimize athletic performance through advanced testing, supplementation, and recovery protocols.",
      features: [
        "Performance Testing",
        "Recovery Optimization",
        "Supplement Protocols",
        "Injury Prevention"
      ],
      duration: "3-9 months"
    },
    {
      id: 9,
      title: "Skin Health & Aesthetics",
      category: "aesthetics",
      icon: "✨",
      description: "Advanced skincare protocols, anti-aging treatments, and aesthetic optimization programs.",
      features: [
        "Skincare Protocols",
        "Anti-Aging Treatments",
        "Aesthetic Consultations",
        "Supplement Regimens"
      ],
      duration: "3-6 months"
    },
    {
      id: 10,
      title: "Sleep Optimization",
      category: "wellness",
      icon: "😴",
      description: "Comprehensive sleep analysis and optimization protocols to improve sleep quality and recovery.",
      features: [
        "Sleep Study Analysis",
        "Supplement Protocols",
        "Sleep Hygiene Optimization",
        "Recovery Tracking"
      ],
      duration: "2-4 months"
    }
  ];

  const labPanels = [
    { name: "Hormone Panel", markers: "25+ markers", icon: "⚡" },
    { name: "Metabolic Panel", markers: "30+ markers", icon: "🔥" },
    { name: "Cardiovascular", markers: "20+ markers", icon: "❤️" },
    { name: "Nutritional Status", markers: "15+ markers", icon: "🥗" },
    { name: "Inflammatory Markers", markers: "10+ markers", icon: "🩸" },
    { name: "Thyroid Function", markers: "8+ markers", icon: "🦋" },
    { name: "Liver Function", markers: "12+ markers", icon: "🫀" },
    { name: "Kidney Function", markers: "8+ markers", icon: "💧" }
  ];

  const successStories = [
    {
      name: "Marcus T.",
      age: "34",
      program: "Hormone Optimization",
      result: "Increased energy, improved muscle mass, better sleep quality.",
      quote: "After 6 months on TRT, I feel like I'm in my twenties again. My energy is through the roof and my workouts have never been better."
    },
    {
      name: "Jennifer L.",
      age: "29",
      program: "Hair Loss Prevention",
      result: "Significant hair regrowth, improved confidence.",
      quote: "The hair loss program completely changed my life. I've regained not just my hair, but my confidence too."
    },
    {
      name: "David R.",
      age: "42",
      program: "Weight Management",
      result: "Lost 45 lbs, improved metabolic health.",
      quote: "The GLP-1 program helped me lose weight I'd been struggling with for years. The medical supervision made all the difference."
    }
  ];

  const filteredServices = activeCategory === "all"
    ? services
    : services.filter(service => service.category === activeCategory);

  const getCategoryTitle = () => {
    if (activeCategory === "all") return "All Optimization Services";
    const category = categories.find(cat => cat.id === activeCategory);
    return category ? `${category.label} Optimization` : "All Optimization Services";
  };

  const handleStartOptimization = (category: string) => {
    router.push(`/lonvia-labs/questionnaire?category=${category}`);
  };

  return (
    <div className="bg-background-primary w-full">
      {/* Hero Section with Image Background */}
      <section className="relative bg-[#0E5A46] text-white py-24 overflow-hidden">
        {/* Image Background */}
        <img
          src="/images/Gemini_Generated_Image_55smx455smx455sm.png"
          alt="Lonvia Labs Health Consultation"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
        />

        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-30" style={{ zIndex: 1 }}></div>

        {/* Content */}
        <div className="relative max-w-6xl mx-auto px-8 text-center" style={{ zIndex: 2 }}>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            Lonvia Labs
          </h1>

          <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-gray-100 leading-relaxed drop-shadow-md">
            Optimize your health, enhance your performance, and unlock your full potential with our cutting-edge health optimization protocols.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AnimatedButton
              onClick={() => router.push('/lonvia-labs/questionnaire')}
              className="px-8 py-4 text-lg font-semibold"
            >
              Start Your Journey
            </AnimatedButton>
            <Button 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-[#0E5A46] px-8 py-4 text-lg font-semibold"
            >
              View Lab Results
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-background-secondary">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-foreground-primary">
            How Lonvia Labs Works
          </h2>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-6">
                <BeakerIcon className="w-10 h-10 text-primary-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-foreground-primary">
                Comprehensive Assessment
              </h3>
              <p className="text-foreground-secondary leading-relaxed">
                Complete detailed health questionnaire and schedule comprehensive lab testing to establish your baseline.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-6">
                <UserGroupIcon className="w-10 h-10 text-primary-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-foreground-primary">
                Expert Consultation
              </h3>
              <p className="text-foreground-secondary leading-relaxed">
                Meet with our specialized physicians to review results and create your personalized optimization protocol.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-6">
                <SparklesIcon className="w-10 h-10 text-primary-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-foreground-primary">
                Ongoing Optimization
              </h3>
              <p className="text-foreground-secondary leading-relaxed">
                Receive treatments, medications, and supplements with regular monitoring and protocol adjustments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-background-primary border-b border-border-primary sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeCategory === category.id
                    ? "bg-[#10552E] text-white shadow-md"
                    : "bg-background-secondary text-foreground-secondary hover:bg-neutral-100 border border-border-primary"
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background-primary">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-foreground-primary">
              {getCategoryTitle()}
            </h2>
            <p className="text-foreground-secondary text-lg">
              {filteredServices.length} {filteredServices.length === 1 ? 'service' : 'services'} available
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <Card
                key={service.id}
                className="group hover:shadow-2xl cursor-pointer bg-white hover:bg-gradient-to-br hover:from-white hover:to-green-50/20"
                style={{
                  transition: 'all 700ms cubic-bezier(0.4, 0, 0.2, 1), transform 700ms cubic-bezier(0.34, 1.56, 0.64, 1)',
                  willChange: 'transform, box-shadow',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.01)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}
              >
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-12 h-12 bg-gradient-to-r from-[#10552E] to-[#0d4426] rounded-lg flex items-center justify-center"
                        style={{
                          transition: 'all 600ms cubic-bezier(0.34, 1.56, 0.64, 1)',
                          willChange: 'transform',
                        }}
                      >
                        <span className="text-2xl">{service.icon}</span>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-4 transition-colors duration-600 ease-in-out group-hover:text-[#10552E]">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 mb-4 flex-grow transition-colors duration-600 ease-in-out group-hover:text-gray-700">
                    {service.description}
                  </p>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2 transition-colors duration-600 ease-in-out group-hover:text-[#10552E]">
                      What&apos;s Included:
                    </h4>
                    <ul className="space-y-1">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600 transition-colors duration-600 ease-in-out group-hover:text-gray-700">
                          <svg className="w-4 h-4 text-[#10552E] mr-2 flex-shrink-0 transition-transform duration-600 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 transition-all duration-600 ease-in-out group-hover:bg-[#10552E] group-hover:text-white">
                      <ClockIcon className="w-3 h-3 mr-1" />
                      {service.duration}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 mt-auto">
                    <AnimatedButton
                      onClick={() => handleStartOptimization(service.category)}
                      className="w-full"
                    >
                      Start Optimization
                    </AnimatedButton>
                    <Button 
                      variant="outline" 
                      className="w-full border-[#10552E] text-[#10552E] hover:bg-[#10552E] hover:text-white"
                      style={{
                        transition: 'all 600ms cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                      onClick={() => handleLearnMore(service.id)}
                    >
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lab Testing Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-teal-50">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground-primary">
              Comprehensive Lab Testing
            </h2>
            <p className="text-xl text-foreground-secondary max-w-3xl mx-auto">
              Our advanced laboratory testing provides detailed insights into your health markers and optimization opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {labPanels.map((panel, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-6">
                  <div className="text-3xl mb-3">{panel.icon}</div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {panel.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {panel.markers}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button 
              onClick={() => router.push('/lonvia-labs/questionnaire')}
              className="bg-[#10552E] hover:bg-[#0d4426] text-white px-8 py-4 text-lg font-semibold"
            >
              Order Lab Testing
            </Button>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-background-primary">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-foreground-primary">
              Success Stories
            </h2>
            <p className="text-xl text-foreground-secondary">
              Real results from real patients
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-[#10552E] rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-semibold">
                        {story.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{story.name}</h3>
                      <p className="text-sm text-gray-600">
                        Age {story.age} • {story.program}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 italic">&ldquo;{story.quote}&rdquo;</p>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm text-green-800 font-medium">
                      Results: {story.result}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-[#10552E] text-white">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Optimize Your Health?
          </h2>
          <p className="text-xl mb-12 text-gray-100 leading-relaxed">
            Join thousands of patients who have transformed their health with Lonvia Labs. Start your optimization journey today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <AnimatedButton
              onClick={() => router.push('/lonvia-labs/questionnaire')}
              className="!bg-white !text-[#10552E] hover:!bg-gray-100 px-8 py-4 text-lg font-semibold"
            >
              Get Started Today
            </AnimatedButton>
            <Button 
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-[#10552E] px-8 py-4 text-lg font-semibold"
            >
              Schedule Consultation
            </Button>
          </div>

          <p className="text-gray-200">
            Free consultation • No commitment required • Results guaranteed
          </p>
        </div>
      </section>

      {/* Service Details Modal */}
      <ServiceModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        service={selectedServiceId ? serviceDetails[selectedServiceId] : null}
        onStartAssessment={handleStartAssessment}
      />
    </div>
  );
}
