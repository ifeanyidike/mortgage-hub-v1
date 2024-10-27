import React, { ReactNode } from "react";
import LenderIcon1 from "@/app/assets/icons/Select_Lender-icon-1.svg";
import LenderIcon2 from "@/app/assets/icons/Select_Lender-icon-2.svg";
import LenderIcon3 from "@/app/assets/icons/Select_Lender-icon-3.svg";
import LenderIcon4 from "@/app/assets/icons/Select_Lender-icon-4.svg";
import LenderIcon5 from "@/app/assets/icons/Select_Lender-icon-5.svg";
import LenderIcon6 from "@/app/assets/icons/Select_Lender-icon-6.svg";
import Image from "next/image";

const SelectLender = () => {
  return (
    <div className="bg-[#3185FC] px-36 py-16 max-lg:px-16 max-md:px-8 max-sm:px-4">
      <h4 className="text-white text-6xl text-center mb-16 max-sm:text-4xl">
        Select a Lender of your choice
      </h4>
      <div className="grid grid-cols-3 max-xl:grid-cols-2 gap-32 max-lg:gap-8 max-md:gap-4 max-sm:gap-2">
        <Pane
          icon={<Image src={LenderIcon1} alt="" className="w-80" />}
          text="Credit Unions"
        />
        <Pane
          icon={<Image src={LenderIcon2} alt="" className="w-80" />}
          text="Commercial Banks"
        />
        <Pane
          icon={<Image src={LenderIcon3} alt="" className="w-80" />}
          text="Mortgage Banks"
        />
        <Pane
          icon={<Image src={LenderIcon4} alt="" className="w-80" />}
          text="Peer-to-Peer"
        />
        <Pane
          icon={<Image src={LenderIcon5} alt="" className="w-80" />}
          text="Online Lenders"
        />
        <Pane
          icon={<Image src={LenderIcon6} alt="" className="w-80" />}
          text="Direct Lenders"
        />
      </div>
    </div>
  );
};

type Props = {
  icon: ReactNode;
  text: string;
};
const Pane = (props: Props) => {
  const { icon, text } = props;
  return (
    <div className="rounded-xl bg-white p-8 flex items-center justify-center flex-col max-lg:p-2">
      {icon}
      <p className="text-3xl font-semibold max-lg:text-2xl max-md:text-xl max-sm:text-base text-center">
        {text}
      </p>
    </div>
  );
};

export default SelectLender;
