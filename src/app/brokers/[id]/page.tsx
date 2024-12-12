import React from "react";
import { profiles, reviews as fake_reviews } from "../components/data";
import Image from "next/image";
import { IoChatbubblesOutline } from "react-icons/io5";
import { FiPhoneCall } from "react-icons/fi";
import { Button, Carousel } from "antd";
import { GoStarFill } from "react-icons/go";
import Header from "@/components/Header";
import {
  BiLogoFacebookCircle,
  BiLogoInstagram,
  BiSolidQuoteAltLeft,
} from "react-icons/bi";
import { cn, getRandomItems } from "@/app/utils/";
import { FaXTwitter } from "react-icons/fa6";
import BlogHighlights from "@/components/BlogHighlights";
import HomeAIPane from "@/components/HomeAIPane";
import CustomerServicePane from "@/components/CustomerServicePane";
import { fetchBroker } from "@/actions/brokers";
import BrokerProfile from "./BrokerProfile";

export default async function Page({ params }: { params: { id: string } }) {
  const profile = await fetchBroker(params.id);
  const contentStyle: React.CSSProperties = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
    width: 800,
  };
  const reviews = getRandomItems(fake_reviews, 8);
  const rating = Math.round(
    fake_reviews.reduce((acc, curr) => acc + curr.rating, 0) /
      fake_reviews.length
  );

  if (!profile)
    return <div className="p-32 text-center text-4xl">Profile not found.</div>;
  return (
    <>
      <Header bgColor="bg-gray-100" />
      <main className="max-w-screen-xl mx-auto pb-8">
        <BrokerProfile profile={profile} rating={rating} reviews={reviews} />
        <section className="mt-12">
          <div className="px-8">
            <BlogHighlights />
          </div>
          <HomeAIPane />
          <CustomerServicePane />
        </section>
      </main>
    </>
  );
}
