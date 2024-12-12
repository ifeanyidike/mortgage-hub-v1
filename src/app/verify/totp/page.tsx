import Header from "@/components/Header";
import TOTPVerificationScreen from "@/components/TOTPVerficationScreen";
import React from "react";

const Page = () => {
  return (
    <>
      <Header bgColor="bg-transparent" />
      <section className="max-w-screen-xl mx-auto mt-8">
        <TOTPVerificationScreen />
      </section>
    </>
  );
};

export default Page;
