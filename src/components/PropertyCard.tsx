import Link from "next/link";
import { Property } from "@/lib/api";
import Image from "next/image";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Image
        src={property.images[0]?.url || "https://via.placeholder.com/300"}
        alt={property.title}
        width={300}
        height={200}
        priority
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{property.title}</h3>
        <p className="text-gray-600">{property.location}</p>
        <p className="text-lg font-bold mt-2">
          ${property.price.toLocaleString()}
        </p>
        <Link
          href={`/property/${property._id}`}
          className="text-blue-500 hover:underline mt-2 inline-block"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
