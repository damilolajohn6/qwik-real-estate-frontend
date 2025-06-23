"use client";

import React from "react";
import { FaInstagram, FaFacebookF } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1A1A1A] text-white pt-12 pb-6 px-4 md:px-8 lg:px-12 mx-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
        {/* Logo and Description */}
        <div className="col-span-1">
          <h2 className="text-2xl font-bold text-red-500">
            <span className="text-white">BlueY</span>Ard
          </h2>
          <p className="text-sm mt-4 text-gray-300 leading-relaxed">
            At BlueyArD, we believe that finding the perfect property should be
            an exciting and seamless journey. Whether you&apos;re buying your
            dream home, selling an investment, or searching for the right
            commercial space, we&apos;re here to guide you every step of the
            way. With a team of experienced real estate professionals, deep
            market insights, and a commitment to excellence,
          </p>
        </div>

        {/* Search & Explore */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Search & Explore</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Home for sale</li>
            <li>Land for sale</li>
          </ul>
        </div>

        {/* Apartment Type */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Apartment Type</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Home for sale</li>
            <li>Land for sale</li>
          </ul>
        </div>

        {/* Popular Locations */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Popular Locations</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Lagos</li>
            <li>Abuja</li>
            <li>Abuja</li>
            <li>Abuja</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto mt-10 flex flex-col-reverse items-center gap-4 md:flex-row md:justify-between border-t border-gray-700 pt-6">
        {/* Left */}
        <p className="text-sm text-gray-400">Refund & Policy</p>

        {/* Center */}
        <p className="text-sm text-red-500">AllrightReserved@2025</p>

        {/* Social Icons */}
        <div className="flex space-x-4">
          {[FaInstagram, FaFacebookF, FaInstagram].map((Icon, index) => (
            <a
              key={index}
              href="#"
              className="w-10 h-10 border border-red-500 text-white flex items-center justify-center rounded-full hover:bg-red-500 transition"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
