import Header from "@/components/Header";
import React from "react";
import WelcomeScreen from "./components/WelcomeScreen";

const Page = () => {
  return (
    <>
      <Header bgColor="bg-transparent" />
      <section className="max-w-screen-xl mx-auto mt-8">
        <WelcomeScreen />
      </section>
    </>
  );
};

export default Page;
