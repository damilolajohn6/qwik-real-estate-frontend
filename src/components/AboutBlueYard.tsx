import React from "react";
import Image from "next/image";

const AboutBlueYard: React.FC = () => {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-12 text-left">
          About BlueYarD
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="rounded-lg overflow-hidden shadow-md">
            <Image
              src="/about-house.jpg" 
              alt="Beautiful modern house"
              width={700} 
              height={450} 
              layout="responsive" 
              objectFit="cover"
            />
          </div>

          <div className="flex flex-col justify-start">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              vision,Mission
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6 text-lg">
              At BlueYard, we believe that finding the perfect property should
              be an exciting and seamless journey. Whether you&apos;re buying your
              dream home, selling an investment, or searching for the right
              commercial space, we&apos;re here to guide you every step of the way.
              With a team of experienced real estate professionals, deep market
              insights, and a commitment to excellence, we connect buyers and
              sellers with the best opportunities in the market. Our approach is
              built on trust, transparency, and a dedication to helping our
              clients make informed decisions with confidence.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              From luxury homes to commercial real estate and investment
              properties, we specialize in providing tailored solutions that
              match your unique needs. With a strong network and cutting-edge
              technology, we make property transactions simple, efficient, and
              rewarding.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBlueYard;
