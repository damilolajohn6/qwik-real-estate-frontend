"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getProperty } from "@/lib/api";
import { Property } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function PropertyDetail() {
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [isClient, setIsClient] = useState(false);
  const [user, setUser] = useState<{ name: string; avatar: string } | null>(
    null
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Authentication required. Redirecting to login...");
          setLoading(false);
          setTimeout(() => router.push("/login"), 1500);
          return;
        }

        // Fetch user data for header
        try {
          const userRes = await fetch(
            "http://localhost:8000/api/auth/profile",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const userData = await userRes.json();
          if (userRes.ok && userData._id) {
            setUser({
              name: userData.name,
              avatar: userData.avatar?.url || "/default-avatar.png",
            });
          } else {
            console.warn("Failed to fetch user profile:", userData);
          }
        } catch (userErr) {
          console.error("Error fetching user profile:", userErr);
        }

        // Fetch property details
        try {
          const propertyData = await getProperty(id as string, token);
          setProperty(propertyData);
        } catch (propertyErr) {
          console.error("Error fetching property:", propertyErr);
          setError(
            propertyErr instanceof Error
              ? propertyErr.message
              : "Failed to fetch property."
          );
        }
      } catch (err) {
        console.error("Data fetching error:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router, id, isClient]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (!isClient || loading) {
    return <p className="p-6">Loading...</p>;
  }

  if (error) {
    return (
      <Alert variant="destructive" className="m-6">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!property) {
    return (
      <Alert variant="destructive" className="m-6">
        <AlertDescription>Property not found.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8F5F2]">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4 space-y-4">
        <div className="flex items-center space-x-2 mb-6">
          <Image
            src="/blueyard-logo.png"
            alt="BlueYard"
            width={30}
            height={30}
          />
          <span className="text-xl font-bold">BlueYard</span>
        </div>
        <nav className="space-y-2">
          <Link
            href="/agent/dashboard"
            className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
          >
            <span className="text-lg">🏠</span>
            <span>Dashboard</span>
          </Link>
          <Link
            href="/agent/add-property"
            className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
          >
            <span className="text-lg">➕</span>
            <span>Add Property</span>
          </Link>
          <Link
            href="/agent/listings"
            className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
          >
            <span className="text-lg">📋</span>
            <span>All Listing</span>
          </Link>
          <Link
            href="/agent/closed-listings"
            className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
          >
            <span className="text-lg">🚪</span>
            <span>Closed Listing</span>
          </Link>
          <Link
            href="/agent/profile"
            className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
          >
            <span className="text-lg">👤</span>
            <span>Profile</span>
          </Link>
          <Link
            href="/agent/agent-listings"
            className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
          >
            <span className="text-lg">📋</span>
            <span>Agent Listing</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded w-full text-left"
          >
            <span className="text-lg">🚪</span>
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-4">
        {/* Header */}
        <div className="flex justify-between items-center bg-gray-200 p-4 mb-4 rounded">
          <h1 className="text-xl font-bold">{property.title}</h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-semibold">
              Hi {user?.name || "Guest"}
            </span>
            <Image
              src={user?.avatar || "/default-avatar.png"}
              alt="User Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
        </div>

        {/* Property Details */}
        <Card>
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Images */}
              <div>
                <h2 className="text-lg font-semibold mb-2">Images</h2>
                <div className="grid grid-cols-2 gap-4">
                  {property.images && property.images.length > 0 ? (
                    property.images.map((image, index) => (
                      <Image
                        key={index}
                        src={image.url || "/placeholder.jpg"}
                        alt={`Property image ${index + 1}`}
                        width={200}
                        height={200}
                        className="rounded object-cover"
                      />
                    ))
                  ) : (
                    <p>No images available.</p>
                  )}
                </div>
              </div>

              {/* Property Info */}
              <div>
                <h2 className="text-lg font-semibold mb-2">Information</h2>
                <p>
                  <strong>Location:</strong> {property.location}
                </p>
                <p>
                  <strong>Price:</strong> ${property.price.toLocaleString()}
                </p>
                <p>
                  <strong>Type:</strong> {property.type}
                </p>
                <p>
                  <strong>Bedrooms:</strong> {property.bedrooms}
                </p>
                <p>
                  <strong>Bathrooms:</strong> {property.bathrooms}
                </p>
                <p>
                  <strong>Square Footage:</strong> {property.squareFootage} sq
                  ft
                </p>
                <p>
                  <strong>Status:</strong> {property.status}
                </p>
                <p>
                  <strong>Views:</strong> {property.views}
                </p>
                <p>
                  <strong>Posted by:</strong>{" "}
                  {property.agent?.name || "Unknown"}
                </p>
                <p>
                  <strong>Date Added:</strong>{" "}
                  {new Date(property.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p>{property.description}</p>
            </div>

            {/* Amenities */}
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Amenities</h2>
              {property.amenities && property.amenities.length > 0 ? (
                <ul className="list-disc pl-5">
                  {property.amenities.map((amenity, index) => (
                    <li key={index}>{amenity}</li>
                  ))}
                </ul>
              ) : (
                <p>No amenities listed.</p>
              )}
            </div>

            {/* Actions */}
            <div className="mt-6 flex space-x-4">
              <Link href={`/agent/edit-property/${property._id}`}>
                <Button variant="outline">Edit Property</Button>
              </Link>
              <Link href="/agent/listings">
                <Button variant="secondary">Back to Listings</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
