// import React from "react";
// import GroupMeeting from "@/app/assets/Images/group-meeting.png";
// import Image from "next/image";
// import { Button } from "antd";
// import { CheckOutlined } from "@ant-design/icons";
// import { FaCheck } from "react-icons/fa";

// const NewImmigrantHighlight = () => {
//   return (
//     <div className="px-32 py-16 flex max-xl:px-8 max-xl:flex-col justify-center max-2xl:justify-between max-2xl:px-16 items-center max-xl:gap-16">
//       <div className="w-1/2 max-xl:w-full">
//         <Image
//           src={GroupMeeting}
//           alt=""
//           className="max-w-[500px] max-xl:max-w-[800px] max-lg:max-w-[500px] max-sm:max-w-[350px] max-xl:mx-auto"
//         />
//       </div>
//       <div className="flex flex-col gap-8 max-lg:items-center max-lg:justify-center">
//         <h4 className="text-4xl font-smeibold text-center">New Immigrants</h4>

//         <ul className="text-2xl flex flex-col items-center gap-4 list-none max-lg:mx-auto">
//           {[
//             "You're a New Immigrant, You Need so Much",
//             "Work on Your Credit Score",
//             "Home Ownership Seminar (Zoom)",
//             "Mortgage Assistance",
//           ].map((text, idx) => (
//             <li
//               key={idx}
//               className="flex items-center justify-start gap-3 w-full max-w-lg"
//             >
//               <FaCheck className="text-primary" /> {/* Check icon */}
//               <span className="text-left">{text}</span>
//             </li>
//           ))}
//         </ul>

//         <Button
//           type="primary"
//           shape="round"
//           size="middle"
//           className="uppercase text-white w-40 mx-auto"
//         >
//           Get Started
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default NewImmigrantHighlight;

"use client";
import React from "react";
import GroupMeeting from "@/app/assets/Images/group-meeting.png";
import Image from "next/image";
import { Button } from "antd";
import { FaCheck } from "react-icons/fa";
import CtaButton from "./CtaButton";

const NewImmigrantHighlight: React.FC = () => {
  return (
    <div className="relative flex justify-center items-center gap-16 lg:gap-32 px-8 py-16 lg:py-32 max-xl:flex-col max-xl:gap-10 shadow-lg rounded-xl overflow-hidden transform transition-all duration-700 hover:scale-105">
      {/* Background Accent */}

      {/* Image Section */}
      <div className="flex justify-center lg:w-1/2 max-xl:w-full animate-fadeInLeft">
        <Image
          src={GroupMeeting}
          alt="Group Meeting"
          className="w-full max-w-[350px] lg:max-w-[400px] max-xl:mx-auto transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Text Content Section */}
      <div className="flex flex-col gap-6 lg:gap-8 items-center lg:items-start text-gray-800 animate-fadeInRight">
        <h4 className="text-3xl font-bold text-center lg:text-left text-gray-800 transition-all duration-500 hover:text-blue-600">
          New Immigrants
        </h4>

        <ul className="space-y-4 text-lg lg:text-2xl flex flex-col items-start lg:items-start">
          {[
            "You're a New Immigrant, and Building a Strong Credit Score is Essential",
            "As a New Immigrant, You'll Need Extensive Support to Strengthen Your Credit Score",
            "Interactive Homeownership Seminar on Zoom for First-Time Buyers and Newcomers",
            "Comprehensive Mortgage Assistance for Homebuyers and Financial Support Seekers",
          ].map((text, idx) => (
            <li
              key={idx}
              className="flex items-center gap-3 max-w-lg text-gray-700 transition-transform duration-300 hover:translate-x-2"
            >
              <FaCheck className="text-gray-600" aria-hidden="true" />
              <span className="text-lg">{text}</span>
            </li>
          ))}
        </ul>

        <CtaButton
          classes="!bg-gray-800 !text-white hover:!bg-[#266ace] !shadow-lg hover:!shadow-xl !transform hover:!scale-105"
          text="Get Started"
          href="/broker"
        />
      </div>
    </div>
  );
};

export default NewImmigrantHighlight;
