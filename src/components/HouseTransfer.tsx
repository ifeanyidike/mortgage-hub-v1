import { Button } from "antd";
import Image from "next/image";
import React from "react";
import House1 from "@/app/assets/Images/House1.png";
import House2 from "@/app/assets/Images/House2.png";
import House3 from "@/app/assets/Images/House3.png";

import House1Mobile from "@/app/assets/Images/house1_mobile.png";
import House2Mobile from "@/app/assets/Images/house2_mobile.png";
import House3Mobile from "@/app/assets/Images/house3_mobile.png";
import CurvedArrowUp from "@/app/assets/Images/arrow1.png";
import CurvedArrowDown from "@/app/assets/Images/arrow2.png";

const HouseTransfer = () => {
  return (
    <div className="px-8 lg:px-32 py-16 text-center flex flex-col items-center justify-center gap-12 bg-[#3185FC] text-white">
      <div className="flex gap-4 flex-col">
        <h3 className="text-5xl">Mortgage Solutions Tailored for You</h3>
        <p className="uppercase text-xl">Find the Right Loan, Every Time</p>
        <small className="text-base">
          Are you looking for a mortgage that aligns with your unique needs?
        </small>
        <Button
          type="primary"
          shape="round"
          size="middle"
          className="uppercase !bg-black text-white w-40 mx-auto !text-lg !py-2 !font-semibold"
        >
          Read More
        </Button>
      </div>

      <div className="flex items-center">
        <Image
          src={House1}
          alt=""
          className="hidden lg:flex max-h-80 max-w-72 max-xl:max-h-64 max-xl:max-w-60 max-lg:max-h-44 max-lg:max-w-32 max-md:max-h-28 max-md:max-w-20"
        />
        <Image
          src={House1Mobile}
          alt=""
          className="flex lg:hidden max-h-80 max-w-72 max-xl:max-h-64 max-xl:max-w-60 max-lg:max-h-44 max-lg:max-w-32 max-md:max-h-28 max-md:max-w-20"
        />
        <Image
          src={CurvedArrowDown}
          alt=""
          className="max-h-36 max-md:max-h-8 max-md:max-w-20"
        />
        <Image
          src={House2}
          alt=""
          className="hidden lg:flex max-w-[450px] max-h-[550px] max-xl:max-h-80 max-xl:max-w-72 max-lg:max-h-60 max-lg:max-w-52 max-md:max-h-44 max-md:max-w-36 "
        />
        <Image
          src={House2Mobile}
          alt=""
          className="flex lg:hidden max-w-[450px] max-h-[550px] max-xl:max-h-80 max-xl:max-w-72 max-lg:max-h-60 max-lg:max-w-52 max-md:max-h-44 max-md:max-w-36 "
        />
        <Image
          src={CurvedArrowUp}
          alt=""
          className="max-h-44 max-md:max-h-8 max-md:max-w-20 self-start"
        />
        <Image
          src={House3}
          alt=""
          className="hidden lg:flex max-w-[400px] max-h-[500px] max-xl:max-h-72 max-xl:max-w-64 max-lg:max-h-52 max-lg:max-w-44 max-md:max-h-36 max-md:max-w-28"
        />
        <Image
          src={House3Mobile}
          alt=""
          className="flex lg:hidden max-w-[400px] max-h-[500px] max-xl:max-h-72 max-xl:max-w-64 max-lg:max-h-52 max-lg:max-w-44 max-md:max-h-36 max-md:max-w-28"
        />
      </div>
      <p className="text-xl mt-8 min-w-80 max-w-[900px]  font-medium ">
        With a wide range of flexible options, we make it easy to find the
        perfect mortgage. Whether you’re a first-time buyer, upgrading, or
        refinancing, our team has you covered with expert advice and unmatched
        support.
      </p>
    </div>
  );
};

export default HouseTransfer;
