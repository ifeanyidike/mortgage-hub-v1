import { DownOutlined } from "@ant-design/icons";
import React from "react";
import BlogDiscussion from "@/app/assets/Images/blog-discussion.png";
import Image from "next/image";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

const BlogHighlights = () => {
  return (
    <div className="w-full px-24 max-2xl:px-8">
      <div className="font-semibold text-3xl">
        LEBIS IUR{" "}
        <span className="text-[#3EBA97] border-b-4 border-[#3EBA97]">
          SEQUASSITIN <DownOutlined />
        </span>
      </div>
      {/* w-full flex mt-4 gap-24 max-lg:flex-col max-2xl:gap-8 max-lg:gap-16  max-md:gap-8 max-lg:max-h-max max-h-[800px] */}
      <div className="w-full flex flex-col mt-4 gap-8 lg:flex-row lg:ga-16 2xl:gap-24 2xl:h-[800px]">
        {/* max-h-[800px] max-md:max-h-[700px] */}
        <div className="w-full 1-5xl:w-1/2 relative overflow-hidden">
          <Image
            src={BlogDiscussion}
            alt="Debis iu aute qui de debis iur sequassitin prerum es que que"
            className="!w-full h-full rounded-xl aspect-square"
          />
          <div className="absolute bottom-10 left-5 text-white ">
            <p className="font-semibold text-xl">
              Debis iu aute qui de debis iur sequassitin prerum es que que
            </p>
            <Link href="#" className="flex items-center gap-2 text-sm">
              Read more <BsArrowRight />
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-4 max-lg:gap-4 items-center max-lg:items-stretch justify-center ">
          <ItemPane
            title="lorem"
            text="Agnatem aute qui de debis iur sequassitin prerum es que que et re neseque ?"
            time="5 min"
          />
          <ItemPane
            title="lorem"
            text="Agnatem aute qui de debis iur sequassitin prerum es que que et re neseque ?"
            time="5 min"
            hasShadow
          />
          <ItemPane
            title="lorem"
            text="Agnatem aute qui de debis iur sequassitin prerum es que que et re neseque ?"
            time="5 min"
          />
        </div>
      </div>
    </div>
  );
};

export default BlogHighlights;

type Props = {
  title: string;
  text: string;
  time: string;
  hasShadow?: boolean;
};
const ItemPane = (props: Props) => {
  const { title, text, time, hasShadow = false } = props;
  return (
    <div
      className={`flex flex-col h-[30%] px-8 box-border gap-4 border border-gray-200 rounded-xl justify-center max-xl:py-4 max-lg:py-16 max-md:py-4 ${
        hasShadow &&
        "shadow-[rgba(0,0,15,0.2)_4px_5px_4px_0px] border border-[rgba(0,0,15,0.2)]"
      }`}
    >
      <small className="uppercase text-gray-600">{title}</small>
      <p className="font-semibold">{text}</p>
      <small>{time} read</small>
    </div>
  );
};
