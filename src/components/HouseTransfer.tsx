// import { Button } from "antd";
// import Image from "next/image";
// import React from "react";
// import House1 from "@/app/assets/Images/House1.png";
// import House2 from "@/app/assets/Images/House2.png";
// import House3 from "@/app/assets/Images/House3.png";

// import House1Mobile from "@/app/assets/Images/house1_mobile.png";
// import House2Mobile from "@/app/assets/Images/house2_mobile.png";
// import House3Mobile from "@/app/assets/Images/house3_mobile.png";
// import CurvedArrowUp from "@/app/assets/Images/arrow1.png";
// import CurvedArrowDown from "@/app/assets/Images/arrow2.png";

// const HouseTransfer = () => {
//   return (
//     <div className="px-8 lg:px-32 py-16 text-center flex flex-col items-center justify-center gap-12 bg-[#3185FC] text-white">
//       <div className="flex gap-4 flex-col">
//         <h3 className="text-5xl">Mortgage Solutions Tailored for You</h3>
//         <p className="uppercase text-xl">Find the Right Loan, Every Time</p>
//         <small className="text-base">
//           Are you looking for a mortgage that aligns with your unique needs?
//         </small>
//         <Button
//           type="primary"
//           shape="round"
//           size="middle"
//           className="uppercase !bg-black text-white w-40 mx-auto !text-lg !py-2 !font-semibold"
//         >
//           Read More
//         </Button>
//       </div>

//       <div className="flex items-center">
//         <Image
//           src={House1}
//           alt=""
//           className="hidden lg:flex max-h-80 max-w-72 max-xl:max-h-64 max-xl:max-w-60 max-lg:max-h-44 max-lg:max-w-32 max-md:max-h-28 max-md:max-w-20"
//         />
//         <Image
//           src={House1Mobile}
//           alt=""
//           className="flex lg:hidden max-h-80 max-w-72 max-xl:max-h-64 max-xl:max-w-60 max-lg:max-h-44 max-lg:max-w-32 max-md:max-h-28 max-md:max-w-20"
//         />
//         <Image
//           src={CurvedArrowDown}
//           alt=""
//           className="max-h-36 max-md:max-h-8 max-md:max-w-20"
//         />
//         <Image
//           src={House2}
//           alt=""
//           className="hidden lg:flex max-w-[450px] max-h-[550px] max-xl:max-h-80 max-xl:max-w-72 max-lg:max-h-60 max-lg:max-w-52 max-md:max-h-44 max-md:max-w-36 "
//         />
//         <Image
//           src={House2Mobile}
//           alt=""
//           className="flex lg:hidden max-w-[450px] max-h-[550px] max-xl:max-h-80 max-xl:max-w-72 max-lg:max-h-60 max-lg:max-w-52 max-md:max-h-44 max-md:max-w-36 "
//         />
//         <Image
//           src={CurvedArrowUp}
//           alt=""
//           className="max-h-44 max-md:max-h-8 max-md:max-w-20 self-start"
//         />
//         <Image
//           src={House3}
//           alt=""
//           className="hidden lg:flex max-w-[400px] max-h-[500px] max-xl:max-h-72 max-xl:max-w-64 max-lg:max-h-52 max-lg:max-w-44 max-md:max-h-36 max-md:max-w-28"
//         />
//         <Image
//           src={House3Mobile}
//           alt=""
//           className="flex lg:hidden max-w-[400px] max-h-[500px] max-xl:max-h-72 max-xl:max-w-64 max-lg:max-h-52 max-lg:max-w-44 max-md:max-h-36 max-md:max-w-28"
//         />
//       </div>
//       <p className="text-xl mt-8 min-w-80 max-w-[900px]  font-medium ">
//         With a wide range of flexible options, we make it easy to find the
//         perfect mortgage. Whether you’re a first-time buyer, upgrading, or
//         refinancing, our team has you covered with expert advice and unmatched
//         support.
//       </p>
//     </div>
//   );
// };

// export default HouseTransfer;

"use client";
import { Button } from "antd";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

// Image imports
import House1 from "@/app/assets/Images/House1.png";
import House2 from "@/app/assets/Images/House2.png";
import House3 from "@/app/assets/Images/House3.png";
import House1Mobile from "@/app/assets/Images/house1_mobile.png";
import House2Mobile from "@/app/assets/Images/house2_mobile.png";
import House3Mobile from "@/app/assets/Images/house3_mobile.png";
import CurvedArrowUp from "@/app/assets/Images/arrow1.png";
import CurvedArrowDown from "@/app/assets/Images/arrow2.png";
import CtaButton from "./CtaButton";
import { cn } from "@/app/utils";

const HouseTransfer = () => {
  return (
    <section
      className={cn(
        "max-h-screen px-8 py-16 bg-gradient-to-r from-[#3177FC] to-[#35A7FD] text-white",
        "rounded-none lg:rounded-[100px] lg:rounded-tr-none lg:rounded-bl-none"
      )}
    >
      {/* Header Section */}
      <div className="text-center flex flex-col items-center gap-6">
        <motion.h3
          className="text-3xl font-bold"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Mortgage Solutions Tailored for You
        </motion.h3>

        <motion.p
          className="uppercase text-lg lg:text-xl tracking-wide font-semibold"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Find the Right Loan, Every Time
        </motion.p>

        <motion.small
          className="text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Are you looking for a mortgage that aligns with your unique needs?
        </motion.small>

        <CtaButton
          classes=" !bg-gray-800 !text-white hover:!bg-[#266ace]"
          text="Learn more"
          href="/brokers"
        />
      </div>

      {/* Image Gallery with Arrows */}
      <div className="flex justify-between lg:justify-center gap-6 items-center mt-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <Image
            src={House1}
            alt="House 1"
            className="hidden lg:flex rounded-lg"
            style={{ maxWidth: "100px", maxHeight: "150px" }}
          />
          <Image
            src={House1Mobile}
            alt="House 1 Mobile"
            className="flex lg:hidden rounded-lg"
            style={{ maxWidth: "100px", maxHeight: "150px" }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="lg:max-h-36 lg:max-w-40 max-h-10 max-w-10"
          // className="lg:max-w-max lg:max-h-24 md:static max-h-20 max-w-40 top-0 "
        >
          <Image src={CurvedArrowDown} alt="Arrow Down" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Image
            src={House2}
            alt="House 2"
            className="hidden lg:flex rounded-lg"
            style={{ maxWidth: "150px", maxHeight: "250px" }}
          />
          <Image
            src={House2Mobile}
            alt="House 2 Mobile"
            className="flex lg:hidden rounded-lg "
            style={{ maxWidth: "150px", maxHeight: "250px" }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="max-h-36 max-w-40"
        >
          <Image src={CurvedArrowUp} alt="Arrow Up" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Image
            src={House3}
            alt="House 3"
            className="hidden lg:flex rounded-lg"
            style={{ maxWidth: "100px", maxHeight: "150px" }}
          />
          <Image
            src={House3Mobile}
            alt="House 3 Mobile"
            className="flex lg:hidden rounded-lg"
            style={{ maxWidth: "100px", maxHeight: "150px" }}
          />
        </motion.div>
      </div>

      {/* Description Text */}
      <motion.p
        className="text-base lg:text-lg mt-8 max-w-[700px] mx-auto font-medium text-center leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        Find the perfect mortgage with flexible options and expert support for
        buying, upgrading, or refinancing.
      </motion.p>
    </section>
  );
};

export default HouseTransfer;
