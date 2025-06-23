"use client";

import React from "react";
import Image from "next/image";

interface ServiceCardProps {
  imageSrc: string;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  imageSrc,
  title,
  description,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden group transition-transform duration-300 hover:shadow-lg">
      {/* Image Container */}
      <div className="relative w-full h-56 sm:h-60 md:h-64 lg:h-72 xl:h-80">
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Text Content */}
      <div className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2 sm:mb-3">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

const CoreServices: React.FC = () => {
  const services = [
    {
      imageSrc: "/sale.jpg",
      title: "Property Sales",
      description:
        "We assist you in selling and buying properties easily with trusted agents and transparent transactions.",
    },
    {
      imageSrc: "/rental.jpg",
      title: "Property Rentals & Leasings",
      description:
        "Our leasing services connect renters to verified listings and landlords without hassle.",
    },
    {
      imageSrc: "/manage.jpg",
      title: "Property Management",
      description:
        "We manage properties with care—from maintenance to tenant relations—so you don't have to.",
    },
    {
      imageSrc: "/advise.jpg",
      title: "Real Estate Investment Advisory",
      description:
        "We help investors make smart decisions with market research, analysis, and personalized advice.",
    },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 md:px-8 lg:px-16 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-gray-900 mb-10 sm:mb-12">
          Our Core Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              imageSrc={service.imageSrc}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreServices;
