"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import cn from "classnames";
import LenderHomeSelect from "./LenderHomeSelect";
import HomeTrust from "@/app/assets/icons/home-trust.svg";
import FinancialLP from "@/app/assets/icons/first-national-logo-color.svg";
import Header from "@/components/Header";
import CtaButton from "@/components/CtaButton";

const OurOffersSection = () => {
  return (
    <section
      className={cn(
        "lender-hero-section relative w-full bg-center bg-cover bg-no-repeat",
        "bg-[url('/assets/images/our-offers-desktop.jpg')]",
        "max-lg:bg-[url('/assets/images/our-offers-mobile.jpg')]",
        "overflow-hidden max-h-screen"
      )}
    >
      {/* Header with transparent background */}
      <Header bgColor="bg-transparent" />

      {/* Gradient overlay for text contrast */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/40 z-0"></div> */}

      {/* Main content container */}
      <div className="rlender-hero-block elative z-10  flex flex-col items-center px-8 lg:px-32 max-w-screen-xl mx-auto text-center text-white">
        {/* Animated title */}
        <motion.h2
          className="text-2xl lg:text-4xl font-bold mt-2 lg:mt-8 mb-2 lg:mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Find The Lender For You
        </motion.h2>

        {/* Lender Options */}
        <motion.div
          className="flex justify-center items-center gap-8 lg:gap-56 mt-4 lg:mt-16 flex-wrap"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.3, duration: 0.8 },
            },
          }}
        >
          {/* Lender Cards */}
          {[
            {
              src: HomeTrust,
              label: "Private Lender",
              value: "private",
              bgColor: "#FE621D",
              buttonClasses:
                "!bg-white !text-gray-800 hover:!text-white hover:!bg-[#266ace]",
            },
            {
              src: FinancialLP,
              label: "Direct Lender",
              value: "direct lender",
              bgColor: "white",
              buttonClasses: "!bg-gray-800 !text-white hover:!bg-[#FE621D]",
            },
          ].map((lender, index) => (
            <motion.a
              key={index}
              className={cn(
                "lender-hero-cta flex flex-col items-center gap-2 lg:gap-4 p-4 py-4 lg:py-6 rounded-xl shadow-lg cursor-pointer",
                lender.value === "private" && "border border-red-950"
              )}
              style={{ backgroundColor: lender.bgColor }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={`/lenders/search?lenderType=${lender.value}`}
            >
              <Image
                src={lender.src}
                alt={lender.label}
                className="lender-hero-cta-image w-28 h-28 lg:w-40 lg:h-40 rounded-lg object-contain border border-white p-1 lg:p-3"
              />
              {/* <span className="uppercase text-sm lg:text-base bg-black/20 text-white py-2 px-6 rounded-full">
                {lender.label}
              </span> */}
              <CtaButton
                classes={` ${lender.buttonClasses} !p-3 lg:!p-6 !text-sm lg:!text-base !font-bold `}
                text={`Find a ${lender.label}`}
                href={`/lenders/search?lenderType=${lender.value}`}
              />
            </motion.a>
          ))}
        </motion.div>

        {/* LenderHomeSelect with animated fade-in */}
        <motion.div
          className="w-full mt-8 lg:mt-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <LenderHomeSelect />
        </motion.div>
      </div>
    </section>
  );
};

export default OurOffersSection;
