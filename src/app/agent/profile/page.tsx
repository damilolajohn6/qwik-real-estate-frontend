"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Profile() {
  const [user, setUser] = useState<{
    _id: string;
    name: string;
    email: string;
    phone: string;
    avatar?: { url: string };
  } | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

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

        const res = await fetch("http://localhost:8000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = await res.json();
        if (res.ok && userData._id) {
          setUser(userData);
          setFormData({
            name: userData.name || "",
            email: userData.email || "",
            phone: userData.phone || "",
            avatar: userData.avatar?.url || "",
          });
        } else {
          setError(userData.message || "Failed to fetch profile.");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router, isClient]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not authenticated");

      const res = await fetch("http://localhost:8000/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update profile.");

      setSuccess("Profile updated successfully!");
      setUser((prev) =>
        prev
          ? {
              ...prev,
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
            }
          : null
      );
      setTimeout(() => setSuccess(""), 3000);
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

  if (!user) {
    return (
      <Alert variant="destructive" className="m-6">
        <AlertDescription>Profile not found.</AlertDescription>
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
          <h1 className="text-xl font-bold">Agent Profile</h1>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-semibold">Hi {user.name}</span>
            <Image
              src={typeof user.avatar === "string" ? user.avatar : user.avatar?.url || "/default-avatar.png"}
              alt="User Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
        </div>

        {/* Profile Form */}
        <Card>
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
          </CardHeader>
          <CardContent>
            {success && (
              <Alert className="mb-4" variant="default">
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                {/* Avatar (Read-only for now) */}
                <div>
                  <Label>Avatar</Label>
                  <div className="mt-2">
                    <Image
                      src={formData.avatar || "/default-avatar.png"}
                      alt="Avatar"
                      width={100}
                      height={100}
                      className="rounded-full"
                    />
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex space-x-4">
                <Button type="submit">Update Profile</Button>
                <Link href="/agent/dashboard">
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
