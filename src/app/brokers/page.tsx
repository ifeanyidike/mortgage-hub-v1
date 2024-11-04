import React from "react";
import BlogHighlights from "@/components/BlogHighlights";
import HomeAIPane from "@/components/HomeAIPane";
import CustomerServicePane from "@/components/CustomerServicePane";
import Hero from "./components/Hero";
import ProfileCarousel from "./components/ProfileCarousel";
import PersonalTestimonial from "@/components/PersonalTestimonial";
import Header from "@/components/Header";
import { fetchTopFiveBrokers } from "@/actions/brokers";

const Brokers = async () => {
  const topBrokers = await fetchTopFiveBrokers();
  return (
    <>
      <Header bgColor="bg-transparent" />
      <main className="max-w-screen-xl mx-auto">
        <Hero />
        <section className="py-16">
          <ProfileCarousel topBrokers={topBrokers as any} />
          <PersonalTestimonial
            title="Stacy Used Mortgage Hub Broker Directory"
            description="I had 3 amazing brokers fighting for my mortgage business."
            stat="50,000+"
            statText="Brokers in our network"
            src="/assets/images/fair-skinned.png"
          />
        </section>
        <section className="flex flex-col overflow-hidden pb-8">
          <div className="px-8">
            <BlogHighlights />
          </div>
          <HomeAIPane />
          <CustomerServicePane />
        </section>
      </main>
    </>
  );
};

export default Brokers;
