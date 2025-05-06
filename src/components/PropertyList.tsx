"use client";

import React, { useEffect, useState } from "react";
import PropertyCard from "./PropertyCard";
import { Property, PropertiesResponse } from "@/types/property";
import { searchProperties } from "@/lib/api";

const PropertyList: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const data: PropertiesResponse = await searchProperties({});
        setProperties(data.properties);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-600 text-lg">
        Loading properties...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-600 text-lg">{error}</div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-10 text-gray-600 text-lg">
        No properties found.
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:flex xl:flex-wrap xl:gap-8">
        {properties.map((property) => (
          <div
            key={property._id}
            className="w-full xl:w-[calc(33.333%-1.5rem)] flex-shrink-0"
          >
            <PropertyCard property={property} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
