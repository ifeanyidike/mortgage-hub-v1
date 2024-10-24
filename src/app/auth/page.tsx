import React from "react";
import LoginForm from "../login/LoginForm";
import Logout from "../login/Logout";
import Link from "next/link";

const Auth = () => {
  return (
    <div className="grid place-items-center h-screen">
      <LoginForm />
      <p className="my-3">
        Don&apos;t have an account?
        <Link className="mx-2 underline" href="register">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Auth;
