import React from "react";
import { profiles } from "../components/data";
import Image from "next/image";
import { IoChatbubblesOutline } from "react-icons/io5";
import { FiPhoneCall } from "react-icons/fi";
import { Button } from "antd";
import { GoStarFill } from "react-icons/go";

export default function Page({ params }: { params: { id: string } }) {
  const profile = profiles.find((p) => p.id === params.id);

  if (!profile)
    return <div className="p-32 text-center text-4xl">Profile not found.</div>;
  return (
    <main>
      <section className="lg:px-32 py-16 px-16 bg-gray-200 overflow-scroll">
        <h2 className="text-3xl border-b border-black">Broker Profile</h2>
        <div className="flex lg:justify-between mt-8 lg:flex-row flex-col gap-8">
          <Image
            src={profile?.imgSrc}
            width={500}
            height={300}
            className="w-auto max-w-[300px] h-auto max-h-[300px] order-1 self-center"
            alt={profile.name}
          />
          <div className="xl:px-16 p-8 bg-white rounded-3xl gap-6 flex flex-col w-full lg:w-1/2 order-3 lg:order-2">
            <h3 className="text-3xl font-bold">{profile.name}</h3>
            {profile.workPlace && (
              <span className="uppercase">Broker at {profile.workPlace}</span>
            )}
            <p>{profile.description}</p>
            <div className="flex flex-col sm:flex-row gap-4">
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
          <div className="bg-white rounded-3xl p-8 gap-6 flex flex-col order-2 lg:order-3">
            <span className="text-xl uppercase">User Rating</span>
            <div className="flex p-2 rounded-full rounded-br-none bg-white w-fit border border-gray-300">
              {[...Array(5).keys()].map((i) => (
                <GoStarFill
                  color={profile.rating - i > 0 ? "#FE621D" : ""}
                  size={24}
                  key={i}
                />
              ))}
            </div>
            <p>based on {profile.reviews.length} reviews</p>
            <div className="flex flex-col">
              <span className="font-bold">{profile.flightsMade}</span>
              <p>flights made</p>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">{profile.yearStarted}</span>
              <p>work since</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
