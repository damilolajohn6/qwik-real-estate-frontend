"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation,} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";

interface CityCardProps {
  cityName: string;
  imageSrc: string;
}

const CityCard: React.FC<CityCardProps> = ({ cityName, imageSrc }) => {
  return (
    <div className="flex flex-col items-start px-2">
      <div className="w-full h-80 rounded-lg overflow-hidden shadow-lg mb-4 relative">
        <Image
          src={imageSrc}
          alt={cityName}
          layout="fill"
          objectFit="cover"
          className="hover:scale-105 transition-transform duration-300"
        />
      </div>
      <Link
        href={`/properties`}
        className="flex items-center text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200"
      >
        {cityName}
        <FaArrowRight className="ml-2 text-sm" />
      </Link>
    </div>
  );
};

const ExploreCities: React.FC = () => {

  const cities = [
    { name: "Kano", imageUrl: "/kano.jpg" },
    { name: "Lagos", imageUrl: "/lagos.jpg" },
    { name: "Abuja", imageUrl: "/abuja.jpg" },
    { name: "Port Harcourt", imageUrl: "/lagos.jpg" },
    { name: "Enugu", imageUrl: "/kano.jpg" },
    { name: "Kaduna", imageUrl: "/abuja.jpg" },
    { name: "Sokoto", imageUrl: "/kano.jpg" },
    { name: "Ibadan", imageUrl: "/lagos.jpg" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);


  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 640) setCardsPerView(1);
      else if (window.innerWidth < 1024) setCardsPerView(2);
      else setCardsPerView(3);
    };
    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (direction === "left") {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    } else {
      setCurrentIndex((prev) =>
        Math.min(prev + 1, cities.length - cardsPerView)
      );
    }
  };


  return (
    <section className="py-16 px-4 sm:px-8 bg-gray-50">
      <h2 className="text-3xl font-serif font-bold text-gray-900 mb-10">
        Explore Cities
      </h2>
      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="w-full"
      >
        {cities.map((city, index) => (
          <SwiperSlide key={`${city.name}-${index}`}>
            <CityCard cityName={city.name} imageSrc={city.imageUrl} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={() => handleScroll("left")}
          className="p-2 rounded-full bg-white border hover:bg-gray-200 transition"
          disabled={currentIndex === 0}
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={() => handleScroll("right")}
          className="p-2 rounded-full bg-white border hover:bg-gray-200 transition"
          disabled={currentIndex >= cities.length - cardsPerView}
        >
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
};

export default ExploreCities;
