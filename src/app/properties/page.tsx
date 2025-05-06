"use client";
import { useState, useEffect } from "react";
import PropertyCard from "@/components/PropertyCard";
import { searchProperties, Property } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Properties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await searchProperties({ page, limit });
        setProperties(data.properties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [page, limit]);

  const handleNext = () => setPage((prev) => prev + 1);
  const handlePrev = () => setPage((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="">
      <Navbar />
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-semibold text-center mb-8">
          All Properties
        </h1>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : properties.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
            <div className="mt-6 flex justify-center space-x-4">
              <button
                onClick={handlePrev}
                className="bg-gray-300 p-2 rounded hover:bg-gray-400"
                disabled={page === 1}
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                className="bg-gray-300 p-2 rounded hover:bg-gray-400"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p className="text-center">No properties found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}
