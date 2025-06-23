/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { searchProperties, Property } from "@/lib/api";
import { Menu, X } from "lucide-react"; // Hamburger icons

const AboutHero: React.FC = () => {
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
      className="relative h-[85vh] bg-cover bg-center"
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
        <main className="flex-grow flex flex-col justify-center  text-white  px-4">
          <h1 className="text-3xl sm:text-4xl md:text-6xl pl-12 font-serif leading-tight mb-8 max-w-3xl">
            About
          </h1>
        </main>
      </div>
    </div>
  );
};

export default AboutHero;
