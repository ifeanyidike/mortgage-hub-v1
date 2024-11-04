// import Image from "next/image";
// import React from "react";
// import CustomerService from "@/app/assets/Images/customer-service.png";
// import { Button } from "antd";
// import ChatIcon from "@/app/assets/Images/chat-icon.png";

// const CustomerServicePane = () => {
//   return (
//     <div className="bg-gray-200 flex items-center justify-between py-32 px-32 max-xl:px-16 max-lg:flex-col max-lg:px-8 gap-20 max-xl:gap-4">
//       <div className="w-1/2 max-w-[600px] max-lg:w-full relative max-2xl:max-w-[800px]">
//         <Image src={CustomerService} alt="" />
//       </div>
//       <div className="flex flex-col gap-8 items-left max-xl:max-w-80 justify-start ml-auto max-xl:mx-auto max-lg:mt-8 max-lg:max-w-[90%]">
//         <div className="border-t-8 border-[#FE621D] pt-2 text-2xl max-w-96">
//           Need to speak with someone?
//         </div>
//         <h3 className="text-6xl">Contact Us</h3>
//         <p>
//           Looking for advice? Chat with our AI Genie for tailored mortgage tips!
//         </p>
//         <button className="flex w-fit uppercase text-white gap-4 items-center !bg-[#21334C] !py-2 px-8 rounded-full">
//           <Image
//             src={ChatIcon}
//             alt=""
//             className="w-8 h-8 p-1 rounded-full bg-[#3EBA97]"
//           />
//           <p>Chat with us</p>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CustomerServicePane;

"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import CustomerService from "@/app/assets/Images/customer-service.png";
import ChatIcon from "@/app/assets/Images/chat-icon.png";

const CustomerServicePane = () => {
  return (
    <div className="max-h-screen bg-gray-200 flex items-center justify-center lg:gap-32 py-24 lg:py-32 px-16 max-xl:px-12 max-lg:flex-col max-lg:px-8 gap-16 max-lg:gap-8">
      <motion.div
        className="w-1/2 max-w-[400px] max-lg:w-full relative"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src={CustomerService}
          alt="Customer Service"
          className="rounded-lg"
        />
      </motion.div>

      <motion.div
        className="flex flex-col gap-6 items-start max-w-[500px] text-left max-lg:mt-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="border-t-4 border-[#FE621D] pt-2 text-xl font-semibold text-gray-700">
          Need to speak with someone?
        </div>
        <h3 className="text-3xl font-bold text-[#21334C]">Contact Us</h3>
        <p className="text-gray-600 leading-relaxed">
          Looking for expert advice? Chat with our AI Genie to get personalized
          mortgage guidance right at your fingertips!
        </p>

        <motion.button
          className="flex items-center gap-4 py-3 px-6 bg-[#21334C] text-white rounded-full shadow-md transition-all hover:shadow-lg focus:shadow-lg"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Image
            src={ChatIcon}
            alt="Chat Icon"
            className="w-10 h-10 p-1 rounded-full bg-[#3EBA97]"
          />
          <span className="uppercase font-semibold">Chat with us</span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default CustomerServicePane;
