import Image from "next/image";
import React from "react";
import HomeTrust from "@/app/assets/icons/home-trust.svg";
import FinancialLP from "@/app/assets/icons/first-national-logo-color.svg";
import BlogHighlights from "@/components/BlogHighlights";
import HomeAIPane from "@/components/HomeAIPane";
import CustomerServicePane from "@/components/CustomerServicePane";
import Header from "@/components/Header";
import { cn } from "../utils";
import OurOffersSection from "./components/OurOffersSection";
import PersonalTestimonialWithIcon from "@/components/PersonalTestimonialWithIcon";
import FreeSeminarIcon from "@/app/assets/Images/free-seminar-icon.png";

const NewImmigrants = () => {
  return (
    <>
      {/* <Header bgColor="bg-transparent" /> */}
      <main className="">
        <OurOffersSection />
        <section>
          <PersonalTestimonialWithIcon
            title="From Workshop to My First Home"
            description="Come to Canada, I don't know how to buy mortgage. After workshop, I buy house in 3 weeks. So fast!"
            icon={
              <div className="w-[60px] h-[60px]  border border-gray-500 rounded-full shadow-xl transition-all hover:shadow-lg focus:shadow-lg flex items-center justify-center">
                <Image src={FreeSeminarIcon} alt="" className="w-4/5" />
              </div>
            }
            actionText="Free Seminar Workshop"
            src="/assets/images/farnaz-story.png"
            link="/"
          />
        </section>

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

export default NewImmigrants;
