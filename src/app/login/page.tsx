import React from "react";
import LoginForm from "../login/LoginForm";
import Logout from "../login/Logout";
import Link from "next/link";

const Auth = () => {
  return (
    <div className="grid place-items-center h-screen">
      <div>
        <LoginForm />
        <p className="py-6">
          Don't have an account?
          <Link className="mx-2 underline" href="register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Auth;
