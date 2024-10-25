"use client";
import { HeartFilled } from "@ant-design/icons";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import {
  FaHeart,
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
} from "react-icons/fa";
import { GoStarFill } from "react-icons/go";
import { motion, PanInfo, useMotionValue, useSpring } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { profiles } from "./data";
import { useRouter } from "next/navigation";
import Link from "next/link";

const START_INDEX = 1;
const DRAG_THRESHOLD = 550;
const FALLBACK_WIDTH = 509;
const CURSOR_SIZE = 60;

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

export default function ProfileCarousel() {
  const containerRef = useRef<HTMLUListElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const [hoverType, setHoverType] = useState<"prev" | "next" | "click" | null>(
    null
  );
  const [activeSlide, setActiveSlide] = useState(START_INDEX);
  const offsetX = useMotionValue(0);
  const animatedX = useSpring(offsetX, {
    damping: 20,
    stiffness: 150,
  });

  const canScrollPrev = activeSlide > 0;
  const canScrollNext = activeSlide < profiles.length - 1;

  const [isDragging, setIsDragging] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const animatedHoverX = useSpring(mouseX, {
    damping: 20,
    stiffness: 400,
    mass: 0.1,
  });
  const animatedHoverY = useSpring(mouseY, {
    damping: 20,
    stiffness: 400,
    mass: 0.1,
  });

  // Ensures active slide is centered on mobile
  useEffect(() => {
    scrollToActive();
  }, [activeSlide]);

  const scrollToActive = () => {
    if (itemsRef.current[activeSlide]) {
      const activeItem = itemsRef.current[activeSlide];
      if (containerRef.current && activeItem) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const activeRect = activeItem.getBoundingClientRect();
        const scrollOffset =
          activeRect.left -
          containerRect.left -
          containerRect.width / 2 +
          activeRect.width / 2;
        offsetX.set(-scrollOffset);
      }
    }
  };

  function navButtonHover({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const parent = currentTarget.offsetParent;
    if (!parent) return;
    const { left: parentLeft, top: parentTop } = parent.getBoundingClientRect();
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const offsetFromCenterX = clientX - centerX;
    const offsetFromCenterY = clientY - centerY;

    mouseX.set(left - parentLeft + offsetFromCenterX / 4);
    mouseY.set(top - parentTop + offsetFromCenterY / 4);
  }

  function disableDragClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (isDragging) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  function handleDragSnap(
    _: MouseEvent,
    { offset: { x: dragOffset } }: PanInfo
  ) {
    setIsDragging(false);
    containerRef.current?.removeAttribute("data-dragging");

    animatedX.stop();
    const currentOffset = offsetX.get();

    if (
      Math.abs(dragOffset) < DRAG_THRESHOLD ||
      (!canScrollPrev && dragOffset > 0) ||
      (!canScrollNext && dragOffset < 0)
    ) {
      animatedX.set(currentOffset);
      return;
    }

    let offsetWidth = 0;
    for (
      let i = activeSlide;
      dragOffset > 0 ? i >= 0 : i < itemsRef.current.length;
      dragOffset > 0 ? i-- : i++
    ) {
      const item = itemsRef.current[i];
      if (!item) continue;
      const itemOffset = item.offsetWidth;

      const prevItemWidth =
        itemsRef.current[i - 1]?.offsetWidth ?? FALLBACK_WIDTH;
      const nextItemWidth =
        itemsRef.current[i + 1]?.offsetWidth ?? FALLBACK_WIDTH;

      if (
        (dragOffset > 0 && dragOffset > offsetWidth + itemOffset && i > 1) ||
        (dragOffset < 0 &&
          dragOffset < offsetWidth - itemOffset &&
          i < itemsRef.current.length - 2)
      ) {
        if (dragOffset > 0) {
          offsetWidth += prevItemWidth;
        } else {
          offsetWidth -= nextItemWidth;
        }

        continue;
      }

      if (dragOffset > 0) {
        offsetX.set(currentOffset + offsetWidth + prevItemWidth);
        setActiveSlide(i - 1);
      } else {
        offsetX.set(currentOffset + offsetWidth - nextItemWidth);
        setActiveSlide(i + 1);
      }
      break;
    }
  }

  function scrollPrev() {
    if (!canScrollPrev) return;
    const prevWidth = itemsRef.current
      .at(activeSlide - 1)
      ?.getBoundingClientRect().width;
    if (prevWidth) {
      offsetX.set(offsetX.get() + prevWidth);
      setActiveSlide((prev) => prev - 1);
    }
  }

  function scrollNext() {
    if (!canScrollNext) return;
    const nextWidth = itemsRef.current
      .at(activeSlide + 1)
      ?.getBoundingClientRect().width;
    if (nextWidth) {
      offsetX.set(offsetX.get() - nextWidth);
      setActiveSlide((prev) => prev + 1);
    }
  }

  return (
    <div className="group container mx-auto">
      <motion.div
        className={cn(
          "pointer-events-none absolute z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        )}
        style={{
          width: CURSOR_SIZE,
          height: CURSOR_SIZE,
          x: animatedHoverX,
          y: animatedHoverY,
        }}
      >
        <motion.div
          layout
          className={cn(
            "grid h-full place-items-center rounded-full bg-[#ADBDFF]",
            hoverType === "click" && "absolute inset-5 h-auto"
          )}
        >
          <motion.span
            layout="position"
            className="uppercase text-gray-900 text-sm font-medium text-center w-full select-none"
          >
            {hoverType ?? "drag"}
          </motion.span>
        </motion.div>
      </motion.div>
      <div className="relative overflow-hidden">
        <motion.ul
          ref={containerRef}
          className="flex cursor-none items-start"
          style={{
            x: animatedX,
          }}
          drag="x"
          dragConstraints={{
            left: -(FALLBACK_WIDTH * (profiles.length - 1)),
            right: FALLBACK_WIDTH,
          }}
          onMouseMove={({ currentTarget, clientX, clientY }) => {
            const parent = currentTarget.offsetParent;
            if (parent) {
              const { left, top } = parent.getBoundingClientRect();
              mouseX.set(clientX - left - CURSOR_SIZE / 2);
              mouseY.set(clientY - top - CURSOR_SIZE / 2);
            }
          }}
          onDragStart={() => {
            containerRef.current?.setAttribute("data-dragging", "true");
            setIsDragging(true);
          }}
          onDragEnd={handleDragSnap}
        >
          {profiles.map((profile, index) => {
            const active = index === activeSlide;
            return (
              <motion.li
                layout
                key={profile.id}
                //@ts-expect-error //Not expecting an error
                ref={(el) => (itemsRef.current[index] = el)}
                className={cn(
                  "group relative shrink-0 select-none px-3 transition-opacity duration-300",
                  !active && "opacity-30"
                )}
                transition={{
                  ease: "easeInOut",
                  duration: 0.4,
                }}
                style={{
                  flexBasis: active ? "40%" : "30%",
                }}
              >
                <ProfileItem
                  {...profile}
                  rating={profile.rating as ItemProps["rating"]}
                />
              </motion.li>
            );
          })}
        </motion.ul>
        <button
          type="button"
          className="absolute left-[24%] top-1/3"
          onClick={scrollPrev}
          disabled={!canScrollPrev}
        >
          <FaLongArrowAltLeft className="h-10 w-10" />
        </button>
        <button
          type="button"
          className="absolute right-[24%] top-1/3"
          onClick={scrollNext}
          disabled={!canScrollNext}
        >
          <FaLongArrowAltRight className="h-10 w-10" />
        </button>
      </div>
    </div>
  );
}

type ItemProps = {
  id: string;
  rating: 1 | 2 | 3 | 4 | 5;
  name: string;
  description: string;
  imgSrc: string;
};
const ProfileItem = (props: ItemProps) => {
  const router = useRouter();
  const { id, rating, name, description, imgSrc } = props;
  return (
    <div
      onClick={(e) => {
        router.push(`/brokers/${id}`);
      }}
      className="min-w-96 h-auto rounded-[50px] rounded-bl-none bg-gray-200 px-14 py-8 flex flex-col gap-8"
    >
      <div className="flex justify-between items-center">
        <div className="flex p-2 rounded-full rounded-br-none bg-white w-fit">
          {[...Array(5).keys()].map((i) => (
            <GoStarFill
              color={rating - i > 0 ? "#FE621D" : ""}
              size={24}
              key={i}
            />
          ))}
        </div>
        <span className="uppercase text-xl">User rating</span>
      </div>
      <span className="text-2xl">Definitum Broker</span>
      <h3 className="font-extrabold text-2xl text-gray-500">{name}</h3>
      <p className="-mt-4">{description}</p>
      <Image
        src={imgSrc}
        alt=""
        width={350}
        height={300}
        className="w-full h-auto"
      />

      <div className="flex gap-4 ml-auto">
        <button className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
          <GoStarFill color="#ADBDFF" className="!w-3/5 !h-3/5 mt-1" />
        </button>
        <button className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
          <FaHeart color="#ADBDFF" className="!w-3/5 !h-3/5 mt-1" />
        </button>
      </div>
    </div>
  );
};
