import Image from "next/image";
import React from "react";
import CustomerService from "@/app/assets/Images/customer-service.png";
import { Button } from "antd";
import ChatIcon from "@/app/assets/Images/chat-icon.png";

const CustomerServicePane = () => {
  return (
    <div className="bg-gray-200 flex items-center justify-between py-32 px-32 max-xl:px-16 max-lg:flex-col max-lg:px-8 gap-20 max-xl:gap-4">
      <div className="w-1/2 max-w-[600px] max-lg:w-full relative max-2xl:max-w-[800px]">
        <Image src={CustomerService} alt="" />
      </div>
      <div className="flex flex-col gap-8 items-left max-xl:max-w-80 justify-start ml-auto max-xl:mx-auto max-lg:mt-8 max-lg:max-w-[90%]">
        <div className="border-t-8 border-[#FE621D] pt-2 text-2xl max-w-96">
          Need to speak with someone?
        </div>
        <h3 className="text-6xl">Contact Us</h3>
        <p>
          Lupti occatus, simeniatur re quis reptiatur agnatem aute qui de debis
          iur sequassitin prerum es que
        </p>
        <button className="flex w-fit uppercase text-white gap-4 items-center !bg-[#21334C] !py-2 px-8 rounded-full">
          <Image
            src={ChatIcon}
            alt=""
            className="w-8 h-8 p-1 rounded-full bg-[#3EBA97]"
          />
          <p>Chat with us</p>
        </button>
      </div>
    </div>
  );
};

export default CustomerServicePane;
