import React, { ReactNode } from "react";
import Tools1 from "@/app/assets/icons/Tools-icon-1.svg";
import Tools2 from "@/app/assets/icons/Tools-icon-2.svg";
import Tools3 from "@/app/assets/icons/Tools-icon-3.svg";
import Tools4 from "@/app/assets/icons/Tools-icon-4.svg";
import Tools5 from "@/app/assets/icons/Tools-icon-5.svg";
import Tools6 from "@/app/assets/icons/Tools-icon-6.svg";
import NiceWithGlass from "@/app/assets/Images/nice-with-glass.png";
import Calculator from "@/app/assets/icons/Calculator.svg";
import Image from "next/image";

const ToolsHighlight = () => {
  return (
    <div className="flex py-16 px-40 max-2xl:px-8 max-2xl:gap-8 max-lg:px-24 max-xl:flex-col bg-[#21334C] text-white gap-16 items-center">
      <div className="flex flex-col w-3/5 gap-8 max-xl:w-full max-xl:items-center  max-lg:gap-14">
        <h3 className="text-6xl max-lg:text-5xl max-md:text-4xl max-sm:text-3xl font-semibold mb-4">
          Tools For All Your Needs
        </h3>
        <div className="flex max-lg:flex-col gap-8 max-lg:gap-14">
          <ToolsPane
            icon={<Image src={Tools6} alt="" className="-ml-16" />}
            text="Con Eumquatur"
          />
          <ToolsPane
            icon={<Image src={Tools3} alt="" className="-ml-16" />}
            text="Ellorerum Hilla"
          />
        </div>
        <div className="flex max-lg:flex-col gap-8  max-lg:gap-14">
          <ToolsPane
            icon={<Image src={Tools5} alt="" className="-ml-16" />}
            text="Pro muatur"
          />
          <ToolsPane
            icon={<Image src={Tools2} alt="" className="-ml-16" />}
            text="Eate molupta"
          />
        </div>
        <div className="flex max-lg:flex-col gap-8  max-lg:gap-14">
          <ToolsPane
            icon={<Image src={Tools4} alt="" className="-ml-16" />}
            text="Invellorer Hilla"
          />
          <ToolsPane
            icon={<Image src={Tools1} alt="" className="-ml-16" />}
            text="Quis Eate lupta"
          />
        </div>
      </div>
      <div className="ml-auto max-xl:mx-auto max-lg:hidden -mt-14 relative">
        <Image src={NiceWithGlass} alt="" className="w-[450px] max-xl:w-full" />
        <div className="bg-white absolute text-black pl-6 pr-8 py-6 rounded-full flex items-center gap-4 -bottom-8 -left-8">
          <span className="bg-[#3EBA97] p-1 w-16 h-16 rounded-full flex items-center justify-center">
            <Image src={Calculator} alt="" className="w-16 h-16" />
          </span>
          <div className="flex flex-col">
            <p className="uppercase font-bold text-3xl">Hilla Tempo</p>
            <span>Quadarest latimia</span>
          </div>
        </div>
      </div>
    </div>
  );
};

type Props = {
  icon: ReactNode;
  text: string;
};
const ToolsPane = (props: Props) => {
  const { icon, text } = props;

  return (
    <div className="rounded-xl flex gap-4 h-24   min-w-96 max-lg:w-full max-lg:min-w-[600px] max-sm:min-w-96 px-10 items-center bg-[#3185FC]">
      {icon}
      <span className="font-medium text-xl -ml-8">{text}</span>
    </div>
  );
};

export default ToolsHighlight;
