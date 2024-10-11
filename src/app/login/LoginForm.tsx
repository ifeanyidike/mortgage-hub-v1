"use client";
import { handleCredentialLogin, handleSocialLogin } from "@/actions/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const response = await handleCredentialLogin(formData);

      if (response.error) {
        console.log(response.error);
        setError(response.error.message);
      }
      router.push("/");
    } catch (error: any) {
      console.log(error);
      setError(error.message);
    }
  }
  return (
    <form
      className="text-black"
      action={handleCredentialLogin}
      onSubmit={onSubmit}
    >
      <label>
        Email:
        <input type="email" name="email" required />
      </label>
      <label>
        Password:
        <input type="password" name="password" required />
      </label>
      <input className="bg-red-500" type="submit" value="Login" />
    </form>
  );
};

export default LoginForm;
