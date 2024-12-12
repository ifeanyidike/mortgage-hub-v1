import React from "react";
import LoginForm from "../login/LoginForm";
import Logout from "../login/Logout";
import Link from "next/link";
import Header from "@/components/Header";
import LoginForm2 from "./LoginForm2";

const Login = () => {
  return (
    <>
      {/* <Header bgColor="bg-white" />
      <div className="flex flex-col justify-center items-center p-4 font-[family-name:var(--font-montserrat)]">
        <LoginForm />
      </div> */}
      <div className="page-bg h-screen bg-cover bg-center relative overflow-hidden">
        <Header bgColor="transparent z-50" />
        <LoginForm2 />
      </div>
    </>
  );
};

export default Login;
