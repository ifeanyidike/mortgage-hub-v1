import { Button } from "antd";
import React, { ReactNode } from "react";
import HappyReadingAI from "@/app/assets/Images/happy-reading-ai.png";
import Image, { StaticImageData } from "next/image";
import MortgageAssistance from "@/app/assets/icons/Mortgage_assistance_WHITE.svg";
import CreditScore from "@/app/assets/icons/CreditScore.svg";
import { BsPatchCheck } from "react-icons/bs";

const HomeAIPane = () => {
  return (
    <div className="flex items-center justify-between py-32 px-32 max-xl:px-16 max-lg:flex-col-reverse max-lg:px-8">
      <div className="flex flex-col gap-8 items-center max-xl:max-w-80 justify-center mr-auto max-xl:mx-auto max-lg:mt-8 max-lg:max-w-[90%]">
        <h4 className="text-4xl">Mortgage Hub AI Hooks You Up</h4>
        <p className="text-xl">
          Find out about $50,000 Down Payment Assistant.
        </p>
        <Button
          type="primary"
          shape="round"
          size="middle"
          className="uppercase text-white w-40 mx-auto"
        >
          Lorem Ipsum
        </Button>
      </div>
      <div className="w-1/2 max-w-[600px] max-sm:max-w-[400px] max-lg:w-full relative">
        <Image
          src={HappyReadingAI}
          alt=""
          className="max-sm:max-w-80 max-sm:mx-auto"
        />
        <div className="absolute -top-8 -left-40 max-sm:-left-8 max-lg:-left-20 max-md:-left-14">
          <FloatingPane
            text="Down Payment Assistance"
            color="bg-[#3EBA97]"
            icon={
              <Image
                src={MortgageAssistance}
                alt=""
                className="h-12 w-12 max-sm:h-6 max-sm:w-6 aspect-square rounded-full"
              />
            }
          />
        </div>
        <div className="absolute bottom-7 -left-20 max-sm:-left-4 max-lg:-left-14 max-md:-left-10">
          <FloatingPane
            text="Term Extensions"
            color="bg-[#82A6BF]"
            width="1/2"
            icon={
              <Image
                src={CreditScore}
                alt=""
                className="h-12 w-12 max-sm:h-6 max-sm:w-6 aspect-square rounded-full"
              />
            }
          />
        </div>
        <div className="absolute top-8 -right-20 max-sm:-right-4 max-lg:-right-14 max-md:-right-10">
          <FloatingPane
            text="Free Counselling"
            color="bg-[#FE621D]"
            icon={
              <BsPatchCheck className="h-12 w-12 max-sm:h-6 max-sm:w-6 aspect-square rounded-full text-white" />
            }
          />
        </div>
      </div>
    </div>
  );
};

export default HomeAIPane;

type Props = {
  color: string;
  icon?: ReactNode;
  text: string;
  width?: string;
};
const FloatingPane = (props: Props) => {
  const { color, icon, text, width = "w-3/5" } = props;
  return (
    <div className="flex items-center justify-center rounded-full h-24 max-lg:h-20 max-md:h-16 max-sm:h-12 bg-black box-border min-w-72 max-sm:min-w-40 max-lg:min-w-56">
      <div
        className={`${color} ml-5 rounded-full h-16 p-2 max-sm:p-1 max-sm:h-8 max-sm:w-8 max-lg:h-12 max-lg:w-12 max-md:h-10 max-md:w-10 flex items-center max-sm:ml-1`}
      >
        {icon}
      </div>
      <p
        className={`text-white  ml-4 box-border font-semibold w-3/5 max-sm:text-xs max-sm:ml-2`}
      >
        {text}
      </p>
    </div>
  );
};
