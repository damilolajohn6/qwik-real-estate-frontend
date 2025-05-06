
export interface Property {
    _id: string;
    title: string;
    description: string;
    price: number;
    location: string;
    type: string;
    amenities: string[];
    images: { url: string; public_id: string }[];
    agent: { _id: string; name: string; email: string } | string; 
    createdAt: string;
    bedrooms: number;
    bathrooms: number;
    squareFootage: number;
    status: string; 
    views: number;
    locationCoordinates?: { 
        type: string;
        coordinates: [number, number]; 
    };
    // Add other fields if necessary
}

export interface PropertiesResponse {
    success: boolean;
    count: number;
    total: number;
    page: number;
    pages: number;
    properties: Property[];
}