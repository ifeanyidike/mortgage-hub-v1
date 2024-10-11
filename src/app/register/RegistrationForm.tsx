"use client";
import React, { useState } from "react";
import SocialLoginForm from "../login/SocialLoginForm";
import { useRouter } from "next/navigation";
import axios from "axios";

const RegistrationForm = () => {
  const router = useRouter();
  const [role, setRole] = useState<"user" | "broker">("user");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    try {
      const response = await axios.post("/api/auth/register", { ...data });
      if (response.status === 201) router.push("/login");
    } catch (error: any) {
      console.log("error", error);
    }
  }
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="my-5 flex flex-col items-center border p-3 border-gray-200 rounded-md text-black"
      >
        <input
          type="radio"
          id="user"
          name="role"
          value="User"
          onChange={() => setRole("user")}
        />
        <label htmlFor="user">User</label>
        <input
          type="radio"
          id="broker"
          name="role"
          value="Broker"
          onChange={() => setRole("broker")}
        />
        <label htmlFor="broker">Broker</label>
        {/* <div className="my-2">
          <label htmlFor="email">Name</label>
          <input
            className="border mx-2 border-gray-500 rounded"
            type="text"
            name="name"
            id="name"
          />
        </div> */}
        <div className="my-2">
          <label htmlFor="email">Email Address</label>
          <input
            className="border mx-2 border-gray-500 rounded"
            type="email"
            name="email"
            id="email"
          />
        </div>

        <div className="my-2">
          <label htmlFor="password">Password</label>
          <input
            className="border mx-2 border-gray-500 rounded"
            type="password"
            name="password"
            id="password"
          />
        </div>

        <button
          type="submit"
          className="bg-orange-300 mt-4 rounded flex justify-center items-center w-36"
        >
          Register
        </button>
      </form>
      <SocialLoginForm role={role} />
    </>
  );
};

export default RegistrationForm;
