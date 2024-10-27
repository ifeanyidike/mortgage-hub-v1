import React from "react";
import SmilingWithPhone from "@/app/assets/Images/smilling-with-phone.png";
import Image from "next/image";

const FurtherStat = () => {
  return (
    <div className="flex py-16 px-40 max-2xl:px-8 max-2xl:gap-8 max-lg:px-24 max-md:px-4 max-lg:flex-col items-center">
      <div className="w-1/2 max-h-[800px] max-lg:w-full">
        <Image
          src={SmilingWithPhone}
          alt=""
          className="h-full w-auto mx-auto"
        />
      </div>
      <div className="w-1/2 flex flex-col max-lg:w-full">
        <h3 className="text-3xl font-semibold text-left max-sm:text-2xl">
          Ad situem felored invicto ad ipsum alores dores sit ateum braclilius
        </h3>
        <div className="flex max-lg:flex-col justify-around max-lg:justify-start max-lg:gap-8 items-center max-lg:items-start mt-20">
          <StatPane
            stat="30+"
            text="Lorem ipsum dolor"
            color="border-[#3EBA97]"
          />
          <StatPane
            stat="42+"
            text="Lorem ipsum dolor"
            color="border-[#3185FC]"
          />
        </div>
        <div className="flex justify-center max-lg:mt-8 max-lg:justify-start">
          <StatPane
            stat="64"
            text="Lorem ipsum dolor"
            color="border-[#82A6BF]"
          />
        </div>
      </div>
    </div>
  );
};

type Props = {
  stat: string;
  text: string;
  color: string;
};
const StatPane = (props: Props) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 max-lg:gap-8 max-lg:flex-row">
      <div
        className={`rounded-full w-44 h-44 max-md:w-28 max-sm:h-28 aspect-square border ${props.color} font-bold flex items-center justify-center text-6xl max-md:text-3xl`}
      >
        {props.stat}
      </div>
      <p className="text-xl max-md:text-base">{props.text}</p>
    </div>
  );
};

export default FurtherStat;
