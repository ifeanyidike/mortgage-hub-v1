"use client";
import React from "react";
import Image from "next/image";
import HeroDesktop from "@/app/assets/Images/hero-transparent.png"; // Replace with the actual image import
import { motion } from "framer-motion";
import HomeChatBubble from "@/components/HomeChatBubble";
import CtaButton from "./CtaButton";

export default function HomeHeroSection() {
  return (
    <section
      style={{ maxHeight: "calc(100vh - 80px)" }}
      className="w-full overflow-clip lg:overflow-visible  relative flex flex-col lg:flex-row items-center gap-10 pt-0 pb-0 p-8 lg:pr-0 lg:pt-4 "
    >
      {/* Hero Image Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative  w-full max-w-[500px] flex justify-center order-2 lg:order-1 lg:justify-start self-start"
      >
        <Image
          src={HeroDesktop}
          alt="hero image"
          className="rounded-lg"
          style={{ transform: "rotateY(180deg)" }}
          width={600}
          height={400}
        />

        {/* Circular Frame */}
        <div className="absolute top-4 left-4 lg:top-10 lg:left-12 w-80 h-80 lg:w-[500px] lg:h-[500px] border-2 border-white rounded-full pointer-events-none"></div>

        {/* Chat Bubbles */}

        <div className="absolute top-40 -right-10 lg:top-80 lg:-right-48 flex flex-col space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="ml-0"
          >
            <HomeChatBubble
              text="You are approved for Home"
              color="#3EBA97"
              time="09:37"
              hasHeart={true}
              hasShadow={true}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="ml-20"
          >
            <HomeChatBubble
              text="Mom, I got approved!"
              color="#3185FC"
              time="09:38"
              hasHeart={true}
              hasHappy={true}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="ml-10"
          >
            <HomeChatBubble
              text="WOW! You weren't kidding about AI"
              color="#FFFFFF"
              time="09:40"
              hasHeart={false}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Text Content Section lg:self-start lg:mt-28 */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="order-1 lg:order-2 lg:w-1/2 w-full ml-auto text-left flex flex-col justify-center lg:pl-24"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-800 mb-4">
          Mortgage Hub Makes Home Possible
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-xl">
          Discover personalized mortgage solutions and financial tools designed
          to make homeownership more accessible.
        </p>

        <CtaButton
          classes="!mt-10 !bg-gray-800 !text-white hover:!bg-[#266ace]"
          text="Find a Broker"
          href="/brokers"
        />
      </motion.div>
    </section>
  );
}
