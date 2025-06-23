"use client";

import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation  } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/autoplay";

const partnerLogos = [
  "/human2.png",
  "/human3.png",
  "/human4.png",
  "/human5.png",
  "/human6.png",
  "/human7.png",
  "/human8.png",
  "/human9.png",
  "/human10.png",
  "/human11.png",
];

const Partners: React.FC = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-2xl text-start font-bold mb-8 text-gray-800">Partners</h2>
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={30}
          slidesPerView={2}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
            1280: { slidesPerView: 6 },
          }}
        >
          {partnerLogos.map((logo, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <Image
                src={logo}
                alt={`Partner ${index + 1}`}
                width={120}
                height={60}
                className="object-contain grayscale hover:grayscale-0 transition"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Partners;
