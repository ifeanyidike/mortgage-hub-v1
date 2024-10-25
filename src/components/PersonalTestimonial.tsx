import React from "react";
import LookingUp from "@/app/assets/Images/looking-up.png";
import Image from "next/image";
import { VscQuote } from "react-icons/vsc";

type Props = {
  title: string;
  description: string;
  stat: string;
  statText: string;
  src: string;
};

const PersonalTestimonial = (props: Props) => {
  const { title, description, stat, statText, src } = props;
  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-center justify-center lg:justify-between gap-8 lg:gap-16 p-8 lg:p-16 lg:px-32 py-16">
      {/* Image Container */}
      <div className="flex-shrink-0">
        <Image
          src={src}
          alt="testimonial"
          width={400}
          height={400}
          className="rounded-xl  w-[400px] h-[400px] xl:w-[500px] lg:h-auto"
        />
      </div>

      {/* Testimonial Text */}
      <div className="flex flex-col max-w-xl gap-4">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">{title}</h2>
        <span>
          <VscQuote size={40} />
        </span>
        <p className="text-lg md:text-xl italic text-gray-600 mb-8">
          {description}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-4xl font-bold">{stat}</span>
          <span className="text-lg max-sm:text-base text-gray-600 border-b-4 border-[#FE621D]">
            {statText}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PersonalTestimonial;
