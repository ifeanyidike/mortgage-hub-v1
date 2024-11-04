"use client";
import React from "react";
import HomeCarousel from "./HomeCarousel";
import { motion } from "framer-motion";
import { Button } from "antd";
import CtaButton from "./CtaButton";
import { cn } from "@/app/utils";

const HomeCarouselSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={cn(
        "max-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex flex-col gap-8 py-12 px-4 lg:py-24 overflow-hidden",
        "rounded-none lg:rounded-[100px] lg:rounded-tl-none lg:rounded-br-none"
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="text-center flex flex-col items-center gap-4 lg:gap-8 px-4"
      >
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
          Mortgage Hub - Making Your Journey Effortless
        </h2>
        <p className="uppercase text-lg md:text-xl text-gray-600">
          Explore a range of mortgage options tailored to your financial goals
        </p>
        <CtaButton
          classes="!bg-gray-800 !text-white hover:!bg-[#266ace]"
          text="Get Started"
          href="/broker"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="flex justify-center mt-4 w-[90%] mx-auto lg:px-8"
      >
        <HomeCarousel />
      </motion.div>
    </motion.section>
  );
};

export default HomeCarouselSection;

// "use client";
// import React from "react";
// import HomeCarousel from "./HomeCarousel";
// import { Button } from "antd";
// import CtaButton from "./CtaButton";
// import { motion } from "framer-motion";

// const HomeCarouselSection = () => {
//   return (
//     <motion.section
//       initial={{ opacity: 0, x: -50 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ duration: 0.8, ease: "easeOut" }}
//       className="max-h-screen lg:pt-12 pb-8 pt-16 flex flex-col gap-16 overflow-hidden"
//     >
//       <div className="flex flex-col justify-center items-center text-center gap-4">
//         <h2 className="text-4xl max-md:text-3xl max-sm:text-2xl">
//           Designed to Make Your Mortgage Journey Easy
//         </h2>
//         <div>
//           <p className="uppercase text-lg max-md:text-base max-sm:text-xs">
//             Designed to Make Your Mortgage Journey Easy
//           </p>
//           <small>
//             Explore a range of mortgage options tailored to your financial
//             goals.
//           </small>
//         </div>
//         <CtaButton
//           classes="!bg-gray-800 !text-white hover:!bg-[#266ace]"
//           text="Get Started"
//           href="/broker"
//         />
//       </div>
//       <div className="w-full flex flex-col justify-center items-center text-center mx-auto overflow-hidden">
//         <HomeCarousel />
//       </div>
//     </motion.section>
//   );
// };

// export default HomeCarouselSection;
