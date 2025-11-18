import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Card, CardContent } from "@/components/landing-page/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { UserIcon } from '@heroicons/react/24/outline';

export const DoctorsSection: React.FC = () => {
  const { t } = useLanguage();
  const router = useRouter();

  const handleMeetTeamClick = () => {
    router.push("/about/our-team");
  };

  const doctors = [
    {
      name: "Prof. Dr. Lukas Prantl",
      specialty: "Plastic Surgery Specialist",
      description: "Aesthetic & Reconstructive Surgery",
      image: "/Lukas-Prantl-1.jpg",
      experience: "20+ Years Experience",
      experienceColor: "bg-pink-100 text-pink-800",
      hasImage: true
    },
    {
      name: "Dr. Maria Gonzalez",
      specialty: "Orthopedic Surgeon",
      description: "Joint Replacement & Sports Medicine",
      image: null,
      experience: "14+ Years Experience",
      experienceColor: "bg-orange-100 text-orange-800",
      hasImage: false
    },
    {
      name: "Dr. Emily Chen",
      specialty: "Medical Oncologist",
      description: "Cancer Care & Treatment",
      image: null,
      experience: "10+ Years Experience",
      experienceColor: "bg-purple-100 text-purple-800",
      hasImage: false
    }
  ];

  return (
    <section className="w-full py-16 bg-background-primary">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground-primary mb-4">
            {t('landing.doctors.title')}
          </h2>
          <p className="text-lg md:text-xl text-foreground-secondary max-w-3xl mx-auto">
            {t('landing.doctors.subtitle')}
          </p>
        </div>

        {/* Three Doctor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {doctors.map((doctor, index) => (
            <Card key={index} className="border-none shadow-box bg-background-primary hover:shadow-box-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="aspect-square w-full mb-4 overflow-hidden rounded-lg">
                  {doctor.hasImage && doctor.image ? (
                    <Image
                      className="w-full h-full object-cover"
                      alt={`${doctor.name} - ${doctor.specialty}`}
                      src={doctor.image}
                      width={400}
                      height={400}
                    />
                  ) : (
                    <div className="w-full h-full bg-background-secondary flex items-center justify-center">
                      <div className="text-center text-foreground-tertiary">
                        <div className="w-16 h-16 bg-background-tertiary rounded-full mx-auto mb-3 flex items-center justify-center">
                          <UserIcon className="w-8 h-8" />
                        </div>
                        <p className="text-sm">Doctor Photo</p>
                        <p className="text-xs">Coming Soon</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-foreground-primary mb-2">{doctor.name}</h3>
                  <p className="text-foreground-secondary mb-2">{doctor.specialty}</p>
                  <p className="text-sm text-foreground-tertiary">{doctor.description}</p>
                  <div className="mt-4 flex justify-center space-x-2">
                    <span className={`px-2 py-1 ${doctor.experienceColor} text-xs rounded-full`}>
                      {doctor.experience}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Team Info */}
        <div className="text-center mt-12">
          <p className="text-sm md:text-base text-foreground-secondary mb-6">
            Our team of board-certified physicians brings decades of combined experience in providing exceptional healthcare.
          </p>
          <button
            onClick={handleMeetTeamClick}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 md:px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-box"
          >
            Meet Our Full Team
          </button>
        </div>
      </div>
    </section>
  );
}; 