// import { DownOutlined } from "@ant-design/icons";
// import React from "react";
// import BlogDiscussion from "@/app/assets/Images/blog-discussion.png";
// import Image from "next/image";
// import Link from "next/link";
// import { BsArrowRight } from "react-icons/bs";

// const BlogHighlights = () => {
//   return (
//     <div className="w-full px-24 max-2xl:px-8">
//       <div className="uppercase font-semibold text-xl md:2xl lg:text-3xl ">
//         Homebuying Made{" "}
//         <span className="text-[#3EBA97] border-b-4 border-[#3EBA97]">
//           Simple <DownOutlined />
//         </span>
//       </div>
//       {/* w-full flex mt-4 gap-24 max-lg:flex-col max-2xl:gap-8 max-lg:gap-16  max-md:gap-8 max-lg:max-h-max max-h-[800px] */}
//       <div className="w-full flex flex-col mt-4 gap-8 lg:flex-row lg:ga-16 2xl:gap-24 2xl:h-[800px]">
//         {/* max-h-[800px] max-md:max-h-[700px] */}
//         <div className="w-full 1-5xl:w-1/2 relative overflow-hidden">
//           <Image
//             src={BlogDiscussion}
//             alt="Home buying made simple."
//             className="!w-full h-full rounded-xl aspect-square"
//           />
//           <div className="absolute bottom-10 left-5 text-white ">
//             <p className="font-semibold text-xl">
//               Get insights and tips from industry experts.
//             </p>
//             <Link href="#" className="flex items-center gap-2 text-sm">
//               Read more <BsArrowRight />
//             </Link>
//           </div>
//         </div>
//         <div className="flex flex-col gap-4 max-lg:gap-4 max-lg:items-stretch justify-center ">
//           <ItemPane
//             title="5 Tips for First-Time Buyers"
//             text="Explore essential advice for those stepping into homeownership for the first time."
//             time="5 min"
//           />
//           <ItemPane
//             title="Budgeting for a New Home"
//             text="Learn effective budgeting strategies for your home-buying journey."
//             time="5 min"
//             hasShadow
//           />
//           <ItemPane
//             title="Understanding Mortgage Rates"
//             text="Make sense of current rates and how they impact your monthly payments."
//             time="5 min"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogHighlights;

// type Props = {
//   title: string;
//   text: string;
//   time: string;
//   hasShadow?: boolean;
// };
// const ItemPane = (props: Props) => {
//   const { title, text, time, hasShadow = false } = props;
//   return (
//     <div
//       className={`flex flex-col h-[30%] px-8 box-border gap-4 border border-gray-200 rounded-xl justify-center max-xl:py-4 max-lg:py-16 max-md:py-4 ${
//         hasShadow &&
//         "shadow-[rgba(0,0,15,0.2)_4px_5px_4px_0px] border border-[rgba(0,0,15,0.2)]"
//       }`}
//     >
//       <small className="uppercase text-gray-600">{title}</small>
//       <p className="font-semibold hover:text-[##3EBA97]">{text}</p>
//       <small>{time} read</small>
//     </div>
//   );
// };

import { DownOutlined } from "@ant-design/icons";
import React from "react";
import BlogDiscussion from "@/app/assets/Images/blog-discussion.png";
import Image from "next/image";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

const BlogHighlights = () => {
  return (
    <div className="w-full px-8 xl:px-32 max-w-screen-5xl mx-auto">
      <div className="uppercase font-semibold text-xl lg:text-3xl mb-8 text-center lg:text-left">
        Homebuying Made{" "}
        <span className="text-[#3EBA97] border-b-4 border-[#3EBA97]">
          Simple <DownOutlined />
        </span>
      </div>

      {/* Layout grid: left for image and heading, right for list items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Left column with image */}
        <div className="relative overflow-hidden rounded-xl max-h-[450px]">
          <Image
            src={BlogDiscussion}
            alt="Home buying made simple."
            className="w-full h-full object-cover rounded-xl"
          />
          <div className="absolute bottom-6 left-2 mr-3 md:mr-0 md:left-6 text-white bg-black/50 p-4 rounded-lg">
            <p className="font-semibold text-lg lg:text-xl">
              Get insights and tips from industry experts.
            </p>
            <Link href="#" className="flex items-center gap-2 text-sm mt-2">
              Read more <BsArrowRight />
            </Link>
          </div>
        </div>

        {/* Right column with list items */}
        <div className="flex flex-col gap-6 lg:justify-around overflow-y-auto max-h-[550px]">
          <ItemPane
            title="5 Tips for First-Time Buyers"
            text="Explore essential advice for those stepping into homeownership for the first time."
            time="5 min"
          />
          <ItemPane
            title="Budgeting for a New Home"
            text="Learn effective budgeting strategies for your home-buying journey."
            time="5 min"
            hasShadow
          />
          <ItemPane
            title="Understanding Mortgage Rates"
            text="Make sense of current rates and how they impact your monthly payments."
            time="5 min"
          />
          <ItemPane
            title="Understanding Mortgage Rates"
            text="Make sense of current rates and how they impact your monthly payments."
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
      className={`flex flex-col px-8 py-6 lg:py-8 gap-4 border border-gray-200 rounded-xl ${
        hasShadow
          ? "shadow-[rgba(0,0,15,0.2)_4px_5px_4px_0px] border-gray-300"
          : ""
      }`}
    >
      <small className="uppercase text-gray-600">{title}</small>
      <p className="font-semibold hover:text-[#3EBA97]">{text}</p>
      <small className="text-gray-500">{time} read</small>
    </div>
  );
};
