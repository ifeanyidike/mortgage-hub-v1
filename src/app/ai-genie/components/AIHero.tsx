"use client";
import { cn } from "@/app/utils/";
import { motion } from "framer-motion";
import Image from "next/image";
import { VscQuote } from "react-icons/vsc";
import AIHomeForm from "./AIHomeForm";
import AIHomeSuccessStory from "./AIHomeSuccessStory";

const AIHero = () => {
  return (
    <motion.div
      className="max-h-screen h-[800px] lg:h-[630px] flex flex-col-reverse lg:flex-row items-center  rounded-lg px-6 py-8  lg:py-24 lg:px-12 w-full overflow-hidden"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Genie Image */}
      <div className="lg:flex-shrink-0 w-full lg:w-1/2 max-md:h-4/5 mb-6 lg:mt-72 ">
        <Image
          src="/assets/images/ai-guy.png" // Replace with actual path
          alt="Genie"
          width={500}
          height={500}
          className=" rounded-lg w-full "
        />
      </div>
      {/* Header Text */}
      <div className="lg:flex-grow text-center lg:text-left lg:ml-8 h-40">
        <motion.h1
          className="text-4xl font-bold text-gray-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          The Mortgage Hub AI Recommender Tool
        </motion.h1>
      </div>
    </motion.div>
  );
};

export default AIHero;
