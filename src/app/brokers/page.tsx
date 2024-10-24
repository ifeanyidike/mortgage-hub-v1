import Image from "next/image";
import React from "react";
import HomeTrust from "@/app/assets/icons/home-trust.svg";
import FinancialLP from "@/app/assets/icons/first-national-logo-color.svg";
import BlogHighlights from "@/components/BlogHighlights";
import HomeAIPane from "@/components/HomeAIPane";
import CustomerServicePane from "@/components/CustomerServicePane";
import Hero from "./components/Hero";

const Lenders = () => {
  return (
    <main>
      <Hero />
      <section className="flex flex-col gap-8">
        <BlogHighlights />
        <HomeAIPane />
        <CustomerServicePane />
      </section>
    </main>
  );
};

export default Lenders;
