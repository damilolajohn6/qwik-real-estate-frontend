"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getProperty } from "@/lib/api";
import { Property } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function EditProperty() {
  const [property, setProperty] = useState<Property | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    type: "",
    amenities: [] as string[], // Store amenities as an array
    bedrooms: "",
    bathrooms: "",
    squareFootage: "",
    status: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
            "https://qwik-realestate.onrender.com/api/auth/profile",
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
          setFormData({
            title: propertyData.title || "",
            description: propertyData.description || "",
            price: propertyData.price?.toString() || "",
            location: propertyData.location || "",
            type: propertyData.type || "",
            amenities: propertyData.amenities || [], // Set as array
            bedrooms: propertyData.bedrooms?.toString() || "",
            bathrooms: propertyData.bathrooms?.toString() || "",
            squareFootage: propertyData.squareFootage?.toString() || "",
            status: propertyData.status || "",
          });
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

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { name: string; value: string | string[] }
  ) => {
    const { name, value } = "target" in e ? e.target : e;
    if (name === "amenities" && typeof value === "string") {
      setFormData((prev) => ({
        ...prev,
        amenities: value
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not authenticated");

      const body = {
        ...formData,
        price: parseFloat(formData.price),
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        squareFootage: parseInt(formData.squareFootage),
        amenities: formData.amenities, // Already an array
      };

      const res = await fetch(`http://localhost:8000/api/properties/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok)
        throw new Error(data.message || "Failed to update property.");

      setSuccess("Property updated successfully!");
      setTimeout(() => router.push(`/agent/property/${id}`), 1500);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
    }
  };

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
          <h1 className="text-xl font-bold">Edit Property: {property.title}</h1>
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

        {/* Edit Form */}
        <Card>
          <CardHeader>
            <CardTitle>Edit Property</CardTitle>
          </CardHeader>
          <CardContent>
            {success && (
              <Alert className="mb-4" variant="default">
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter property title"
                    required
                  />
                </div>

                {/* Location */}
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="Enter location"
                    required
                  />
                </div>

                {/* Price */}
                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="Enter price"
                    required
                  />
                </div>

                {/* Type */}
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select
                    name="type"
                    value={formData.type}
                    onValueChange={(value) =>
                      handleInputChange({ name: "type", value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                      <SelectItem value="land">Land</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Bedrooms */}
                <div>
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input
                    id="bedrooms"
                    name="bedrooms"
                    type="number"
                    value={formData.bedrooms}
                    onChange={handleInputChange}
                    placeholder="Enter number of bedrooms"
                    required
                  />
                </div>

                {/* Bathrooms */}
                <div>
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input
                    id="bathrooms"
                    name="bathrooms"
                    type="number"
                    value={formData.bathrooms}
                    onChange={handleInputChange}
                    placeholder="Enter number of bathrooms"
                    required
                  />
                </div>

                {/* Square Footage */}
                <div>
                  <Label htmlFor="squareFootage">Square Footage</Label>
                  <Input
                    id="squareFootage"
                    name="squareFootage"
                    type="number"
                    value={formData.squareFootage}
                    onChange={handleInputChange}
                    placeholder="Enter square footage"
                    required
                  />
                </div>

                {/* Status */}
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    name="status"
                    value={formData.status}
                    onValueChange={(value) =>
                      handleInputChange({ name: "status", value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="sold">Sold</SelectItem>
                      <SelectItem value="rented">Rented</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter property description"
                  rows={5}
                  required
                />
              </div>

              {/* Amenities */}
              <div>
                <Label htmlFor="amenities">Amenities (comma-separated)</Label>
                <Input
                  id="amenities"
                  name="amenities"
                  value={formData.amenities.join(", ")}
                  onChange={handleInputChange}
                  placeholder="e.g., Pool, Garage, Gym"
                />
              </div>

              {/* Buttons */}
              <div className="flex space-x-4">
                <Button type="submit">Update Property</Button>
                <Link href={`/agent/property/${id}`}>
                  <Button variant="secondary">Cancel</Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
