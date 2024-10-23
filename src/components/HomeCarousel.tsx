import React from "react";
import { Button, Carousel } from "antd";
import Image, { StaticImageData } from "next/image";
import FatherChild from "@/app/assets/Images/father-child.png";
import LadyCouple from "@/app/assets/Images/lady-couple.png";
import HappyMan from "@/app/assets/Images/happy.png";

const contentStyle: React.CSSProperties = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const HomeCarousel: React.FC = () => (
  <Carousel style={{ width: "100% !important" }} autoplay dots>
    <div className="!flex gap-20 max-xl:gap-10 justify-center ">
      <HomeCarouselItem img={FatherChild} caption="Single parents" />
      <HomeCarouselItem img={LadyCouple} caption="Same sex couples" />
      <HomeCarouselItem img={HappyMan} caption="Single persons" />
    </div>
  </Carousel>
);

export default HomeCarousel;

type ItemProps = {
  img: StaticImageData;
  caption: string;
};
export const HomeCarouselItem = (props: ItemProps) => {
  return (
    <div className="flex flex-col h-[500px]">
      <div className="h-96 w-96 relative object-cover rounded-full aspect-square p-1 border border-gray-200">
        <Image
          src={props.img}
          alt=""
          className="w-full h-full rounded-full aspect-square"
        />
      </div>
      <p className="text-lg font-medium drop-shadow-md">{props.caption}</p>
      <Button
        type="primary"
        shape="round"
        size="small"
        className="uppercase !bg-black text-white w-40 mx-auto"
      >
        Read More
      </Button>
    </div>
  );
};
