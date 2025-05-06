import React from "react";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";


const HeroSection: React.FC = () => {

  const handleSearch = () => {
    console.log("Search button clicked!");
   
  };

  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      <Image
        src="/hero.jpg"
        alt="Property showcase background"
        layout="fill"
        objectFit="cover"
        quality={90}
        className="z-0"
      />
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white px-4">
        <h1
          className="text-4xl md:text-5xl font-bold text-center max-w-2xl leading-tight"
          style={{ color: "#FFD700" }}
        >
          Buy And Sale Property In real Time.
        </h1>
        <p className="mt-4 text-lg text-center max-w-xl text-gray-300">
          We help you Find property listing that you will love to live with
          security guarantee
        </p>

        <div className="w-full bg-white rounded-xl shadow-lg p-4 md:p-6">
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end"
          >
           
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium mb-1 text-gray-700"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                placeholder="Magodo" 
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 bg-gray-100" // Styled to match image background
              />
            </div>
            <div>
              <label
                htmlFor="propertyType"
                className="block text-sm font-medium mb-1 text-gray-700"
              >
                Property type
              </label>
              <select
                id="propertyType"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 bg-gray-100 appearance-none pr-8" // appearance-none and pr-8 for custom arrow styling if needed
              >
                <option value="">Buy</option>{" "}
                <option value="rent">Rent</option>
                <option value="sale">Sale</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
             <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
           </div>
            </div>
            <div>
              <label
                htmlFor="minPrice"
                className="block text-sm font-medium mb-1 text-gray-700"
              >
                Minimum price
              </label>
              <select
                id="minPrice"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 bg-gray-100 appearance-none pr-8"
              >
                <option value="">Magodo</option>{" "}
                <option value="5000">$5,000</option>
                <option value="10000">$10,000</option>
                <option value="20000">$20,000</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="maxPrice"
                className="block text-sm font-medium mb-1 text-gray-700"
              >
                Maximum price
              </label>
              <select
                id="maxPrice"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 bg-gray-100 appearance-none pr-8"
              >
                <option value="">Magodo</option>
               
                <option value="50000">$50,000</option>
                <option value="100000">$100,000</option>
                <option value="200000">$200,000</option>
                <option value="500000">$500,000</option>
                {/* Add more price options */}
              </select>
            </div>
            {/* Search Button */}
            <div className="flex items-end lg:col-span-1">
              
              <button
                type="submit"
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm h-[42px]" // Adjusted color and height
              >
                Search
                <FiSearch className="ml-2" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
