"use client";
import React, { useEffect, useState } from "react";
import SocialLoginForm from "../login/SocialLoginForm";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button, Input, Radio } from "antd";
import { MdEmail } from "react-icons/md";
import { LockFilled } from "@ant-design/icons";
import { customError } from "@/server/error";
import supabaseSubscriptions from "@/server/supabase-subscriptions";
import { supabase } from "@/lib/supabase";

const options = [
  { label: "Continue as a broker", value: "broker" },
  { label: "Continue as a user", value: "user" },
];
const RegistrationForm = () => {
  const router = useRouter();
  const [role, setRole] = useState<"user" | "broker">("user");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const subscription = supabaseSubscriptions.listenToEvents(
      "INSERT",
      (payload) => console.log("Payload: ", payload)
    );

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    console.log("submitting...");
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    try {
      const response = await axios.post("/api/auth/register", { ...data });
      if (response.status === 201) router.push("/login");
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const serializedError = customError.serializeAxiosError(error);
        setError(serializedError.message);
        console.log(
          "Serialized Axios error:",
          JSON.stringify(serializedError, null, 2)
        );
      } else {
        console.error("Unknown error:", error);
      }
    }
  }
  return (
    <div className="grid place-items-center h-screen">
      <div className="flex flex-col justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="my-5 gap-5 flex flex-col w-[500px] items-center border p-3 border-gray-200 rounded-md text-black"
        >
          <Radio.Group
            block
            options={options}
            defaultValue="user"
            optionType="button"
            buttonStyle="solid"
            className="!w-full"
            name="role"
            onChange={(e) => setRole(e.target.value)}
          />
          {/* <input
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
        <label htmlFor="broker">Broker</label> */}
          {/* <div className="my-2">
          <label htmlFor="email">Name</label>
          <input
            className="border mx-2 border-gray-500 rounded"
            type="text"
            name="name"
            id="name"
          />
        </div> */}

          <Input
            type="email"
            name="email"
            required
            aria-placeholder="Enter your email address"
            size="large"
            placeholder="Enter your email address"
            prefix={<MdEmail />}
          />
          <Input.Password
            type="password"
            name="password"
            required
            aria-placeholder="Enter your password"
            size="large"
            placeholder="Enter your password"
            prefix={<LockFilled />}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button
            type="default"
            className="w-3/5"
            size="large"
            htmlType="submit"
          >
            Submit
          </Button>
        </form>
        <SocialLoginForm role={role} />
      </div>
    </div>
  );
};

export default RegistrationForm;
