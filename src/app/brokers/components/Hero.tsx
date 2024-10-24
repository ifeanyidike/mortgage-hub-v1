import React, { ReactNode } from "react";
import SmilingBeautyBlack from "@/app/assets/Images/smiling-beauty-black.png";
import SmilingHappy from "@/app/assets/Images/smiling-happy.png";
import SmilingCellphone from "@/app/assets/Images/smiling-with-cellphone.png";
import SmilingTeacup from "@/app/assets/Images/smiling-with-teacup.png";
import SmilingGlasses from "@/app/assets/Images/smiling-with-glasses.png";
import { StaticImageData } from "next/image";
import Image from "next/image";
import BrokersHomeSelect from "./BrokersHomeSelect";

const Hero = () => {
  return (
    <div
      className="w-full lg:h-[950px] h-[2000px] bg-[url('/assets/images/brokers-background.png')] 
    bg-center bg-cover bg-no-repeat bg-gray-150
    px-32
    max-lg:px-8
    flex flex-col
   "
    >
      <h2 className="text-6xl text-black text-center pt-16">
        Find A Broker On Your Vibe
      </h2>
      <div className="flex justify-center items-center gap-8 mt-8 relative w-full h-[1400px] lg:h-[600px] ">
        <ImageComponent
          src={SmilingBeautyBlack}
          text="LUXURY & CLASS"
          color="text-white"
          bg="bg-[#006B78]"
          textPos={{ x: "-right-32", y: "top-0" }}
          pos={{ x: "lg:left-0 left-[5%]", y: "lg:top-[5%] top-[60%]" }}
        />
        <ImageComponent
          src={SmilingTeacup}
          text="CHILLED & RELAXED"
          color="text-black"
          bg="bg-[#ADBDFF]"
          textPos={{ x: "-left-40", y: "top-[40%]" }}
          pos={{ x: "lg:right-0 right-[18%]", y: "top-0" }}
        />
        <ImageComponent
          src={SmilingGlasses}
          text="HIP & COOL"
          color="text-white"
          bg="bg-[#3185FC]"
          textPos={{ x: "-left-16", y: "bottom-0" }}
          pos={{ x: "left-[40%] lg:left-[10%]", y: "top-[79%] lg:top-[50%]" }}
        />
        <ImageComponent
          src={SmilingHappy}
          text="SPEAKS FARSI OR CANTONESE"
          color="text-white"
          bg="bg-[#3EBA97]"
          textPos={{ x: "-left-40", y: "-top-6" }}
          pos={{ x: "lg:left-[42%] left-[40%]", y: "lg:top-[40%] top-[38%]" }}
        />

        <ImageComponent
          src={SmilingCellphone}
          text="VIBING"
          color="text-white"
          bg="bg-[#ADBDFF]"
          textPos={{ x: "-right-5", y: "top-0" }}
          pos={{ x: "lg:right-0 right-[7%]", y: "lg:top-[50%] top-[19%]" }}
        />
      </div>

      <BrokersHomeSelect />
    </div>
  );
};

type Props = {
  src: StaticImageData;
  text: string;
  color: string;
  bg: string;
  textPos: Record<"x" | "y", string>;
  pos: Record<"x" | "y", string>;
};
const ImageComponent = (props: Props) => {
  const { src, text, color, bg, textPos, pos } = props;
  return (
    <div className={`absolute ${pos.x} ${pos.y}`}>
      <Image
        className="rounded-full w-56 h-56 aspect-square"
        src={src}
        alt={text}
        placeholder="blur"
      />
      <div
        className={`absolute ${textPos.x} ${textPos.y} shadow-[rgba(0,0,15,0.2)_4px_5px_4px_0px] border border-[rgba(0,0,15,0.2)] text-center text-base  ${color} ${bg} w-fit py-4 px-6 whitespace-nowrap rounded-full`}
      >
        {text}
      </div>
    </div>
  );
};

export default Hero;
