/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";
import Image from "next/image";

interface ButtonProps {
  text: string;
  href: string;
}

const CustomButton: React.FC<ButtonProps> = ({ text, href }) => {
  return (
    <a
      href={href}
      className="inline-block bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-300"
    >
      {text}
    </a>
  );
};

interface VideoThumbnailProps {
  imageSrc: string;
  altText: string;
  videoUrl?: string;
}

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({
  imageSrc,
  altText,
  videoUrl,
}) => {
  return (
    <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-lg group">
      <Image
        src={imageSrc}
        alt={altText}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        priority
      />
      {/* Overlay for play button */}
      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center cursor-pointer">
        <div className="bg-white bg-opacity-80 p-4 rounded-full transition-transform duration-300 group-hover:scale-110">
          <svg
            className="w-8 h-8 text-red-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      {/* Progress line (for decoration) */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-400">
        <div className="w-1/3 h-full bg-red-500"></div>
      </div>
    </div>
  );
};

const CompanyInfo: React.FC = () => {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
        {/* About Company Section */}
        <div className="flex flex-col justify-center bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-6">
            About Company
          </h2>
          <p className="text-gray-700 leading-relaxed mb-8 text-lg">
            At BlueYard, we believe that finding the perfect property should be
            an exciting and seamless journey. Whether you&rsquo;re buying your
            dream home, selling an investment, or searching for the right
            commercial space, we&rsquo;re here to guide you every step of the
            way. With a team of experienced real estate professionals, deep
            market insights, and a commitment to excellence.
          </p>
          <CustomButton text="Learn More" href="/about" />
        </div>

        {/* Video/Image */}
        <div className="flex items-center justify-center">
          <VideoThumbnail
            imageSrc="/abuja.jpg"
            altText="Professionals discussing real estate"
          />
        </div>

        {/* Video/Image */}
        <div className="flex items-center justify-center">
          <VideoThumbnail
            imageSrc="/lagos.jpg"
            altText="Control your home from your phone"
          />
        </div>

        {/* Trends Developed Areas Section */}
        <div className="flex flex-col justify-center bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-6">
            Trends Developed Areas
          </h2>
          <p className="text-gray-700 leading-relaxed mb-8 text-lg">
            Read the latest news and trends in the most recent real estate
            developments and find out where the market is heading.
          </p>
          <CustomButton text="Read More" href="/trends" />
        </div>
      </div>
    </section>
  );
};

export default CompanyInfo;
