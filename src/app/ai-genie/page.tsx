import Header from "@/components/Header";
import React from "react";
import AIHero from "./components/AIHero";
import AIHomeSuccessStory from "./components/AIHomeSuccessStory";
import AIHomeForm from "./components/AIHomeForm";
import BlogHighlights from "@/components/BlogHighlights";
import HomeAIPane from "@/components/HomeAIPane";
import CustomerServicePane from "@/components/CustomerServicePane";

const Page = () => {
  return (
    <>
      <Header bgColor="bg-transparent" />
      <main className="max-w-screen-xl mx-auto">
        <AIHero />
        {/* Success Stories Section */}
        <AIHomeSuccessStory />
        <AIHomeForm />
        <section className="flex flex-col gap-8 overflow-hidden max-w-screen-xl mx-auto m-8">
          {/* <LenderTestimonials /> */}
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

export default Page;
