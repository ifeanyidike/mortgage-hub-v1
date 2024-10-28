import React from "react";
import BlogHighlights from "@/components/BlogHighlights";
import HomeAIPane from "@/components/HomeAIPane";
import CustomerServicePane from "@/components/CustomerServicePane";
import Hero from "./components/Hero";
import ProfileCarousel from "./components/ProfileCarousel";
import PersonalTestimonial from "@/components/PersonalTestimonial";
import Header from "@/components/Header";

const Lenders = () => {
  return (
    <>
      <Header bgColor="bg-transparent" />
      <main>
        <Hero />
        <section className="py-32">
          <ProfileCarousel />
          <PersonalTestimonial
            title="Stacy Used Mortgage Hub Broker Directory"
            description="I had 3 amazing brokers fighting for my mortgage business."
            stat="50,000+"
            statText="Brokers in our network"
            src="/assets/images/fair-skinned.png"
          />
        </section>
        <section className="flex flex-col gap-8 overflow-hidden">
          <BlogHighlights />
          <HomeAIPane />
          <CustomerServicePane />
        </section>
      </main>
    </>
  );
};

export default Lenders;
