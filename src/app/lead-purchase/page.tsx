import Header from "@/components/Header";
import OTPVerificationScreen from "@/components/OTPVerificationScreen";
import React from "react";
import LeadPurchase from "./components/LeadPurchase";

const Page = () => {
  return (
    <>
      <Header bgColor="bg-transparent" />
      <section className="max-w-screen-xl mx-auto mt-8">
        <LeadPurchase />
      </section>
    </>
  );
};

export default Page;
