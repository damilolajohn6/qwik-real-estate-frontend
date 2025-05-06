// app/property/[id]/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getProperty, Property } from "@/lib/api";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await getProperty(id as string, ""); // Placeholder token, handle authentication later
        setProperty(data);
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!property) return <p className="text-center">Property not found.</p>;

  return (
    <div className="">
      <Navbar />
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-semibold mb-4">{property.title}</h1>
        <Image
          src={property.images[0]?.url || "https://via.placeholder.com/600"}
          alt={property.title}
          width={600}
          height={400}
          priority
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <p className="text-gray-700 mb-2">Location: {property.location}</p>
        <p className="text-gray-700 mb-2">
          Price: ${property.price.toLocaleString()}
        </p>
        <p className="text-gray-700 mb-2">Type: {property.type}</p>
        <p className="text-gray-700 mb-2">Bedrooms: {property.bedrooms}</p>
        <p className="text-gray-700 mb-2">Bathrooms: {property.bathrooms}</p>
        <p className="text-gray-700 mb-2">
          Square Footage: {property.squareFootage} sq ft
        </p>
        <p className="text-gray-700 mb-2">
          Amenities: {property.amenities.join(", ")}
        </p>
        <p className="text-gray-700 mb-2">Status: {property.status}</p>
        <p className="text-gray-700 mb-2">Views: {property.views}</p>
        <p className="text-gray-700 mb-2">Agent: {property.agent.name}</p>
        <p className="text-gray-700">Description: {property.description}</p>
      </div>
      <Footer />
    </div>
  );
}
