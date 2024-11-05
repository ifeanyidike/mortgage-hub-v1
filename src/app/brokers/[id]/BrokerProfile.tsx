"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiPhoneCall } from "react-icons/fi";
import { IoChatbubblesOutline } from "react-icons/io5";
import { GoStarFill } from "react-icons/go";
import { BiLogoFacebookCircle, BiLogoInstagram } from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";
import { BiSolidQuoteAltLeft } from "react-icons/bi";
import Carousel from "antd/lib/carousel";
import { BrokerUserData } from "@/types/general";

type ProfileProps = {
  profile: BrokerUserData;
  rating: number;
  reviews: { id: string; text: string; name: string }[];
};

const BrokerProfile: React.FC<ProfileProps> = ({
  profile,
  rating,
  reviews,
}) => {
  return (
    <>
      {/* Profile Section */}
      <motion.section
        className={cn(
          "bg-gray-100 p-8 max-w-screen-xl mx-auto rounded-3xl shadow-lg flex flex-col gap-6 lg:gap-6",
          " rounded-t-none"
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold border-b-2 border-gray-800 text-gray-800">
          Broker Profile
        </h2>

        {/* Profile Info */}
        <div className="flex flex-col lg:flex-row gap-3 lg-gap:10 items-center lg:items-start ">
          {/* Profile Picture */}
          <motion.div
            className="flex-shrink-0 order-1"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src={profile.picture!}
              width={300}
              height={300}
              alt={profile.name!}
              className="rounded-2xl object-cover w-[300px] h-[300px] lg:-w-[250px] lg:h-[250px] shadow-md"
            />
          </motion.div>

          {/* Profile Details */}
          <motion.div
            className="bg-white p-4 lg:p-8 rounded-3xl shadow-lg flex flex-col gap-4 lg:w-1/2 order-2"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h3 className="text-3xl font-bold text-gray-800">{profile.name}</h3>
            {profile.company && (
              <span className="uppercase text-sm text-gray-500">
                Broker at {profile.company}
              </span>
            )}
            {/* <p className="leading-relaxed text-sm text-gray-700 italic">
              {profile.description}
            </p> */}
            <ExpandableDescription description={profile.description!} />
            <div className="flex gap-2 lg:gap-4 mt-2 xs:flex-row flex-col">
              <a href={`tel:${profile.phone}`} className="w-full max-w-32">
                <button className="flex items-center justify-center gap-2 w-full max-w-32 py-3 px-4 bg-[#3EBA97] text-white rounded-full shadow hover:bg-green-600 transition">
                  <FiPhoneCall size={20} />
                  <p className="text-sm">Call Me</p>
                </button>
              </a>
              <button className="flex items-center max-w-40 justify-center gap-2 w-full py-3 px-4 bg-[#3EBA97] text-white rounded-full shadow hover:bg-green-600 transition">
                <IoChatbubblesOutline size={20} />
                <p className="text-sm">Chat With Me</p>
              </button>
            </div>
          </motion.div>

          {/* Profile Ratings */}
          <motion.div
            className="bg-white p-6 rounded-3xl shadow-lg flex flex-col gap-2 order-3 min-w-full lg:min-w-[300px]"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-lg font-bold text-gray-600">User Rating</span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <GoStarFill
                  key={i}
                  size={20}
                  color={rating > i ? "#FE621D" : "#D1D5DB"}
                />
              ))}
            </div>
            <p className="text-gray-500 text-sm">
              Based on {reviews.length} reviews
            </p>

            <div className="mt-3">
              <div className="text-gray-500 uppercase mb-1 text-sm">
                Broker Type
              </div>
              <div className="text-sm font-semibold">{profile.broker_type}</div>
            </div>
            <div className="mt-2">
              <div className="text-gray-500 uppercase mb-1 text-sm">
                Company
              </div>
              <div className="text-sm font-semibold">
                {profile.company || "-"}
              </div>
            </div>
            <div className="mt-2">
              <div className="text-gray-500 uppercase mb-1 text-sm">
                Website
              </div>
              {profile.website ? (
                <a
                  href={profile.website}
                  className="text-blue-500 hover:underline text-sm"
                >
                  {profile.website}
                </a>
              ) : (
                <span>-</span>
              )}
            </div>
            <div className="mt-2">
              <div className="text-gray-500 uppercase mb-1 text-sm">
                License No.
              </div>
              <div className="text-sm font-semibold">{profile.lic || "-"}</div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        className="bg-white py-4 px-8 rounded-3xl shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-xl font-bold text-gray-800 mb-8 border-b-2 border-gray-800 pb-4">
          What My Clients Say
        </h2>

        {/* Carousel Wrapper */}
        <div
          className="relative overflow-hidden"
          style={{
            maxHeight: "calc(100vh - 50px)", // A max height to fit within the section, customizable as needed
          }}
        >
          <Carousel autoplay className="custom-carousel">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="flex flex-col gap-2  text-center min-h-[200px] lg:min-h-[150px]"
              >
                {/* Review Content */}
                <div className="flex flex-col items-center gap-4 flex-grow">
                  <BiSolidQuoteAltLeft size={40} color="#FE621D" />
                  <p className="text-base italic text-gray-600">
                    {review.text}
                  </p>
                </div>

                {/* Author Name */}
                <span className="text-lg font-bold text-gray-700 text-center">
                  {review.name}
                </span>
              </div>
            ))}
          </Carousel>
        </div>
      </motion.section>
    </>
  );
};

export default BrokerProfile;

import { useState } from "react";
import { cn } from "@/app/utils";

type DescriptionProps = {
  description: string;
};

const ExpandableDescription: React.FC<DescriptionProps> = ({ description }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative">
      <p
        className={`leading-relaxed text-sm text-gray-700 italic ${
          expanded ? "" : "line-clamp-3"
        }`}
      >
        {description}
      </p>
      <button
        onClick={() => setExpanded(!expanded)}
        className={cn(
          "text-blue-500 text-xs mt-2 font-semibold",
          description.length < 150 && "hidden"
        )}
      >
        {expanded ? "Read Less" : "Read More"}
      </button>
    </div>
  );
};
