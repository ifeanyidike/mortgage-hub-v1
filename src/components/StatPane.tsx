// import Image from "next/image";
// import React, { ReactNode } from "react";
// import Figure1 from "@/app/assets/icons/Figures-icon-1.svg";
// import Figure2 from "@/app/assets/icons/Figures-icon-2.svg";
// import Figure3 from "@/app/assets/icons/Figures-icon-3.svg";

// const StatPane = () => {
//   return (
//     <div className="max-h-screen bg-[#21334C] flex py-8 lg:py-32 justify-between max-lg:flex-col max-lg:items-center max-lg:justify-center max-lg:text-center gap-8 max-lg:gap-16">
//       <StatDetail
//         icon={<Image src={Figure3} alt="" />}
//         stat="205k+"
//         info="Families Assisted"
//       />
//       <div className="max-lg:hidden w-[0.5px] h-48 mt-16 bg-white"></div>

//       <StatDetail
//         icon={<Image src={Figure2} alt="" />}
//         stat="700+"
//         info="Mortgage Experts"
//       />
//       <div className="max-lg:hidden w-[0.5px] h-48 mt-16 bg-white"></div>

//       <StatDetail
//         icon={<Image src={Figure1} alt="" />}
//         stat="Thousands"
//         info="Lenders Available"
//       />
//     </div>
//   );
// };

// type Props = {
//   icon: ReactNode;
//   stat: string;
//   info: string;
// };
// const StatDetail = (props: Props) => {
//   const { icon, stat, info } = props;
//   return (
//     <div className="flex flex-col gap-4 text-white jusitfy-center items-center">
//       {icon}
//       <h5 className="font-bold text-5xl">{stat}</h5>
//       <span className="text-xl font-medium">{info}</span>
//     </div>
//   );
// };

// export default StatPane;

"use client";
import Image from "next/image";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import Figure1 from "@/app/assets/icons/Figures-icon-1.svg";
import Figure2 from "@/app/assets/icons/Figures-icon-2.svg";
import Figure3 from "@/app/assets/icons/Figures-icon-3.svg";

const StatPane = () => {
  return (
    <div className="max-h-screen bg-[#21334C] pt-0 pb-8 lg:py-16 flex justify-around items-center text-center gap-2 lg:flex-row lg:gap-8 flex-col">
      <StatDetail
        icon={<Image src={Figure3} alt="Families Assisted Icon" />}
        stat="205k+"
        info="Families Assisted"
      />

      <motion.div className="hidden lg:block w-[1px] h-48 bg-gray-300"></motion.div>

      <StatDetail
        icon={<Image src={Figure2} alt="Mortgage Experts Icon" />}
        stat="700+"
        info="Mortgage Experts"
      />

      <motion.div className="hidden lg:block w-[1px] h-48 bg-gray-300"></motion.div>

      <StatDetail
        icon={<Image src={Figure1} alt="Lenders Available Icon" />}
        stat="Thousands"
        info="Lenders Available"
      />
    </div>
  );
};

type Props = {
  icon: ReactNode;
  stat: string;
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
      <h5 className="text-2xl font-extrabold">{stat}</h5>
      <span className="text-base font-medium text-gray-300">{info}</span>
    </motion.div>
  );
};

export default StatPane;
