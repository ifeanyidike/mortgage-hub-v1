"use client";
import { Button } from "antd";
import Image from "next/image";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import HappyReadingAI from "@/app/assets/Images/happy-reading-ai.png";
import MortgageAssistance from "@/app/assets/icons/Mortgage_assistance_WHITE.svg";
import CreditScore from "@/app/assets/icons/CreditScore.svg";
import { BsPatchCheck } from "react-icons/bs";
import CtaButton from "./CtaButton";

const HomeAIPane = () => {
  return (
    <div className="flex items-center pt-24 pb-12 lg:pt-32 lg:pb-24 px-8 lg:px-16 flex-col-reverse lg:flex-row gap-8 justify-center lg:gap-48">
      <div className="flex flex-col gap-8 items-center max-w-lg justify-center text-center max-lg:mt-8 lg:max-w-[400px]">
        <h4 className="text-3xl font-bold text-left">
          Mortgage Hub AI Hooks You Up
        </h4>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-base hidden lg:block text-left"
        >
          Discover valuable insights on how you could qualify for up to $50,000
          in Down Payment Assistance. Take the first step toward affordable
          homeownership with guidance tailored to help you unlock this
          opportunity!
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="lg:hidden text-base text-left"
        >
          Discover how our $50,000 Down Payment Assistance can make your dream
          home a reality.
        </motion.p>
        <CtaButton
          classes="!bg-gray-800 !text-white hover:!bg-[#266ace]"
          text="Learn more"
          href="/broker"
        />
      </div>

      {/* Right Section with Image and Floating Buttons */}
      <div className="w-1/2 max-w-[400px] relative flex items-center justify-center max-lg:w-full">
        <Image
          src={HappyReadingAI}
          alt="AI Assistance"
          className="w-full max-sm:max-w-80"
        />

        {/* Floating Buttons */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="absolute -top-8 -left-24 max-sm:-left-4"
        >
          <FloatingPane
            text="Down Payment Assistance"
            color="bg-[#3EBA97]"
            icon={
              <Image
                src={MortgageAssistance}
                alt=""
                className="h-10 w-10 max-sm:h-6 max-sm:w-6"
              />
            }
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="absolute bottom-0 -left-24 max-sm:bottom-0 max-sm:-left-4"
        >
          <FloatingPane
            text="Term Extensions"
            color="bg-[#82A6BF]"
            icon={
              <Image
                src={CreditScore}
                alt=""
                className="h-10 w-10 max-sm:h-6 max-sm:w-6"
              />
            }
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="absolute top-36 -right-10 max-sm:top-28 max-sm:-right-6"
        >
          <FloatingPane
            text="Free Counselling"
            color="bg-[#FE621D]"
            icon={
              <BsPatchCheck className="h-10 w-10 max-sm:h-6 max-sm:w-6 text-white" />
            }
          />
        </motion.div>
      </div>
    </div>
  );
};

export default HomeAIPane;

type Props = {
  color: string;
  icon?: ReactNode;
  text: string;
};
const FloatingPane = ({ color, icon, text }: Props) => (
  <div className="flex items-center justify-start rounded-full h-16 max-sm:h-12 bg-black px-4 shadow-lg">
    <div
      className={`flex items-center justify-center rounded-full ${color} p-2 mr-3`}
    >
      {icon}
    </div>
    <p className="text-white font-semibold max-sm:text-xs">{text}</p>
  </div>
);
