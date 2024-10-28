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

const Lenders = () => {
  return (
    <>
      <main>
        <section
          className={cn(
            "w-full bg-[url('/assets/images/our-offers-desktop.jpg')]",
            "max-lg:bg-[url('/assets/images/our-offers-mobile.jpg')]",
            "bg-center bg-cover bg-no-repeat",
            "flex flex-col"
          )}
        >
          <Header bgColor="bg-transparent" />

          <div className="px-32 max-lg:px-8 flex flex-col">
            <h2 className="text-7xl text-white text-center pt-16 lg:mb-24 2xl:mb-32">
              Find The Lender For You
            </h2>
            <div className="flex justify-between items-center mt-16 max-sm:flex-col max-sm:gap-16 lg:mb-24 2xl:mb-32">
              <div className="flex flex-col gap-8">
                <Image
                  src={HomeTrust}
                  alt="Home Trust"
                  className="text-white bg-[#FE621D] w-64 border border-white p-4 box-border rounded-xl"
                />
                <div className="uppercase text-2xl bg-white/15 shadow-[rgba(0,0,15,0.2)_4px_5px_4px_0px] rounded-full text-center py-4 border border-[rgba(0,0,15,0.2)]">
                  private lender
                </div>
              </div>
              <div className="flex flex-col gap-8">
                <Image
                  src={FinancialLP}
                  alt="Financial LP"
                  className="text-white bg-white w-64 border border-white p-4 h-22 rounded-xl"
                />
                <div className="uppercase text-2xl bg-white/15 max-sm:bg-white/80 shadow-[rgba(0,0,15,0.2)_4px_5px_4px_0px] rounded-full text-center py-4 border border-[rgba(0,0,15,0.2)]">
                  B Lender
                </div>
              </div>
            </div>
            <LenderHomeSelect />
          </div>
        </section>

        <section className="flex flex-col gap-8 overflow-hidden">
          <LenderTestimonials />
          <BlogHighlights />
          <HomeAIPane />
          <CustomerServicePane />
        </section>
      </main>
    </>
  );
};

export default Lenders;
