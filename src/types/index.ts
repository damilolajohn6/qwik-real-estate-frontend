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