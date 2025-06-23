"use client";

import React from "react";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

const GetInTouch: React.FC = () => {
  return (
    <section className="bg-[#F2F2F2] py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Heading */}
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#1A1A1A]">
            Get In Touch
          </h2>
          <FiArrowRight className="text-[#D94F4F] text-xl" />
        </div>

        {/* Socials */}
        <div className="space-y-4 border-b pb-6">
          <h3 className="text-lg font-medium text-gray-800">
            Follows On Socials
          </h3>
          <div className="flex space-x-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-200 transition"
            >
              <FaInstagram className="text-black" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-200 transition"
            >
              <FaFacebookF className="text-black" />
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-gray-800">Join Us</h3>
          <p className="text-sm text-gray-600 uppercase tracking-wide">
            Always be the first to know, sign up for our weekly newsletter
          </p>
          <div className="relative border-b">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full bg-transparent py-3 pr-10 text-sm outline-none placeholder-gray-500"
            />
            <button className="absolute right-0 top-1/2 -translate-y-1/2 text-red-500">
              <FiArrowRight className="text-xl" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
