import React from "react";
import GroupMeeting from "@/app/assets/Images/group-meeting.png";
import Image from "next/image";
import { Button } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { FaCheck } from "react-icons/fa";

const NewImmigrantHighlight = () => {
  return (
    <div className="px-32 py-16 flex max-xl:px-8 max-xl:flex-col justify-center max-2xl:justify-between max-2xl:px-16 items-center max-xl:gap-16">
      <div className="w-1/2 max-xl:w-full">
        <Image
          src={GroupMeeting}
          alt=""
          className="max-w-[500px] max-xl:max-w-[800px] max-lg:max-w-[500px] max-sm:max-w-[350px] max-xl:mx-auto"
        />
      </div>
      <div className="flex flex-col gap-8 max-lg:items-center max-lg:justify-center">
        <h4 className="text-4xl font-smeibold text-center">New Immigrants</h4>

        <ul className="text-2xl flex flex-col items-center gap-4 list-none max-lg:mx-auto">
          {[
            "You're a New Immigrant, You Need so Much",
            "Work on Your Credit Score",
            "Home Ownership Seminar (Zoom)",
            "Mortgage Assistance",
          ].map((text, idx) => (
            <li
              key={idx}
              className="flex items-center justify-start gap-3 w-full max-w-lg"
            >
              <FaCheck className="text-primary" /> {/* Check icon */}
              <span className="text-left">{text}</span>
            </li>
          ))}
        </ul>

        <Button
          type="primary"
          shape="round"
          size="middle"
          className="uppercase text-white w-40 mx-auto"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default NewImmigrantHighlight;
