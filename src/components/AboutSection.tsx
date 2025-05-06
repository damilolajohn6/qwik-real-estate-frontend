// components/AboutSection.tsx
import React from "react";
import Image from "next/image";

const AboutSection: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      
      <div className="max-w-7xl mx-auto">
       
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          About BlueYAard
        </h2>
        {/* Main Content: Image and Text */}
        <div className="flex flex-col md:flex-row items-center gap-10">
         
          <div className="w-full md:w-1/2 relative h-80 md:h-96 rounded-lg overflow-hidden shadow-lg">
            
            <Image
              src="/about.jpg" // Assuming your image is in public/images/about-image.jpg
              alt="About BlueYAard"
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-500 hover:scale-105" // Optional hover effect
            />
          </div>
          {/* Text Content Section */}
          <div className="w-full md:w-1/2">
            {" "}
            {/* Responsive width */}
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
              Vision, Mission
            </h3>
            <p className="text-gray-600 leading-relaxed">
              At BlueYAard, we believe that finding the perfect property should
              be an exciting and seamless journey. Whether you&apos;re buying
              your dream home, selling an investment, or searching for the right
              commercial space, we&apos;re here to guide you every step of the
              way.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              With a team of experienced real estate professionals, deep market
              insights, and a commitment to excellence, we connect buyers and
              sellers with the best opportunities in the market. Our approach is
              built on trust, transparency, and a dedication to helping our
              clients make informed decisions with confidence.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              From luxury homes to commercial real estate and investment
              properties, we specialize in providing tailored solutions that
              match your unique needs. With a strong network and cutting-edge
              technology, we make property transactions simple, efficient, and
              rewarding.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              At BlueYAard, your property goals are our priority. Let&apos;s
              turn your real estate aspirations into reality.
            </p>
          </div>
        </div>
        {/* Keywords/Values */}
        <div className="mt-16 text-center text-gray-400 text-lg md:text-xl font-semibold tracking-wide">
          
          Trust Credibility Luxury Certified Transparent Credibil
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
