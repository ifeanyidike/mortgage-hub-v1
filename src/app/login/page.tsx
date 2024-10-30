import React from "react";
import LoginForm from "../login/LoginForm";
import Logout from "../login/Logout";
import Link from "next/link";
import Header from "@/components/Header";

const Login = () => {
  return (
    <>
      <Header bgColor="bg-transparent" />
      <div className="flex flex-col justify-center items-center p-4 font-[family-name:var(--font-montserrat)]">
        <LoginForm />
      </div>
    </>
  );
};

export default Login;
