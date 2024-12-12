import Header from "@/components/Header";
import OTPVerificationScreen from "@/components/OTPVerificationScreen";
import React from "react";

const Page = () => {
  return (
    <>
      <Header bgColor="bg-transparent" />
      <section className="max-w-screen-xl mx-auto mt-8">
        <OTPVerificationScreen />
      </section>
    </>
  );
};

export default Page;
