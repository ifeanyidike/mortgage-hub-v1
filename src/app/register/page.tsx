import React from "react";
import RegistrationForm from "./RegistrationForm";
import Link from "next/link";
import Header from "@/components/Header";

const Register = () => {
  return (
    <>
      <Header bgColor="bg-transparent" />
      <div className="flex flex-col justify-center items-center p-4 font-[family-name:var(--font-montserrat)]">
        <RegistrationForm />
        <p className="py-3">
          Already have an account?
          <Link href="/" className="mx-2 underline">
            Login
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;
