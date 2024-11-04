// import React, { ReactNode } from "react";
// import Tools1 from "@/app/assets/icons/Tools-icon-1.svg";
// import Tools2 from "@/app/assets/icons/Tools-icon-2.svg";
// import Tools3 from "@/app/assets/icons/Tools-icon-3.svg";
// import Tools4 from "@/app/assets/icons/Tools-icon-4.svg";
// import Tools5 from "@/app/assets/icons/Tools-icon-5.svg";
// import Tools6 from "@/app/assets/icons/Tools-icon-6.svg";
// import NiceWithGlass from "@/app/assets/Images/nice-with-glass.png";
// import Calculator from "@/app/assets/icons/Calculator.svg";
// import Image from "next/image";

// const ToolsHighlight = () => {
//   return (
//     <div className="flex py-16 px-40 max-2xl:px-8 max-2xl:gap-8 max-lg:px-24 max-xl:flex-col bg-[#21334C] text-white gap-16 items-center">
//       <div className="flex flex-col w-3/5 gap-8 max-xl:w-full max-xl:items-center  max-lg:gap-14">
//         <h3 className="text-6xl max-lg:text-5xl max-md:text-4xl max-sm:text-3xl font-semibold mb-4">
//           Tools For All Your Needs
//         </h3>
//         <div className="flex max-lg:flex-col gap-8 max-lg:gap-14">
//           <ToolsPane
//             icon={<Image src={Tools6} alt="" className="-ml-16" />}
//             text="Consolidate Debt Calculator"
//           />
//           <ToolsPane
//             icon={<Image src={Tools3} alt="" className="-ml-16" />}
//             text="Affordability Calculator"
//           />
//         </div>
//         <div className="flex max-lg:flex-col gap-8  max-lg:gap-14">
//           <ToolsPane
//             icon={<Image src={Tools5} alt="" className="-ml-16" />}
//             text="Property Analyzer"
//           />
//           <ToolsPane
//             icon={<Image src={Tools2} alt="" className="-ml-16" />}
//             text="Mortgage Calculator"
//           />
//         </div>
//         <div className="flex max-lg:flex-col gap-8  max-lg:gap-14">
//           <ToolsPane
//             icon={<Image src={Tools4} alt="" className="-ml-16" />}
//             text="Investment Estimator"
//           />
//           <ToolsPane
//             icon={<Image src={Tools1} alt="" className="-ml-16" />}
//             text="Quick Rate Finder"
//           />
//         </div>
//       </div>
//       <div className="ml-auto max-xl:mx-auto max-lg:hidden -mt-14 relative">
//         <Image src={NiceWithGlass} alt="" className="w-[450px] max-xl:w-full" />
//         <div className="bg-white absolute text-black pl-6 pr-8 py-6 rounded-full flex items-center gap-4 -bottom-8 -left-8">
//           <span className="bg-[#3EBA97] p-1 w-16 h-16 rounded-full flex items-center justify-center">
//             <Image src={Calculator} alt="" className="w-16 h-16" />
//           </span>
//           <div className="flex flex-col">
//             <p className="uppercase font-bold text-3xl">Hilla Tempo</p>
//             <span>Quadarest latimia</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// type Props = {
//   icon: ReactNode;
//   text: string;
// };
// const ToolsPane = (props: Props) => {
//   const { icon, text } = props;

//   return (
//     <div className="rounded-xl flex gap-4 h-24  w-80 md:w-96 lg:w-[450px]  px-10 items-center bg-[#3185FC]">
//       {icon}
//       <span className="font-medium text-xl -ml-8">{text}</span>
//     </div>
//   );
// };

// export default ToolsHighlight;

"use client";
// Import statements
import React, { ReactNode, FC } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Tools1 from "@/app/assets/icons/Tools-icon-1.svg";
import Tools2 from "@/app/assets/icons/Tools-icon-2.svg";
import Tools3 from "@/app/assets/icons/Tools-icon-3.svg";
import Tools4 from "@/app/assets/icons/Tools-icon-4.svg";
import Tools5 from "@/app/assets/icons/Tools-icon-5.svg";
import Tools6 from "@/app/assets/icons/Tools-icon-6.svg";
import NiceWithGlass from "@/app/assets/Images/nice-with-glass.png";
import Calculator from "@/app/assets/icons/Calculator.svg";
import { cn } from "@/app/utils";

type ToolsPaneProps = {
  icon: ReactNode;
  text: string;
};

const ToolsPane: FC<ToolsPaneProps> = ({ icon, text }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    whileHover={{ scale: 1.05 }}
    className="rounded-xl flex gap-4 h-20 w-72 xs:w-80 px-10 items-center bg-[#3185FC] shadow-lg transform transition-all"
  >
    {icon}
    <span className="font-bold text-sm md:text-base -ml-8 text-white">
      {text}
    </span>
  </motion.div>
);

const ToolsHighlight: FC = () => (
  <div
    className={cn(
      "flex flex-col lg:flex-row py-10 md:py-20 px-16 gap-16 lg:gap-28 items-center bg-[#21334C] text-white",
      "rounded-none lg:rounded-[100px] lg:rounded-tl-none lg:rounded-br-none overflow-hidden"
    )}
  >
    {/* Text and Tool Sections */}
    <motion.div
      className="flex flex-col w-full lg:w-3/5 gap-8 lg:gap-10 items-center lg:items-start"
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h3 className="text-3xl lg:text-4xl font-semibold text-center lg:text-left mb-4">
        Tools For All Your Needs
      </h3>

      {/* Tool Rows */}
      <div className="space-y-4 md:space-y-8">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <ToolsPane
            icon={<Image src={Tools6} alt="" className="-ml-16 w-32" />}
            text="Consolidate Debt Calculator"
          />
          <ToolsPane
            icon={<Image src={Tools3} alt="" className="-ml-16 w-32" />}
            text="Affordability Calculator"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <ToolsPane
            icon={<Image src={Tools5} alt="" className="-ml-16 w-32" />}
            text="Property Analyzer"
          />
          <ToolsPane
            icon={<Image src={Tools2} alt="" className="-ml-16 w-32" />}
            text="Mortgage Calculator"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          <ToolsPane
            icon={<Image src={Tools4} alt="" className="-ml-16 w-32" />}
            text="Investment Estimator"
          />
          <ToolsPane
            icon={<Image src={Tools1} alt="" className="-ml-16 w-32" />}
            text="Quick Rate Finder"
          />
        </div>
      </div>
    </motion.div>

    {/* Featured Image with Floating Info */}
    <motion.div
      className="relative w-full max-w-xs mb-4 md:mb-0 lg:w-auto -mt-36 md:-mt-14"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Image
        src={NiceWithGlass}
        alt="Feature Image"
        className="rounded-lg shadow-lg"
      />

      {/* Floating Info Card */}
      <motion.div
        className="absolute bg-white text-black py-2 px-6 rounded-full flex items-center gap-4 -bottom-8 -left-8 shadow-lg"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <span className="bg-[#3EBA97] p-1 w-12 h-12 rounded-full flex items-center justify-center shadow-md">
          <Image src={Calculator} alt="Calculator Icon" className="w-10 h-10" />
        </span>
        <div>
          <p className="uppercase font-bold text-xl">Hilla Tempo</p>
          <span className="text-sm">Quadarest latimia</span>
        </div>
      </motion.div>
    </motion.div>
  </div>
);

export default ToolsHighlight;
