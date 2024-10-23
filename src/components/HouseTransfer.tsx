import { Button } from "antd";
import Image from "next/image";
import React from "react";
import House1 from "@/app/assets/Images/House1_transparent.png";
import House2 from "@/app/assets/Images/House2_transparent.png";
import House3 from "@/app/assets/Images/House3_transparent.png";
import CurvedArrowUp from "@/app/assets/Images/curved_arrow_up.png";
import CurvedArrowDown from "@/app/assets/Images/curved_arrow_down.png";

const HouseTransfer = () => {
  return (
    <div className="px-32 py-16 max-xl:px-8 text-center flex flex-col items-center justify-center gap-12 bg-[#3185FC] text-white">
      <div className="flex gap-4 flex-col">
        <h3 className="text-5xl">Lateum Sit Ad Lorem Ipsum</h3>
        <p className="uppercase text-xl">
          AGNATEM AUTE QUI DE DEBIS IUR SEQUASSITIN
        </p>
        <small className="text-base">Prerum es que que et re neseque ?</small>
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
          className="max-h-80 max-w-72 max-xl:max-h-64 max-xl:max-w-60 max-lg:max-h-44 max-lg:max-w-32 max-md:max-h-28 max-md:max-w-20"
        />
        <Image
          src={CurvedArrowDown}
          alt=""
          className="max-h-36 max-md:max-h-8 max-md:max-w-20"
        />
        <Image
          src={House2}
          alt=""
          className="max-w-[450px] max-h-[550px] max-xl:max-h-80 max-xl:max-w-72 max-lg:max-h-60 max-lg:max-w-52 max-md:max-h-44 max-md:max-w-36 "
        />
        <Image
          src={CurvedArrowUp}
          alt=""
          className="max-h-44 max-md:max-h-8 max-md:max-w-20 self-start"
        />
        <Image
          src={House3}
          alt=""
          className="max-w-[400px] max-h-[500px] max-xl:max-h-72 max-xl:max-w-64 max-lg:max-h-52 max-lg:max-w-44 max-md:max-h-36 max-md:max-w-28"
        />
      </div>
      <p className="text-xl mt-8 min-w-80 max-w-[700px]  font-medium ">
        Lupti occatus, simeniatur re quis reptiatur AGnatem aute qui de
        debissimeniatur re quis reptiatur AGnatem aute qui de debis
      </p>
    </div>
  );
};

export default HouseTransfer;
