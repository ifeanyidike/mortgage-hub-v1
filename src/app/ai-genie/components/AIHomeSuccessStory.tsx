"use client";
import { cn } from "@/app/utils";
import Image from "next/image";
import React from "react";
import { VscQuote } from "react-icons/vsc";
import { motion } from "framer-motion";

const AIHomeSuccessStory = () => {
  return (
    <motion.div
      className={cn(
        "flex flex-col lg:flex-row items-center gap-12 bg-blue-500 text-white w-full p-8 py-16 lg:px-12 lg:py-24 mb-12",
        "rounded-none lg:rounded-[100px] lg:rounded-tl-none lg:rounded-br-none"
      )}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Story Text */}
      <div className="flex-grow lg:w-2/3 lg:mr-8 mb-4">
        <h2 className="text-2xl font-bold mb-4">Success Stories</h2>
        <div className="text-base leading-relaxed">
          <motion.span
            className="text-[#FE621D] mb-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <VscQuote size={40} />
          </motion.span>{" "}
          <p>
            {" "}
            Mark, a disabled father of two, just received $40,000 in down
            payment assistance from the Military Veterans Down Payment Program.
          </p>
        </div>
      </div>
      {/* Image */}
      <div className="flex-shrink-0 lg:w-1/3">
        <Image
          src="/assets/images/ai-success-story.png" // Replace with actual path
          alt="Success Story"
          width={500}
          height={400}
          className="rounded-lg shadow-lg"
        />
      </div>
    </motion.div>
  );
};

export default AIHomeSuccessStory;
