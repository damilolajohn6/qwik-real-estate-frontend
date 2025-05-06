import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Company */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About Company</h3>
          <p className="text-sm">
            At BlueYARD, we believe that finding the perfect property should be
            an exciting and seamless journey. Whether you&apos;re buying your dream
            home, selling an investment, or searching for the right commercial
            space, we&apos;re here to guide you every step of the way. With a team of
            experienced real estate professionals, deep market insights, and a
            commitment to excellence,
          </p>
          <Link href="/about">
            <button className="mt-4 bg-brown-600 text-white py-2 px-4 rounded hover:bg-brown-700">
              Learn More
            </button>
          </Link>
        </div>

        {/* Search & Explore */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Search & Explore</h3>
          <ul className="text-sm space-y-2">
            <li>
              <Link
                href="/properties?type=house"
                className="hover:text-brown-300"
              >
                Homes for Sale
              </Link>
            </li>
            <li>
              <Link
                href="/properties?type=land"
                className="hover:text-brown-300"
              >
                Land for Sale
              </Link>
            </li>
          </ul>
        </div>

        {/* Apartment Type */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Apartment Type</h3>
          <ul className="text-sm space-y-2">
            <li>
              <Link
                href="/properties?type=apartment"
                className="hover:text-brown-300"
              >
                Apartments for Sale
              </Link>
            </li>
            <li>
              <Link
                href="/properties?type=condo"
                className="hover:text-brown-300"
              >
                Condos for Sale
              </Link>
            </li>
          </ul>
        </div>

        {/* Popular Locations */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Popular Locations</h3>
          <ul className="text-sm space-y-2">
            <li>
              <Link
                href="/properties?location=Lagos"
                className="hover:text-brown-300"
              >
                Lagos
              </Link>
            </li>
            <li>
              <Link
                href="/properties?location=Abuja"
                className="hover:text-brown-300"
              >
                Abuja
              </Link>
            </li>
            {/* Removed duplicates and added more locations */}
            <li>
              <Link
                href="/properties?location=Port Harcourt"
                className="hover:text-brown-300"
              >
                Port Harcourt
              </Link>
            </li>
            <li>
              <Link
                href="/properties?location=Ibadan"
                className="hover:text-brown-300"
              >
                Ibadan
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-4">
        <div className="text-sm">
          <Link href="/refund-policy" className="hover:text-brown-300">
            Refund & Policy
          </Link>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brown-400 hover:text-brown-300"
          >
            <span className="sr-only">Instagram</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.317 3.608 1.292.975.975 1.23 2.242 1.292 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.317 2.633-1.292 3.608-.975.975-2.242 1.23-3.608 1.292-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.317-3.608-1.292-.975-.975-1.23-2.242-1.292-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.317-2.633 1.292-3.608.975-.975 2.242-1.23 3.608-1.292 1.266-.058 1.646-.07 4.85-.07m0-2.163c-3.259 0-3.67.014-4.953.072-1.315.064-2.553.345-3.499.791-1.066.489-1.98 1.403-2.469 2.469-.446.946-.727 2.184-.791 3.499-.058 1.283-.072 1.694-.072 4.953s.014 3.67.072 4.953c.064 1.315.345 2.553.791 3.499.489 1.066 1.403 1.98 2.469 2.469.946.446 2.184.727 3.499.791 1.283.058 1.694.072 4.953.072s3.67-.014 4.953-.072c1.315-.064 2.553-.345 3.499-.791 1.066-.489 1.98-1.403 2.469-2.469.446-.946.727-2.184.791-3.499.058-1.283.072-1.694.072-4.953s-.014-3.67-.072-4.953c-.064-1.315-.345-2.553-.791-3.499-.489-1.066-1.403-1.98-2.469-2.469-.946-.446-2.184-.727-3.499-.791-1.283-.058-1.694-.072-4.953-.072z" />
              <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162m0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm0-6.162c-.684 0-1.232.558-1.232 1.232s.558 1.232 1.232 1.232 1.232-.558 1.232-1.232-.558-1.232-1.232-1.232z" />
            </svg>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brown-400 hover:text-brown-300"
          >
            <span className="sr-only">Facebook</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.732 0 1.325-.593 1.325-1.325V1.325C24 .593 23.407 0 22.675 0z" />
            </svg>
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brown-400 hover:text-brown-300"
          >
            <span className="sr-only">Instagram</span>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.317 3.608 1.292.975.975 1.23 2.242 1.292 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.317 2.633-1.292 3.608-.975.975-2.242 1.23-3.608 1.292-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.317-3.608-1.292-.975-.975-1.23-2.242-1.292-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.317-2.633 1.292-3.608.975-.975 2.242-1.23 3.608-1.292 1.266-.058 1.646-.07 4.85-.07m0-2.163c-3.259 0-3.67.014-4.953.072-1.315.064-2.553.345-3.499.791-1.066.489-1.98 1.403-2.469 2.469-.446.946-.727 2.184-.791 3.499-.058 1.283-.072 1.694-.072 4.953s.014 3.67.072 4.953c.064 1.315.345 2.553.791 3.499.489 1.066 1.403 1.98 2.469 2.469.946.446 2.184.727 3.499.791 1.283.058 1.694.072 4.953.072s3.67-.014 4.953-.072c1.315-.064 2.553-.345 3.499-.791 1.066-.489 1.98-1.403 2.469-2.469.446-.946.727-2.184.791-3.499.058-1.283.072-1.694.072-4.953s-.014-3.67-.072-4.953c-.064-1.315-.345-2.553-.791-3.499-.489-1.066-1.403-1.98-2.469-2.469-.946-.446-2.184-.727-3.499-.791-1.283-.058-1.694-.072-4.953-.072z" />
              <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162m0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm0-6.162c-.684 0-1.232.558-1.232 1.232s.558 1.232 1.232 1.232 1.232-.558 1.232-1.232-.558-1.232-1.232-1.232z" />
            </svg>
          </a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto text-center text-xs text-brown-400 mt-4">
        All Rights Reserved © 2025
      </div>
    </footer>
  );
};

export default Footer;
