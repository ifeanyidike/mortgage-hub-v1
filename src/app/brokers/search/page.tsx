import Header from "@/components/Header";
import React from "react";
import AgentFinder from "./AgentFinder";

const Page = () => {
  return (
    <>
      <Header bgColor="bg-transparent" />
      <main className="max-w-screen-xl mx-auto">
        <AgentFinder />
      </main>
    </>
  );
};

export default Page;
