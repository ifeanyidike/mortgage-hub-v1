import Header from "@/components/Header";
import PhoneNumberVerificationScreen from "@/components/PhoneNumberVerificationScreen";
import React from "react";

const Page = () => {
  return (
    <>
      <Header bgColor="bg-transparent" />
      <section className="max-w-screen-xl mx-auto mt-8">
        <PhoneNumberVerificationScreen />
      </section>
    </>
  );
};

export default Page;
