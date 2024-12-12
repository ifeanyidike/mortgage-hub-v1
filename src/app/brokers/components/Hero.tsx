"use client";
import React from "react";
import { motion } from "framer-motion";
import SmilingBeautyBlack from "@/app/assets/Images/smiling-beauty-black.png";
import SmilingHappy from "@/app/assets/Images/smiling-happy.png";
import SmilingCellphone from "@/app/assets/Images/smiling-with-cellphone.png";
import SmilingTeacup from "@/app/assets/Images/smiling-with-teacup.png";
import SmilingGlasses from "@/app/assets/Images/smiling-with-glasses.png";
import { StaticImageData } from "next/image";
import Image from "next/image";
import BrokersHomeSelect from "./BrokersHomeSelect";
import { cn } from "@/app/utils/";

const Hero = () => {
  return (
    <div
      className={cn(
        "w-full lg:max-h-screen  bg-[url('/assets/images/brokers-background.png')]",
        "bg-center bg-cover bg-no-repeat bg-gray-150 px-8 flex flex-col overflow-hidden relative"
      )}
    >
      <motion.h2
        className="text-4xl text-black text-center pt-0 lg:pt-8 tracking-wider font-bold"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Find A Broker On Your Vibe
      </motion.h2>

      {/* Images Container */}
      <div className="flex justify-center items-center gap-8 mt-8 relative w-full h-[500px]">
        <ImageComponent
          src={SmilingBeautyBlack}
          text="LUXURY & CLASS"
          color="text-white"
          bg="bg-[#006B78]"
          textPos={{ x: "-right-32", y: "top-0" }}
          pos={{ x: "lg:left-0 left-[5%]", y: "lg:top-[5%] top-[64%]" }}
        />
        <ImageComponent
          src={SmilingTeacup}
          text="CHILLED & RELAXED"
          color="text-black"
          bg="bg-[#ADBDFF]"
          textPos={{ x: "-left-28 lg:-left-40", y: "top-[40%]" }}
          pos={{
            x: "lg:right-0 left-[25%] lg:left-auto",
            y: "top-0",
          }}
        />
        <ImageComponent
          src={SmilingGlasses}
          text="HIP & COOL"
          color="text-white"
          bg="bg-[#3185FC]"
          textPos={{ x: "-left-16", y: "bottom-0" }}
          pos={{ x: "right-0 lg:left-[10%]", y: "top-[72%] lg:top-[50%]" }}
        />
        <ImageComponent
          src={SmilingHappy}
          text="SPEAKS FARSI OR CANTONESE"
          color="text-white"
          bg="bg-[#3EBA97]"
          textPos={{ x: "-left-40", y: "-top-6" }}
          pos={{ x: "lg:left-[42%] left-[38%]", y: "lg:top-[40%] top-[36%]" }}
        />
        <ImageComponent
          src={SmilingCellphone}
          text="VIBING"
          color="text-white"
          bg="bg-[#ADBDFF]"
          textPos={{ x: "-right-5", y: "top-0" }}
          pos={{ x: "lg:right-0 right-[3%]", y: "lg:top-[50%] top-[10%]" }}
        />
      </div>

      <BrokersHomeSelect />
    </div>
  );
};

type Props = {
  src: StaticImageData;
  text: string;
  color: string;
  bg: string;
  textPos: Record<"x" | "y", string>;
  pos: Record<"x" | "y", string>;
};

const ImageComponent = ({ src, text, color, bg, textPos, pos }: Props) => {
  return (
    <motion.div
      className={`absolute ${pos.x} ${pos.y} w-32 h-32 lg:w-56 lg:h-56 left-`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
        delay: Math.random() * 0.3, // adds a staggered effect
      }}
    >
      <Image
        className="rounded-full w-full h-full aspect-square object-cover shadow-lg"
        src={src}
        alt={text}
        placeholder="blur"
      />
      <motion.div
        className={`absolute ${textPos.x} ${textPos.y} shadow-md border border-[rgba(0,0,15,0.2)] text-center text-sm lg:text-base ${color} ${bg} w-fit py-2 px-3 whitespace-nowrap rounded-full`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {text}
      </motion.div>
    </motion.div>
  );
};

export default Hero;
