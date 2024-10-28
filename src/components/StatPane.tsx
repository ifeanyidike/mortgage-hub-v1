import Image from "next/image";
import React, { ReactNode } from "react";
import Figure1 from "@/app/assets/icons/Figures-icon-1.svg";
import Figure2 from "@/app/assets/icons/Figures-icon-2.svg";
import Figure3 from "@/app/assets/icons/Figures-icon-3.svg";

const StatPane = () => {
  return (
    <div className="bg-[#21334C] flex p-32 justify-between max-lg:flex-col max-lg:items-center max-lg:justify-center max-lg:text-center gap-8 max-lg:gap-16">
      <StatDetail
        icon={<Image src={Figure3} alt="" />}
        stat="205k+"
        info="Families Assisted"
      />
      <div className="max-lg:hidden w-[0.5px] h-48 mt-16 bg-white"></div>

      <StatDetail
        icon={<Image src={Figure2} alt="" />}
        stat="700+"
        info="Mortgage Experts"
      />
      <div className="max-lg:hidden w-[0.5px] h-48 mt-16 bg-white"></div>

      <StatDetail
        icon={<Image src={Figure1} alt="" />}
        stat="Thousands"
        info="Lenders Available"
      />
    </div>
  );
};

type Props = {
  icon: ReactNode;
  stat: string;
  info: string;
};
const StatDetail = (props: Props) => {
  const { icon, stat, info } = props;
  return (
    <div className="flex flex-col gap-4 text-white jusitfy-center items-center">
      {icon}
      <h5 className="font-bold text-5xl">{stat}</h5>
      <span className="text-xl font-medium">{info}</span>
    </div>
  );
};

export default StatPane;
