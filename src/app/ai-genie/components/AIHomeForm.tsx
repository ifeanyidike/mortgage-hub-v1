"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const AIHomeForm = () => {
  return (
    <motion.div
      className="flex flex-col lg:flex-row items-center bg-[#F2F2F2] rounded-none lg:rounded-[80px] px-6 py-10 lg:p-12 w-full"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Form Instructions and Image */}
      <div className="lg:w-1/2 mb-6 lg:mb-0 flex flex-col items-center">
        <h3 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-1">
          Find the right program for you &gt;
        </h3>
        <Image
          src="/assets/images/ai-guy.png" // Replace with actual path
          alt="Genie with Laptop"
          width={500}
          height={500}
          className="max-h-[800px] rounded-[80px] border border-gray-300 shadow-md"
        />
      </div>

      {/* Form Fields */}
      <div className="w-full lg:w-1/2 lg:pl-8 mt-10 lg:mt-0">
        <form className="space-y-4 flex flex-col gap-6 lg:gap-12">
          <div className="flex flex-col gap-1">
            <label htmlFor="firstname" className="font-bold text-sm">
              First Name
            </label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="First Name"
              className="w-full p-3 border border-gray-300 bg-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="lastname" className="font-bold text-sm">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Last Name"
              name="lastname"
              id="lastname"
              className="w-full p-3 border border-gray-300 bg-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="ipsum" className="font-bold text-sm">
              Ipsum ad acetur
            </label>
            <input
              type="text"
              id="ipsum"
              placeholder="Ipsum ad acetur"
              className="w-full p-3 border border-gray-300 bg-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="citam" className="font-bold text-sm">
              Citam an fonur
            </label>
            <input
              type="text"
              id="citam"
              placeholder="Citam an fonur"
              className="w-full p-3 border border-gray-300 bg-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="getur" className="font-bold text-sm">
              Getur an findum
            </label>
            <input
              type="text"
              id="getur"
              placeholder="Getur an findum"
              className="w-full p-3 border border-gray-300 bg-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <motion.button
            type="submit"
            className="w-40 py-3 text-white bg-blue-600  rounded-3xl font-semibold hover:bg-blue-700 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            SUBMIT
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default AIHomeForm;
