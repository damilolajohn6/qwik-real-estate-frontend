/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAgentProperties = async (
    token: string,
    params: Record<string, any> = {}
) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_URL}/properties/user?${query}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch properties.");
    return data;
};

export const deleteProperty = async (id: string, token: string) => {
    const res = await fetch(`${API_URL}/properties/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to delete property.");
    return data;
};

export const getProperty = async (id: string, token: string) => {
    const res = await fetch(`${API_URL}/properties/${id}`, {
        headers: {
            Authorization: `Bearer ${token || localStorage.getItem("token") || ""}`,
        },
        cache: "no-store",
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch property.");
    return data.property;
};

export const getAnalytics = async (token: string) => {
    const res = await fetch(`${API_URL}/properties/analytics`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch analytics.");
    return data.analytics;
};

export const searchProperties = async (params: Record<string, any> = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_URL}/properties?${query}`, {
        cache: "no-store",
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to search properties.");
    return data;
};

export interface Property {
    _id: string;
    title: string;
    description: string;
    price: number;
    location: string;
    type: string;
    amenities: string[];
    images: { url: string; public_id: string }[];
    agent: { _id: string; name: string; email: string };
    createdAt: string;
    bedrooms: number;
    bathrooms: number;
    squareFootage: number;
    status: string;
    views: number;
    locationCoordinates: {
        type: string;
        coordinates: [number, number];
    };
}

export interface AnalyticsData {
    totalListings: number;
    avgPrice: number;
    totalViews: number;
    typeDistribution: { name: string; count: number }[];
    active?: number;
    sold?: number;
    rented?: number;
    pending?: number;
}
export interface SearchResponse {
    properties: Property[];
    total: number;
    page: number;
    totalPages: number;
}
