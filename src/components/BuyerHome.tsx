/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

interface Property {
  _id: string;
  title: string;
  location: string;
  type: string;
  price: number;
  images: { url: string }[];
}

export default function BuyerHome() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchForm, setSearchForm] = useState({
    location: searchParams.get("location") || "",
    type: searchParams.get("type") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
  });

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError("");

      try {
        const query = new URLSearchParams(searchForm).toString();
        const res = await fetch(
          `http://localhost:8000/api/properties?${query}`
        );
        const data = await res.json();
        if (res.ok) {
          setProperties(data);
        } else {
          setError(data.message || "Failed to fetch properties.");
        }
      } catch (err) {
        setError("An error occurred while fetching properties.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [searchForm]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSearchForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams(searchForm).toString();
    router.push(`/buyer?${query}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div
        className="relative h-96 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold text-yellow-600">
              Buy And Sale Property In <br /> real Time.
            </h1>
            <p className="mt-4 text-lg">
              We help you find property listings that you will love to live with
              security guarantee.
            </p>
          </div>
        </div>
      </div>

      {/* Search Form */}
      <div className="max-w-7xl mx-auto p-6 -mt-16">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row gap-4"
        >
          <select
            name="location"
            value={searchForm.location}
            onChange={handleInputChange}
            className="p-2 border rounded w-full md:w-auto"
          >
            <option value="">Location</option>
            <option value="Magodo">Magodo</option>
            <option value="Lagos">Lagos</option>
            <option value="Abuja">Abuja</option>
            <option value="Port Harcourt">Port Harcourt</option>
            <option value="Ibadan">Ibadan</option>
          </select>
          <select
            name="type"
            value={searchForm.type}
            onChange={handleInputChange}
            className="p-2 border rounded w-full md:w-auto"
          >
            <option value="">Property Type</option>
            <option value="house">Buy</option>
            <option value="apartment">Apartment</option>
            <option value="condo">Condo</option>
            <option value="land">Land</option>
          </select>
          <input
            type="number"
            name="minPrice"
            value={searchForm.minPrice}
            onChange={handleInputChange}
            placeholder="Minimum Price"
            className="p-2 border rounded w-full md:w-auto"
          />
          <input
            type="number"
            name="maxPrice"
            value={searchForm.maxPrice}
            onChange={handleInputChange}
            placeholder="Maximum Price"
            className="p-2 border rounded w-full md:w-auto"
          />
          <button
            type="submit"
            className="bg-brown-600 text-white p-2 rounded hover:bg-brown-700 w-full md:w-auto"
          >
            Search
          </button>
        </form>
      </div>

      {/* Property Listings */}
      <div className="max-w-7xl mx-auto p-6">
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && properties.length === 0 && (
          <p className="text-center">No properties found.</p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {properties.map((property) => (
            <Link
              href={`/buyer/property/${property._id}`}
              key={property._id}
              className="block"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <Image
                  src={property.images[0]?.url || "/default-image.jpg"}
                  alt={property.title}
                    width={500}
                    height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{property.title}</h3>
                  <p className="text-gray-600">{property.location}</p>
                  <p className="text-brown-600 font-bold">
                    ${property.price.toLocaleString()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
