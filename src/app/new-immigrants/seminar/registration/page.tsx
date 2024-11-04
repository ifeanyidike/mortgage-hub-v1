import Header from "@/components/Header";
import React from "react";
import SeminarRegistrationForm from "../../components/SeminarRegistrationForm";

const Page = () => {
  return (
    <>
      <Header bgColor="bg-transparent" />
      <main className="max-w-screen-xl mx-auto">
        <SeminarRegistrationForm />
      </main>
    </>
  );
};

export default Page;
