// "use client";
// import React, { useEffect, useState } from "react";
// import { Button, Carousel } from "antd";
// import Image, { StaticImageData } from "next/image";
// import FatherChild from "@/app/assets/Images/father-child.png";
// import LadyCouple from "@/app/assets/Images/lady-couple.png";
// import HappyMan from "@/app/assets/Images/happy.png";

// const contentStyle: React.CSSProperties = {
//   height: "160px",
//   color: "#fff",
//   lineHeight: "160px",
//   textAlign: "center",
//   background: "#364d79",
// };

// const HomeCarousel: React.FC = () => {
//   const [screen, setScreen] = useState<"lg" | "md" | "sm" | "xs">("xs");

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth > 1028) {
//         setScreen("lg");
//       } else if (window.innerWidth > 768) {
//         setScreen("md");
//       } else if (window.innerWidth > 430) {
//         setScreen("sm");
//       } else {
//         setScreen("xs");
//       }
//     };

//     handleResize(); // Initial check
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const getCarouselSettings = () => {
//     if (screen === "xs" || screen === "sm") {
//       return { maxWidth: "380px", slidesToShow: 1 };
//     } else if (screen === "md") {
//       return { maxWidth: "868px", slidesToShow: 2 };
//     } else {
//       return { maxWidth: "1500px", slidesToShow: 3 };
//     }
//   };

//   const { maxWidth, slidesToShow } = getCarouselSettings();

//   return (
//     <div
//       className="carousel-container"
//       style={{
//         maxWidth,
//         margin: "0 auto", // Center carousel
//       }}
//     >
//       <Carousel
//         className="custom-home-carousel"
//         autoplay
//         dots
//         slidesToShow={slidesToShow}
//         slidesToScroll={1}
//       >
//         <HomeCarouselItem img={FatherChild} caption="Single parents" />
//         <HomeCarouselItem img={LadyCouple} caption="Same sex couples" />
//         <HomeCarouselItem img={HappyMan} caption="Single persons" />
//       </Carousel>
//     </div>
//   );
// };
// export default HomeCarousel;

// type ItemProps = {
//   img: StaticImageData;
//   caption: string;
// };
// export const HomeCarouselItem = (props: ItemProps) => {
//   return (
//     <div className="flex flex-col h-[500px] max-sm:h-[400px] !mr-8">
//       <div className="h-96 w-96 max-sm:h-80 max-sm:w-80 relative object-cover rounded-full aspect-square p-1 border border-gray-200">
//         <Image
//           src={props.img}
//           alt=""
//           className="w-full h-full rounded-full aspect-square"
//         />
//       </div>
//       <p className="text-lg font-medium drop-shadow-md">{props.caption}</p>
//       <Button
//         type="primary"
//         shape="round"
//         size="small"
//         className="uppercase !bg-black text-white w-40 mx-auto"
//       >
//         Read More
//       </Button>
//     </div>
//   );
// };

"use client";
import React, { useEffect, useState } from "react";
import { Button, Carousel } from "antd";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import FatherChild from "@/app/assets/Images/father-child.png";
import LadyCouple from "@/app/assets/Images/lady-couple.png";
import HappyMan from "@/app/assets/Images/happy.png";
import CtaButton from "./CtaButton";

const HomeCarousel: React.FC = () => {
  const [screen, setScreen] = useState<"lg" | "md" | "sm" | "xs">("xs");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1028) setScreen("lg");
      else if (window.innerWidth > 768) setScreen("md");
      else if (window.innerWidth > 430) setScreen("sm");
      else setScreen("xs");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getCarouselSettings = () => {
    if (screen === "xs" || screen === "sm")
      return { maxWidth: "380px", slidesToShow: 1 };
    if (screen === "md") return { maxWidth: "868px", slidesToShow: 2 };
    return { maxWidth: "1100px", slidesToShow: 3 };
  };

  const { maxWidth, slidesToShow } = getCarouselSettings();

  return (
    <div
      className="carousel-container  custom-carousel mx-auto"
      style={{ maxWidth }}
    >
      <Carousel autoplay dots slidesToShow={slidesToShow} slidesToScroll={1}>
        <HomeCarouselItem img={FatherChild} caption="Single parents" />
        <HomeCarouselItem img={LadyCouple} caption="Same sex couples" />
        <HomeCarouselItem img={HappyMan} caption="Single persons" />
      </Carousel>
    </div>
  );
};

export default HomeCarousel;

type ItemProps = {
  img: StaticImageData;
  caption: string;
};

const HomeCarouselItem: React.FC<ItemProps> = ({ img, caption }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="flex flex-col items-center gap-4 md:h-[400px] h-[350px] mb-4"
    >
      <div className="relative h-72 w-72 max-sm:h-64 max-sm:w-64 rounded-full overflow-hidden border-4 border-gray-300 shadow-md">
        <Image src={img} alt={caption} layout="fill" objectFit="cover" />
      </div>

      <CtaButton
        classes="!bg-white !text-white hover:!bg-[#266ace]  !uppercase !py-1 !shadow-md  !hover:bg-gray-700 !text-gray-800 !text-sm hover:!text-white"
        text="Learn more"
        href="/broker"
      />
    </motion.div>
  );
};
