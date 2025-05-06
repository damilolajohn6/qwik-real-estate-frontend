/* eslint-disable @typescript-eslint/no-explicit-any */
// app/page.tsx
"use client";
import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import PropertyCard from "@/components/PropertyCard";
import { searchProperties, Property } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await searchProperties({ limit: 4 }); // Fetch 4 properties for featured section
        setProperties(data.properties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

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
    <div className="">
      <Navbar />
      <div className="bg-gray-100">
        {/* Hero Section */}
        <div
          className="relative h-96 bg-cover bg-center"
          style={{
            backgroundImage: "url('/hero.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-5xl font-bold">
                Buy And Sale Property In{" "}
                <span className="text-yellow-500">real Time</span>.
              </h1>
              <p className="mt-4 text-lg">
                We help you find property listings that you will love to live
                with security guarantee.
              </p>
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
        </div>

        {/* Featured Properties */}
        <div className="container mx-auto py-12 px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">
            Featured Properties
          </h2>
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : properties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          ) : (
            <p className="text-center">No properties found.</p>
          )}
        </div>
      </div>
      <AboutSection />
      <Footer />
    </div>
  );
}
