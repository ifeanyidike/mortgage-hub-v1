"use client";
import Image from "next/image";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import Figure1 from "@/app/assets/icons/Figures-icon-1.svg";
import Figure2 from "@/app/assets/icons/Figures-icon-2.svg";
import Figure3 from "@/app/assets/icons/Figures-icon-3.svg";
import { Statistic, StatisticProps } from "antd";
import CountUp from "react-countup";

const formatter: StatisticProps["formatter"] = (value) => (
  <CountUp
    className="!text-white !font-[family-name:var(--font-montserrat)]"
    end={value as number}
    separator=","
  />
);

const StatPane = () => {
  return (
    <div className="max-h-screen bg-[#21334C] pt-8 pb-16 lg:py-16 flex justify-around items-center text-center gap-2 lg:flex-row lg:gap-8 flex-col">
      <StatDetail
        icon={<Image src={Figure3} alt="Families Assisted Icon" />}
        stat={
          <Statistic
            className="!text-white"
            value={2000}
            formatter={formatter}
          />
        }
        info="Lenders"
      />

      <motion.div className="hidden lg:block w-[1px] h-48 bg-gray-300"></motion.div>

      <StatDetail
        icon={<Image src={Figure2} alt="Mortgage Experts Icon" />}
        stat={
          <Statistic
            className="!text-white"
            value={50000}
            formatter={formatter}
          />
        }
        info="Brokers"
      />

      <motion.div className="hidden lg:block w-[1px] h-48 bg-gray-300"></motion.div>

      <StatDetail
        icon={<Image src={Figure1} alt="Lenders Available Icon" />}
        stat="Millions served"
        info=""
      />
    </div>
  );
};

type Props = {
  icon: ReactNode;
  stat: ReactNode;
  info: string;
};

const StatDetail = (props: Props) => {
  const { icon, stat, info } = props;
  return (
    <motion.div
      className="flex flex-col items-center text-white gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {icon}
      </motion.div>
      <h5 className="text-2xl font-bold">{stat}</h5>
      <span className="text-base font-medium text-gray-300">{info}</span>
    </motion.div>
  );
};

export default StatPane;
