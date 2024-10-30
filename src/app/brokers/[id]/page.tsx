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
import { cn, getRandomItems } from "@/app/utils";
import { FaXTwitter } from "react-icons/fa6";
import BlogHighlights from "@/components/BlogHighlights";
import HomeAIPane from "@/components/HomeAIPane";
import CustomerServicePane from "@/components/CustomerServicePane";
import { fetchBroker } from "@/actions/brokers";

export default async function Page({ params }: { params: { id: string } }) {
  const profile = await fetchBroker(params.id);
  console.log("profile", profile);
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
      <Header bgColor="bg-gray-200" />
      <main>
        <section className="1-5xl:px-32 py-16 px-4 bg-gray-200 overflow-scroll">
          <h2 className="text-3xl border-b border-black">Broker Profile</h2>
          <div className="flex lg:justify-between mt-8 lg:flex-row flex-col gap-8 min-w-72 xs:min-w-96">
            <Image
              src={profile?.picture || ""}
              width={500}
              height={300}
              className="h-auto max-w-72 max-h-72 xs:max-w-[400px] xs:max-h-[400px] order-1 self-center lg:self-start"
              alt={profile.name!}
            />
            <div className="xl:px-16 p-8 bg-white rounded-3xl gap-6 flex flex-col justify-between w-full lg:w-1/2 order-3 lg:order-2 mx-auto">
              <h3 className="text-3xl font-bold">{profile.name}</h3>
              {profile.company && (
                <span className="uppercase">Broker at {profile.company}</span>
              )}
              <p className="leading-8 first-letter:float-left first-letter:text-7xl first-letter:pr-4 first-letter:font-black first-letter:text-red-500">
                {profile.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={`tel:${profile.phone}`}>
                  <Button
                    type="primary"
                    shape="round"
                    size={"large"}
                    className="!py-2"
                  >
                    <div className="bg-[#3EBA97] p-[6px] rounded-full">
                      <FiPhoneCall />
                    </div>
                    Call Me
                  </Button>
                </a>
                <Button
                  type="primary"
                  shape="round"
                  size={"large"}
                  className="!py-2"
                >
                  <div className="bg-[#3EBA97] p-[6px] rounded-full">
                    <IoChatbubblesOutline />
                  </div>
                  Chat With Me
                </Button>
              </div>
            </div>
            <div className="bg-white rounded-3xl p-8 gap-6 flex flex-col order-2 lg:order-3 min-w-80 lg:max-w-[400px] w-full mx-auto">
              <span className="text-xl uppercase">User Rating</span>
              <div className="flex p-2 rounded-full rounded-br-none bg-white w-fit border border-gray-300">
                {[...Array(5).keys()].map((i) => (
                  <GoStarFill
                    color={rating - i > 0 ? "#FE621D" : ""}
                    size={24}
                    key={i}
                  />
                ))}
              </div>
              <p>based on {reviews.length} reviews</p>
              <div className="flex flex-col">
                <span className="font-bold">{profile.role}</span>
                <p>flights made</p>
              </div>
              <div className="flex flex-col">
                <span className="font-bold">{profile.lic}</span>
                <p>work since</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-8 min-w-72 xs:min-w-96 1-5xl:px-32 pt-8 pb-16 px-4 bg-gray-200 overflow-hidden">
          <div className="h-auto max-w-[400px] min-w-96 order-2 lg:order-1 self-center lg:self-start  flex flex-col gap-10 border">
            <div className="flex flex-col gap-1">
              <h4>Broker ID</h4>
              <span className="font-bold">{profile.broker_id}</span>
            </div>

            <div className="flex flex-col gap-1">
              <h4>Preferred Locations</h4>
              {profile.service_areas?.map((p) => (
                <span className="font-bold" key={p}>
                  {p}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-1">
              <h4>Contact</h4>
              <span className="font-bold">{profile.phone}</span>
            </div>
            <div className="flex flex-col gap-1">
              <h4>Location</h4>
              <span className="font-bold">{profile.location?.address}</span>
            </div>

            <div className="flex gap-4">
              <BiLogoFacebookCircle size={35} />
              <FaXTwitter size={35} />
              <BiLogoInstagram size={35} />
            </div>
          </div>

          <div className="!order-1 lg:!order-2 col-span-2 lg:col-span-1 h-full !bg-white rounded-2xl p-8 flex flex-col">
            <h2 className="text-xl text-gray-500 uppercase mb-4">
              What My Clients Say
            </h2>

            <Carousel
              className={cn(
                "!flex-1 lg:max-w-[700px] xl:max-w-[700px] 2xl:max-w-[1000px]",
                "3xl:max-w-[1100px] 4xl:max-w-[1300px] lg:!min-h-80",
                "custom-carousel "
              )}
              autoplay
            >
              {reviews.map((review) => (
                <div key={review.id} className="!flex flex-col gap-4 h-full">
                  <div className="!flex flex-col lg:flex-row gap-2">
                    <div className="w-fit">
                      <BiSolidQuoteAltLeft
                        color="#FE621D"
                        size={40}
                        className="w-fit"
                      />
                    </div>
                    <div className="text-lg xs:text-xl md:text-2xl italic">
                      {review.text}
                    </div>
                  </div>
                  <address className="ml-0 lg:ml-12 mb-8">
                    {review.name}
                  </address>
                </div>
              ))}
            </Carousel>
          </div>
        </section>
        <section className="mt-32">
          <BlogHighlights />
          <HomeAIPane />
          <CustomerServicePane />
        </section>
      </main>
    </>
  );
}
