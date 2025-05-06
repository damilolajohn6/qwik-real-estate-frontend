/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (params: Record<string, any>) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = {
      location,
      type,
      priceMin: priceMin || undefined,
      priceMax: priceMax || undefined,
    };
    onSearch(params);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="p-2 border rounded bg-white text-gray-700"
        >
          <option value="">Location</option>
          <option value="Magodo">Magodo</option>
          <option value="Lagos">Lagos</option>
          <option value="Abuja">Abuja</option>
        </select>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-2 border rounded bg-white text-gray-700"
        >
          <option value="">Property Type</option>
          <option value="buy">Buy</option>
          <option value="rent">Rent</option>
        </select>
        <input
          type="number"
          value={priceMin}
          onChange={(e) => setPriceMin(e.target.value)}
          placeholder="Minimum Price"
          className="p-2 border rounded bg-white text-gray-700"
        />
        <input
          type="number"
          value={priceMax}
          onChange={(e) => setPriceMax(e.target.value)}
          placeholder="Maximum Price"
          className="p-2 border rounded bg-white text-gray-700"
        />
        <button
          type="submit"
          className="bg-brown-600 text-white p-2 rounded hover:bg-brown-700"
        >
          Search
        </button>
      </div>
    </form>
  );
}
