import Image from "next/image";
import React from "react";
import HomeTrust from "@/app/assets/icons/home-trust.svg";
import FinancialLP from "@/app/assets/icons/first-national-logo-color.svg";
import LenderHomeSelect from "./components/LenderHomeSelect";
import LenderTestimonials from "./components/LenderTestimonials";
import BlogHighlights from "@/components/BlogHighlights";
import HomeAIPane from "@/components/HomeAIPane";
import CustomerServicePane from "@/components/CustomerServicePane";
import Header from "@/components/Header";
import { cn } from "../utils";
import OurOffersSection from "./components/OurOfferSection";

const Lenders = () => {
  return (
    <>
      <main className="">
        <OurOffersSection />

        <section className="flex flex-col gap-8 overflow-hidden max-w-screen-xl mx-auto m-8">
          <LenderTestimonials />
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

export default Lenders;
