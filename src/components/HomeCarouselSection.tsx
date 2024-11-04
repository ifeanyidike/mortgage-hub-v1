"use client";
import React from "react";
import HomeCarousel from "./HomeCarousel";
import { motion } from "framer-motion";
import { Button } from "antd";
import CtaButton from "./CtaButton";
import { cn } from "@/app/utils";

const HomeCarouselSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={cn(
        "max-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex flex-col gap-8 py-12 px-4 lg:py-24 overflow-hidden",
        "rounded-none lg:rounded-[100px] lg:rounded-tl-none lg:rounded-br-none"
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="text-center flex flex-col items-center gap-4 lg:gap-8 px-4"
      >
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
          Mortgage Hub - Making Your Journey Effortless
        </h2>
        <p className="uppercase text-sm md:text-base text-gray-600">
          Explore a range of mortgage options tailored to your financial goals
        </p>
        <CtaButton
          classes="!bg-gray-800 !text-white hover:!bg-[#266ace]"
          text="Get Started"
          href="/new-immigrants"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="flex justify-center mt-4 w-[90%] mx-auto lg:px-8"
      >
        <HomeCarousel />
      </motion.div>
    </motion.section>
  );
};

export default HomeCarouselSection;
