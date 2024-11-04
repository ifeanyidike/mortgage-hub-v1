"use client";
import React from "react";
import SmilingWithPhone from "@/app/assets/Images/smilling-with-phone.png";
import Image from "next/image";
import { motion } from "framer-motion";

const FurtherStat = () => {
  return (
    <div className="flex py-16 lg:py-24 px-8 max-2xl:px-8 gap-10 lg:gap-20 max-lg:px-24 max-md:px-4 max-lg:flex-col items-center">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-64 lg:max-w-80"
      >
        <Image src={SmilingWithPhone} alt="" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col w-full lg:w-3/5"
      >
        <h3 className="text-2xl font-bold text-[#21334C]">
          Trusted by thousands, with a proven track record in the mortgage
          industry
        </h3>
        <div className="flex max-lg:flex-col justify-around max-lg:justify-start gap-4 lg:gap-0 items-center max-lg:items-start mt-5 lg:mt-10">
          <StatPane
            stat="30+"
            text="Years of Combined Experience"
            color="border-[#3EBA97]"
          />
          <StatPane
            stat="42+"
            text="Mortgage Experts on Our Team"
            color="border-[#3185FC]"
          />
        </div>
        <div className="flex lg:justify-center mt-4 lg:mt-8 justify-start">
          <StatPane
            stat="64"
            text="Exclusive Mortgage Programs"
            color="border-[#82A6BF]"
          />
        </div>
      </motion.div>
    </div>
  );
};

type Props = {
  stat: string;
  text: string;
  color: string;
};
const StatPane = (props: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col justify-center items-center gap-2 max-lg:gap-8 max-lg:flex-row"
    >
      <div
        className={`rounded-full md:w-32 md:h-32 w-24 h-24 aspect-square border ${props.color} font-bold flex items-center justify-center text-4xl max-md:text-3xl`}
      >
        {props.stat}
      </div>
      <p className="text-base">{props.text}</p>
    </motion.div>
  );
};

export default FurtherStat;
