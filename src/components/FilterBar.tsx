"use client";
import { useState } from "react";

interface FilterBarProps {
  onFilter: (filters: {
    location: string;
    priceMin: string;
    priceMax: string;
    type: string;
    amenities: string;
  }) => void;
}

export default function FilterBar({ onFilter }: FilterBarProps) {
  const [filters, setFilters] = useState({
    location: "",
    priceMin: "",
    priceMax: "",
    type: "",
    amenities: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onFilter(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={filters.location}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <input
          type="number"
          name="priceMin"
          placeholder="Min Price"
          value={filters.priceMin}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <input
          type="number"
          name="priceMax"
          placeholder="Max Price"
          value={filters.priceMax}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <select
          name="type"
          value={filters.type}
          onChange={handleChange}
          className="select select-bordered w-full"
        >
          <option value="">All Types</option>
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="condo">Condo</option>
          <option value="land">Land</option>
        </select>
        <input
          type="text"
          name="amenities"
          placeholder="Amenities (comma-separated)"
          value={filters.amenities}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <button
          type="submit"
          className="btn btn-primary w-full sm:col-span-2 lg:col-span-1"
        >
          Apply Filters
        </button>
      </div>
    </form>
  );
}
