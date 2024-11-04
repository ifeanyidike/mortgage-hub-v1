// import React, { ReactNode } from "react";
// import LenderIcon1 from "@/app/assets/icons/Select_Lender-icon-1.svg";
// import LenderIcon2 from "@/app/assets/icons/Select_Lender-icon-2.svg";
// import LenderIcon3 from "@/app/assets/icons/Select_Lender-icon-3.svg";
// import LenderIcon4 from "@/app/assets/icons/Select_Lender-icon-4.svg";
// import LenderIcon5 from "@/app/assets/icons/Select_Lender-icon-5.svg";
// import LenderIcon6 from "@/app/assets/Images/icon-coin.png";
// import Image from "next/image";
// import {
//   CommercialBankSvg,
//   DirectLenderSvg,
//   MortgageBankSvg,
//   OnlineLenderSvg,
//   PeerToPeerSvg,
// } from "@/app/assets/SvgComponents";

// const SelectLender = () => {
//   return (
//     <div className="bg-[#3185FC] px-36 py-16 max-lg:px-16 max-md:px-8 max-sm:px-4">
//       <h4 className="text-white text-6xl text-center mb-16 max-sm:text-4xl">
//         Select a Lender of your choice
//       </h4>
//       <div className="grid grid-cols-3 max-xl:grid-cols-2 gap-32 max-lg:gap-8 max-md:gap-4 max-sm:gap-2">
//         <Pane icon={<DirectLenderSvg />} text="Direct Lenders" />
//         <Pane icon={<CommercialBankSvg />} text="Commercial Banks" />
//         <Pane icon={<MortgageBankSvg />} text="Mortgage Banks" />
//         <Pane icon={<PeerToPeerSvg />} text="Peer-to-Peer" />
//         <Pane icon={<OnlineLenderSvg />} text="Online Lenders" />
//         <Pane
//           icon={<Image src={LenderIcon6} alt="" className="w-20 " />}
//           text="Credit Unions"
//         />
//       </div>
//     </div>
//   );
// };

// type Props = {
//   icon: ReactNode;
//   text: string;
// };
// const Pane = (props: Props) => {
//   const { icon, text } = props;
//   return (
//     <div className="rounded-xl bg-white p-8 flex items-center justify-between flex-col gap-4 lg:gap-0 h-40 lg:h-80 pt-8 lg:pt-28">
//       <div className="flex">{icon}</div>
//       <p className="text-3xl font-semibold max-lg:text-2xl max-md:text-xl max-sm:text-base text-center">
//         {text}
//       </p>
//     </div>
//   );
// };

// export default SelectLender;

"use client";
import React, { ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import LenderIcon6 from "@/app/assets/Images/icon-coin.png";
import {
  CommercialBankSvg,
  DirectLenderSvg,
  MortgageBankSvg,
  OnlineLenderSvg,
  PeerToPeerSvg,
} from "@/app/assets/SvgComponents";
import CtaButton from "./CtaButton";

const SelectLender = () => {
  return (
    <div className="bg-[#3185FC] px-20 py-12 lg:py-16 max-lg:px-16 max-md:px-8 max-sm:px-4">
      <h4 className="text-white text-3xl text-center mb-8 font-semibold">
        Select a Lender of Your Choice
      </h4>
      <div className="grid grid-cols-3 max-xl:grid-cols-2 gap-4 lg:gap-8  max-w-4xl mx-auto">
        <Pane icon={<DirectLenderSvg />} text="Direct Lenders" />
        <Pane icon={<CommercialBankSvg />} text="Commercial Banks" />
        <Pane icon={<MortgageBankSvg />} text="Mortgage Banks" />
        <Pane icon={<PeerToPeerSvg />} text="Peer-to-Peer" />
        <Pane icon={<OnlineLenderSvg />} text="Online Lenders" />
        <Pane
          icon={
            <Image
              src={LenderIcon6}
              alt="Credit Unions Icon"
              className="w-10 h-10"
            />
          }
          text="Credit Unions"
        />
      </div>
      <CtaButton
        classes="!mt-8 !bg-white !text-black hover:!bg-black"
        text="Find a lender"
        href="/lenders"
      />
    </div>
  );
};

type Props = {
  icon: ReactNode;
  text: string;
};
const Pane = (props: Props) => {
  const { icon, text } = props;
  return (
    <motion.div
      className="rounded-xl bg-white p-8 flex items-center justify-center flex-col gap-4 shadow-lg transform transition-all hover:scale-105"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.05, boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)" }}
    >
      <motion.div
        className="flex justify-center items-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {icon}
      </motion.div>
      <p className="text-base font-semibold text-center text-gray-800 max-lg:text-xl max-md:text-lg max-sm:text-base">
        {text}
      </p>
    </motion.div>
  );
};

export default SelectLender;
