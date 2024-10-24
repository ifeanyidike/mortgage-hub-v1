import React from "react";
import LookingUp from "@/app/assets/Images/looking-up.png";
import Image from "next/image";
import { VscQuote } from "react-icons/vsc";

const LenderTestimonials = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-center justify-center lg:justify-between gap-8 lg:gap-16 p-8 lg:p-16 lg:px-32 py-16">
      {/* Image Container */}
      <div className="flex-shrink-0">
        <Image
          src={LookingUp}
          alt="testimonial"
          className="rounded-xl max-1-5xl:w-[400px] max-1-5xl:h-[400px]"
        />
      </div>

      {/* Testimonial Text */}
      <div className="flex flex-col max-w-xl gap-4">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">
          Mark got a first time mortgage with a private lender
        </h2>
        <span>
          <VscQuote size={40} />
        </span>
        <p className="text-lg md:text-xl italic text-gray-600 mb-8">
          I couldn&apos;t get a loan with my bank, never knew there were private
          lenders that could work with me.
        </p>
        <div className="flex items-center gap-2">
          <span className="text-4xl font-bold">200+</span>
          <span className="text-lg max-sm:text-base text-gray-600 border-b-4 border-[#FE621D]">
            Private Lenders in our Network
          </span>
        </div>
      </div>
    </div>
  );
};

export default LenderTestimonials;
