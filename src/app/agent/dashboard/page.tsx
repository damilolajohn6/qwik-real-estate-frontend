/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getAgentProperties, deleteProperty, getAnalytics } from "@/lib/api";
import { Property, AnalyticsData } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function AgentDashboard() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    type: "",
    bedrooms: "",
    bathrooms: "",
    priceMin: "",
    priceMax: "",
    squareFootageMin: "",
    squareFootageMax: "",
    status: "",
  });
  const [sort, setSort] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const limit = 10;
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState<{ name: string; avatar: string } | null>(
    null
  );

  useEffect(() => {
    setIsClient(true);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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

        // Fetch analytics
        let analyticsData: AnalyticsData = {
          totalListings: 0,
          avgPrice: 0,
          totalViews: 0,
          typeDistribution: [],
          active: 0,
          sold: 0,
          rented: 0,
          pending: 0,
        };
        try {
          const fetchedAnalytics = await getAnalytics(token);
          analyticsData = { ...analyticsData, ...fetchedAnalytics };
        } catch (analyticsErr) {
          console.error("Error fetching analytics:", analyticsErr);
        }

        // Fetch all properties for categorization
        try {
          const data = await getAgentProperties(token, {
            page: "1",
            limit: "1000",
          });
          if (data && Array.isArray(data.properties)) {
            const categorized = {
              active: data.properties.filter(
                (p: Property) => p.status === "active"
              ).length,
              sold: data.properties.filter((p: Property) => p.status === "sold")
                .length,
              rented: data.properties.filter(
                (p: Property) => p.status === "rented"
              ).length,
              pending: data.properties.filter(
                (p: Property) => p.status === "pending"
              ).length,
            };
            analyticsData = { ...analyticsData, ...categorized };
          } else {
            console.warn(
              "No properties found for categorization or invalid response:",
              data
            );
          }
        } catch (categorizationErr) {
          console.error(
            "Error fetching properties for categorization:",
            categorizationErr
          );
        }
        setAnalytics(analyticsData);

        // Fetch properties with filters
        const queryParams = {
          page: page.toString(),
          limit: limit.toString(),
          sort,
          order,
          ...Object.fromEntries(
            Object.entries(filters).filter(
              ([_, value]) => value && value !== "all" && value !== ""
            )
          ),
        };
        try {
          const propertiesData = await getAgentProperties(token, queryParams);
          if (propertiesData && Array.isArray(propertiesData.properties)) {
            setProperties(propertiesData.properties);
            setTotalPages(propertiesData.pages || 1);
          } else {
            setProperties([]);
            setTotalPages(1);
            console.warn("Invalid properties data:", propertiesData);
          }
        } catch (propertiesErr) {
          console.error("Error fetching filtered properties:", propertiesErr);
          setProperties([]);
          setTotalPages(1);
        }
      } catch (err) {
        console.error("Data fetching error:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred."
        );
        setProperties([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router, page, sort, order, filters, isClient]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this property?"))
      return;
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Not authenticated");
      await deleteProperty(id, token);
      setProperties((prev) => prev.filter((prop) => prop._id !== id));
      setAnalytics((prev) =>
        prev ? { ...prev, totalListings: prev.totalListings - 1 } : null
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unknown error during deletion."
      );
    }
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement> | { name: string; value: string }
  ) => {
    const { name, value } = "target" in e ? e.target : e;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPage(1);
  };

  const handleSortChange = (value: string) => {
    setSort(value);
    setPage(1);
  };

  const handleOrderChange = (value: string) => {
    setOrder(value);
    setPage(1);
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
            className="flex items-center space-x-2 p-2 bg-yellow-600 rounded text-white"
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
          <Input
            type="text"
            placeholder="Search"
            className="w-1/3 p-2 border rounded bg-white"
            value={filters.search}
            onChange={(e) => handleFilterChange(e)}
            name="search"
          />
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

        {/* Property Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gray-800 text-white">
            <CardContent className="p-4">
              <p className="text-sm">Active Property</p>
              <p className="text-2xl font-bold">{analytics?.active || 0}</p>
            </CardContent>
          </Card>
          <Card className="bg-green-600 text-white">
            <CardContent className="p-4">
              <p className="text-sm">Sold Property</p>
              <p className="text-2xl font-bold">{analytics?.sold || 0}</p>
            </CardContent>
          </Card>
          <Card className="bg-blue-600 text-white">
            <CardContent className="p-4">
              <p className="text-sm">Rented Property</p>
              <p className="text-2xl font-bold">{analytics?.rented || 0}</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-500 text-white">
            <CardContent className="p-4">
              <p className="text-sm">Pending Property</p>
              <p className="text-2xl font-bold">{analytics?.pending || 0}</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filter Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                {
                  id: "type",
                  name: "type",
                  label: "Type",
                  type: "select",
                  options: ["all", "house", "apartment", "condo", "land"],
                },
                {
                  id: "bedrooms",
                  name: "bedrooms",
                  label: "Min Beds",
                  type: "number",
                  placeholder: "e.g., 3",
                },
                {
                  id: "bathrooms",
                  name: "bathrooms",
                  label: "Min Baths",
                  type: "number",
                  placeholder: "e.g., 2",
                },
                {
                  id: "priceMin",
                  name: "priceMin",
                  label: "Min Price",
                  type: "number",
                  placeholder: "e.g., 100000",
                },
                {
                  id: "priceMax",
                  name: "priceMax",
                  label: "Max Price",
                  type: "number",
                  placeholder: "e.g., 500000",
                },
                {
                  id: "squareFootageMin",
                  name: "squareFootageMin",
                  label: "Min Sq Ft",
                  type: "number",
                  placeholder: "e.g., 1000",
                },
                {
                  id: "squareFootageMax",
                  name: "squareFootageMax",
                  label: "Max Sq Ft",
                  type: "number",
                  placeholder: "e.g., 5000",
                },
                {
                  id: "status",
                  name: "status",
                  label: "Status",
                  type: "select",
                  options: ["all", "active", "sold", "rented", "pending"],
                },
              ].map((filter) => (
                <div key={filter.id}>
                  <Label htmlFor={filter.id}>{filter.label}</Label>
                  {filter.type === "select" ? (
                    <Select
                      name={filter.name}
                      value={filters[filter.name as keyof typeof filters]}
                      onValueChange={(value) =>
                        handleFilterChange({ name: filter.name, value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={`Select ${filter.label.toLowerCase()}`}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {filter.options?.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      id={filter.id}
                      name={filter.name}
                      type={filter.type}
                      value={filters[filter.name as keyof typeof filters]}
                      onChange={handleFilterChange}
                      placeholder={filter.placeholder}
                    />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Listings */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Recent Listing</CardTitle>
              <div className="flex space-x-2">
                <Select onValueChange={handleSortChange} defaultValue={sort}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="createdAt">Date Added</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="views">Views</SelectItem>
                    <SelectItem value="title">Title</SelectItem>
                  </SelectContent>
                </Select>
                <Select onValueChange={handleOrderChange} defaultValue={order}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Order" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desc">Descending</SelectItem>
                    <SelectItem value="asc">Ascending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {properties.length === 0 ? (
              <p className="text-center text-gray-500">No properties found.</p>
            ) : !isMobile ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property Info</TableHead>
                    <TableHead>Date Added</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Listing Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Posted by</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {properties.map((prop) => (
                    <TableRow key={prop._id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Image
                            src={prop.images[0]?.url || "/placeholder.jpg"}
                            alt={prop.title}
                            width={50}
                            height={50}
                            className="rounded"
                          />
                          <div>
                            <p className="font-bold">{prop.title}</p>
                            <p className="text-sm text-gray-500">
                              {prop.location}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(prop.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>${prop.price.toLocaleString()}</TableCell>
                      <TableCell className="capitalize">{prop.type}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            prop.status === "active"
                              ? "bg-gray-800 text-white"
                              : prop.status === "sold"
                              ? "bg-green-600 text-white"
                              : prop.status === "rented"
                              ? "bg-blue-600 text-white"
                              : "bg-gray-500 text-white"
                          }`}
                        >
                          {prop.status}
                        </span>
                      </TableCell>
                      <TableCell>{prop.agent?.name || "Unknown"}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Link href={`/agent/property/${prop._id}`}>
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </Link>
                          <Link href={`/agent/edit-property/${prop._id}`}>
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </Link>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(prop._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {properties.map((prop) => (
                  <Card key={prop._id}>
                    <CardContent className="p-4">
                      <div className="flex space-x-4">
                        <Image
                          src={prop.images[0]?.url || "/placeholder.jpg"}
                          alt={prop.title}
                          width={80}
                          height={80}
                          className="rounded"
                        />
                        <div className="flex-1">
                          <p className="font-bold">{prop.title}</p>
                          <p className="text-sm text-gray-500">
                            {prop.location}
                          </p>
                          <p className="text-sm">
                            Date:{" "}
                            {new Date(prop.createdAt).toLocaleDateString()}
                          </p>
                          <p className="text-sm">
                            Price: #{prop.price.toLocaleString()}
                          </p>
                          <p className="text-sm capitalize">
                            Type: {prop.type}
                          </p>
                          <p className="text-sm">
                            Status:{" "}
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                prop.status === "active"
                                  ? "bg-gray-800 text-white"
                                  : prop.status === "sold"
                                  ? "bg-green-600 text-white"
                                  : prop.status === "rented"
                                  ? "bg-blue-600 text-white"
                                  : "bg-gray-500 text-white"
                              }`}
                            >
                              {prop.status}
                            </span>
                          </p>
                          <p className="text-sm">
                            Posted by: {prop.agent?.name || "Unknown"}
                          </p>
                          <div className="flex space-x-2 mt-2">
                            <Link href={`/agent/property/${prop._id}`}>
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                            </Link>
                            <Link href={`/agent/edit-property/${prop._id}`}>
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                            </Link>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(prop._id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination className="mt-4">
                <PaginationContent>
                  <PaginationPrevious
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className={
                      page === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) pageNum = i + 1;
                    else if (page <= 3) pageNum = i + 1;
                    else if (page >= totalPages - 2)
                      pageNum = totalPages - 4 + i;
                    else pageNum = page - 2 + i;
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          onClick={() => setPage(pageNum)}
                          isActive={pageNum === page}
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  <PaginationNext
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    className={
                      page === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationContent>
              </Pagination>
            )}
          </CardContent>
        </Card>

        {/* Analytics Chart */}
        {analytics && analytics.typeDistribution.length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Property Type Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics.typeDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#4F46E5" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
