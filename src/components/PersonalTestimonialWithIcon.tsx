"use client";
import React, { ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { VscQuote } from "react-icons/vsc";
import { cn } from "@/app/utils";
import CtaButton from "./CtaButton";

type Props = {
  title: string;
  description: string;
  icon: ReactNode;
  actionText: string;
  src: string;
  link: string;
};

const PersonalTestimonialWithIcon: React.FC<Props> = ({
  title,
  description,
  icon,
  actionText,
  link,
  src,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16 p-8 py-16 lg:p-16 lg:mt-16",
        "bg-gradient-to-br from-gray-50 to-gray-200 shadow-md max-w-screen-xl mx-auto",
        "rounded-none lg:rounded-[100px] lg:rounded-tl-none lg:rounded-br-none"
      )}
    >
      {/* Image Container with Animation */}
      <motion.div
        className="flex-shrink-0"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src={src}
          alt="testimonial"
          width={400}
          height={400}
          className="rounded-2xl w-[300px] h-[300px] lg:w-[350px] lg:h-[350px] xl:h-auto shadow-lg object-cover"
        />
      </motion.div>

      {/* Testimonial Text Section with Animation */}
      <motion.div
        className="flex flex-col max-w-xl gap-6 lg:gap-8 text-left"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl md:text-3xl font-bold text-gray-800">
          {title}
        </h2>

        <motion.span
          className="text-[#FE621D]"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <VscQuote size={40} />
        </motion.span>

        <p className="text-base italic text-gray-600 leading-relaxed">
          {description}
        </p>

        {/* Statistic Display */}
        <div className="flex items-center gap-4 mt-4">
          <motion.div
            className="text-3xl font-extrabold text-[#21334C] flex items-center"
            // initial={{ opacity: 0, scale: 0.9 }}
            // animate={{ opacity: 1, scale: 1 }}
            // transition={{ delay: 0.4, duration: 0.6 }}
          >
            {icon}
          </motion.div>
          <CtaButton
            classes="!bg-gray-800 !text-white hover:!bg-[#266ace]"
            text={actionText}
            href={link}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default PersonalTestimonialWithIcon;
