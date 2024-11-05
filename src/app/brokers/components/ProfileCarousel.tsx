"use client";
import { HeartFilled } from "@ant-design/icons";
import Image from "next/image";
import React, { useRef, useState, useEffect, FC } from "react";
import {
  FaHeart,
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
} from "react-icons/fa";
import { GoStarFill } from "react-icons/go";
import { motion, PanInfo, useMotionValue, useSpring } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
// import { profiles } from "./data";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LeftArrow } from "@/app/assets/SvgComponents";
import { Broker, ExistingUser } from "@/types/db";
import { observer } from "mobx-react-lite";
import { brokerStore } from "@/app/store/brokerStore";

const START_INDEX = 1;
const DRAG_THRESHOLD = 550;
const FALLBACK_WIDTH = 509;
const CURSOR_SIZE = 60;

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

type Props = {
  topBrokers: Partial<(Broker & ExistingUser)[]>;
};
const ProfileCarousel = observer((props: Props) => {
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

  const [profiles, setProfiles] = useState<
    Partial<(ExistingUser & Broker) | undefined>[]
  >(props.topBrokers);

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

  useEffect(() => {
    if (brokerStore.brokers) {
      setProfiles(brokerStore.brokers);
    }
  }, [brokerStore.brokers]);

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

  if (!profiles.length)
    return (
      <div className="px-8 py-16 lg:px-32 lg:py-48  mx-auto text-bold text-xl lg:text-2xl text-center">
        The search does not match any broker in the database. Please search
        again.
      </div>
    );

  return (
    <div className="group container mx-auto relative my-8">
      <motion.div
        className={cn(
          "hidden sm:block pointer-events-none absolute z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
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
            "grid h-full place-items-center rounded-full bg-[#ADBDFF] ",
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
      <div className="relative overflow-hidden py-2">
        <motion.ul
          ref={containerRef}
          className="flex cursor-pointer sm:cursor-none items-start"
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
                key={profile!.id}
                //@ts-expect-error //Not expecting an error
                ref={(el) => (itemsRef.current[index] = el)}
                className={cn(
                  "group relative shrink-0 select-none px-3 transition-opacity duration-300 basis-80",
                  !active ? "opacity-30 md:basis-[30%]" : " md:basis-1/3"
                )}
                transition={{
                  ease: "easeInOut",
                  duration: 0.4,
                }}
              >
                <ProfileItem
                  // {...profile!}
                  rating={5}
                  profile={profile}
                  isDragging={isDragging}
                />
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
      {canScrollPrev && (
        <button
          type="button"
          className="absolute -left-5 md:left-[20%] sm:left-[15%] lg:left-[28%] top-1/3 text-gray-500 hover:text-[#4D4D4D]"
          onClick={scrollPrev}
          disabled={!canScrollPrev}
        >
          <LeftArrow className="h-10 w-10" />
        </button>
      )}
      {canScrollNext && (
        <button
          type="button"
          className="absolute -right-5 md:right-[20%] sm:right-[15%] lg:right-[28%] top-1/3 text-gray-500 hover:text-[#4D4D4D]"
          onClick={scrollNext}
          disabled={!canScrollNext}
          style={{ transform: "rotate(180deg" }}
        >
          <LeftArrow className="h-10 w-10" />
        </button>
      )}
    </div>
  );
});

type ItemProps = {
  profile: Partial<(ExistingUser & Broker) | undefined>;
  isDragging: boolean;
  rating: number;
};

const ProfileItem: FC<ItemProps> = ({ profile, isDragging, rating }) => {
  const router = useRouter();

  return (
    <motion.div
      onClick={() => {
        if (!isDragging) router.push(`/brokers/${profile!.id}`);
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="md:min-w-[350px] max-w-[600px] w-full h-auto rounded-3xl shadow-xl bg-white p-6 sm:p-8 flex flex-col gap-4 transition-all hover:shadow-2xl border border-gray-300"
    >
      {/* Header: User Rating */}
      <motion.div
        className="flex justify-between items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex gap-1 items-center bg-gray-100 p-2 rounded-full">
          {[...Array(5)].map((_, i) => (
            <GoStarFill
              key={i}
              color={rating - i > 0 ? "#FE621D" : "#E4E4E4"}
              size={20}
            />
          ))}
        </div>
        <span className="text-gray-500 text-sm font-semibold uppercase tracking-wide">
          User Rating
        </span>
      </motion.div>

      {/* Broker Type */}
      <motion.span
        className="text-lg font-medium text-gray-600"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.15 }}
      >
        {profile?.broker_type ?? "Broker"}
      </motion.span>

      {/* Broker Name */}
      <motion.h3
        className="font-bold text-2xl text-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {profile?.name}
      </motion.h3>

      {/* Description */}
      <motion.p
        className="text-gray-500 text-sm line-clamp-3 mt-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
      >
        {profile?.description ?? "No description available."}
      </motion.p>

      {/* Profile Image */}
      <motion.div
        className="mt-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Image
          src={profile?.picture ?? "/default-avatar.png"}
          alt={profile?.name ?? "Profile Picture"}
          width={300}
          height={300}
          className="w-full h-auto rounded-xl object-cover max-h-72"
          draggable={false}
        />
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="flex gap-4 mt-6 self-end"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <button
          className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center transition-all hover:bg-gray-200"
          aria-label="Favorite"
        >
          <FaHeart color="#FE621D" className="w-6 h-6" />
        </button>
        <button
          className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center transition-all hover:bg-gray-200"
          aria-label="Rate"
        >
          <GoStarFill color="#FE621D" className="w-6 h-6" />
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ProfileCarousel;
