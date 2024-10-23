import Image from "next/image";
import React from "react";
import Heart from "@/app/assets/emojis/heart.svg";

type Props = {
  color: string;
  hasHeart?: boolean;
  hasHappy?: boolean;
  hasShadow?: boolean;
  text: string;
  time: string;
};

const HomeChatBubble = (props: Props) => {
  const {
    color,
    text,
    time,
    hasHappy = false,
    hasHeart = true,
    hasShadow = false,
  } = props;
  return (
    <div
      className={`bubble-small ${hasShadow && "shadow-md"}`}
      style={{
        color,
        boxShadow: hasShadow ? "5px 10px 15px rgba(0, 0, 0, 0.3)" : "",
      }}
    >
      <p className="text-black text-[22px] font-medium">{text}</p>
      <small
        className={`${
          color.toLowerCase() === "#ffffff" ? "text-black" : "text-white"
        } absolute bottom-1 text-[14px] font-medium right-6`}
      >
        {time}
      </small>
      {hasHappy && (
        <div className="absolute -top-7 right-11 rounded-full flex gap-2 text-6xl">
          <span>😀</span>
          <span>😀</span>
        </div>
      )}
      {hasHeart && (
        <div className="absolute rounded-full bg-white p-1">
          <Image src={Heart} alt="" />
        </div>
      )}
    </div>
  );
};

export default HomeChatBubble;
