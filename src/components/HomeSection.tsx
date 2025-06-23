/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { searchProperties, Property } from "@/lib/api";
import { Menu, X } from "lucide-react"; // Hamburger icons

const HomeSection: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = async (params: Record<string, any>) => {
    setLoading(true);
    try {
      const data = await searchProperties(params);
      setProperties(data.properties);
    } catch (error) {
      console.error("Error searching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("/home.jpg")' }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Header/Navbar */}
        <header className="w-full py-4 px-6 md:px-8 flex justify-between items-center text-white">
         
          <div className="flex items-center space-x-2">
            <Link href="/">
              <span className="text-xl font-bold">BlueYard</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="hover:text-gray-300">
              Home
            </Link>
            <Link href="/properties" className="hover:text-gray-300">
              Buy
            </Link>
            <Link href="/agent/dashboard" className="hover:text-gray-300">
              Sell
            </Link>
            <Link href="/agent/dashboard" className="hover:text-gray-300">
              Agent
            </Link>
            <Link href="/about" className="hover:text-gray-300">
              About
            </Link>
            <Link href="/contact" className="hover:text-gray-300">
              Contact
            </Link>
          </nav>

          {/* Contact & CTA for Desktop */}
          <div className="hidden lg:flex items-center space-x-6 text-sm">
            <div className="flex flex-col">
              <span className="text-gray-300">Email</span>
              <span>realestatepro.com</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-300">Phone</span>
              <span>080327700060</span>
            </div>
            <Button className="bg-red-500 hover:bg-red-600 text-white">
              <Link href="/agent/dashboard">Post Property</Link>
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </header>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-transparent bg-opacity-90 text-white flex flex-col items-start space-y-4 px-6 py-4">
            <Link href="/" onClick={() => setMobileMenuOpen(false)}>
              Home
            </Link>
            <Link href="/properties" onClick={() => setMobileMenuOpen(false)}>
              Buy
            </Link>
            <Link
              href="/agent/dashboard"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sell
            </Link>
            <Link
              href="/agent/dashboard"
              onClick={() => setMobileMenuOpen(false)}
            >
              Agent
            </Link>
            <Link href="/about" className="hover:text-gray-300">
              About
            </Link>
            <Link href="/contact" className="hover:text-gray-300">
              Contact
            </Link>
            <Button
              className="bg-red-500 hover:bg-red-600 text-white w-full mt-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Link href="/agent/dashboard">Post Property</Link>
            </Button>
          </div>
        )}

        {/* Hero Section */}
        <main className="flex-grow flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-serif leading-tight mb-8 max-w-3xl">
            Step Into a View of Unmatched Luxury
          </h1>

          {/* Search Bar */}
          <div className="bg-white rounded-md p-2 flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 max-w-4xl w-full shadow-md">
            <div className="flex space-x-2 text-gray-800 font-semibold w-full md:w-auto justify-center">
              <button className="py-2 px-4 rounded-md bg-blue-100 text-blue-700">
                Buy
              </button>
              <button className="py-2 px-4 rounded-md hover:bg-gray-100">
                Sell
              </button>
              <button className="py-2 px-4 rounded-md hover:bg-gray-100">
                Rent
              </button>
            </div>
            <div className="relative flex-grow w-full">
              <input
                type="text"
                placeholder="Search for properties..."
                className="w-full p-3 pr-10 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => handleSearch({})}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Explore CTA */}
          <Link
            href="/properties"
            className="mt-8 flex items-center text-white text-lg hover:text-gray-300"
          >
            Explore Listing
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </Link>
        </main>
      </div>
    </div>
  );
};

export default HomeSection;
