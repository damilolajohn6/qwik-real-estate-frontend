"use client";
import { useState, useEffect } from "react";
import PropertyCard from "@/components/PropertyCard";
import { searchProperties, Property } from "@/lib/api";
import Footer from "@/components/Footer";
import HomeSection from "@/components/HomeSection";
import ExploreCities from "@/components/ExploreCities";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CompanyInfo from "@/components/CompanyInfo";
import Partners from "@/components/Partners";
import GetInTouch from "@/components/GetInTouch";

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await searchProperties({ limit: 4 });
        setProperties(data.properties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  return (
    <div className="">
      <HomeSection />
      <ExploreCities />
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto  py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl sm:text-3xl font-semibold  mb-8">
              Featured Homes
            </h2>
            <Button className="bg-red-500 hover:bg-red-600 text-white  mt-2">
              <Link href="/properties">Discover Listing</Link>
            </Button>
          </div>
          {loading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : properties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No properties found.</p>
          )}
        </div>
      </div>
      <Partners />
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto  py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl sm:text-3xl font-semibold  mb-8">
              Featured Projects
            </h2>
            <button className="border-red-500 border rounded-xl p-2 hover:border-red-700 text-red-500 hover:text-red-700 mt-2">
              <Link href="/properties">See All</Link>
            </button>
          </div>
          {loading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : properties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No properties found.</p>
          )}
        </div>
      </div>
      <CompanyInfo />
      <GetInTouch />
      <Footer />
    </div>
  );
}
