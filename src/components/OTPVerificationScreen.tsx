"use client";
import { cn } from "@/app/utils/";
import React, { useRef, ChangeEvent } from "react";
import { motion } from "framer-motion";
import { LiaUnlockAltSolid } from "react-icons/lia";
import { Button, Input } from "antd";

const OTPVerificationScreen: React.FC = () => {
  // Array of refs for each OTP input
  const inputRefs = Array(6)
    .fill(0)
    .map(() => useRef<any>(null));

  // Handle input changes and focus logic
  const handleInputChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;

    // Move to next input if a number is entered
    if (value.length === 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current?.focus();
    }
    // Move to previous input on backspace
    else if (value.length === 0 && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  return (
    <main className="flex flex-col items-center justify-center p-8">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={cn(
          "capitalize py-4 px-10 lg:px-16 text-white text-xl lg:text-2xl font-bold rounded-2xl shadow-lg",
          "bg-gradient-to-r from-pink-600 to-orange-500 lg:min-w-[500px] min-w-72"
        )}
      >
        Verify OTP
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="rounded-3xl bg-white w-full max-w-lg p-10 lg:p-14 mt-8 flex flex-col items-center shadow-2xl border border-gray-300"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex items-center justify-center w-28 h-28 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full shadow-lg"
        >
          <LiaUnlockAltSolid
            style={{ transform: "rotateY(180deg)" }}
            className="w-20 h-20 text-white"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-2xl font-semibold mt-8 mb-10 text-gray-700"
        >
          Enter OTP Code
        </motion.p>

        {/* Styled OTP Input */}
        <div className="flex space-x-3 mb-8">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <Input
                key={i}
                maxLength={1}
                ref={inputRefs[i]}
                onChange={(e) => handleInputChange(i, e)}
                className="text-center text-2xl font-bold w-14 h-14 bg-gray-100 rounded-lg border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md transition-all duration-150 ease-in-out"
                style={{ transition: "all 0.2s" }}
              />
            ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="w-full mt-6"
        >
          <Button
            size="large"
            type="primary"
            className="w-full uppercase bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-full shadow-lg hover:opacity-90 hover:shadow-xl transform transition-all duration-200 ease-out"
            shape="round"
          >
            Verify Code
          </Button>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8 text-gray-500 hover:text-gray-700 font-semibold border-b border-transparent hover:border-gray-500 transition-colors duration-200"
        >
          Resend Code
        </motion.button>
      </motion.div>
    </main>
  );
};

export default OTPVerificationScreen;
