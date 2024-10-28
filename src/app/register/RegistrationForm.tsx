"use client";
import React, { useEffect, useState } from "react";
import SocialLoginForm from "../login/SocialLoginForm";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button, Input, Radio, Tabs } from "antd";
import { MdEmail } from "react-icons/md";
import { customError } from "@/server/error";
import supabaseSubscriptions from "@/server/supabase-subscriptions";
import { supabase } from "@/lib/supabase";
import { cn } from "../utils";
import { LockFilled } from "@ant-design/icons";
import {
  BsCalendarDateFill,
  BsPersonFillUp,
  BsPersonFillX,
  BsPersonSquare,
} from "react-icons/bs";
import { BiCalendarX } from "react-icons/bi";

const options = [
  { label: "Register as a broker", value: "broker" },
  { label: "Register as a user", value: "user" },
];
const RegistrationForm = () => {
  const router = useRouter();
  const [role, setRole] = useState<"user" | "broker">("user");
  const [tempEmail, setTempEmail] = useState("");
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
    <div className=" h-screen">
      <div
        className={cn("flex flex-col items-center", email ? "mt-2" : "mt-32")}
      >
        {/* <Radio.Group
            block
            options={options}
            defaultValue="user"
            optionType="button"
            buttonStyle="solid"
            className="!w-full !text-3xl !font-[family-name:var(--font-montserrat)]"
            style={{
              fontFamily: "Montserrat",
              fontWeight: 700,
              fontSize: 48,
            }}
            name="role"
            onChange={(e) => setRole(e.target.value)}
          /> */}
        <Tabs
          defaultActiveKey="user"
          size="large"
          className={cn(
            "!font-[family-name:var(--font-montserrat)] !w-full",
            email && "!hidden"
          )}
          items={options.map((t) => ({
            key: t.value,
            label: (
              <button
                className="!text-base lg:!text-[24px] font-bold mr-5 lg:!mr-10"
                onClick={() => setRole(t.value as "broker" | "user")}
              >
                {t.label}
              </button>
            ),
            children: (
              <div className="flex flex-col gap-4 pt-4 items-center lg:w-4/5 mx-auto">
                <SocialLoginForm role={role} />
                <p>Or</p>
                <Input
                  type="email"
                  name="email"
                  required
                  aria-placeholder="Enter your email address"
                  size="large"
                  className="!py-3 mb-4"
                  placeholder="Enter your email address"
                  onChange={(e) => setTempEmail(e.currentTarget.value)}
                  prefix={<MdEmail />}
                />

                <Button
                  type="default"
                  className="w-3/5"
                  size="large"
                  onClick={() => {
                    console.log("temp email", tempEmail, email);
                    setEmail(tempEmail);
                  }}
                >
                  Continue with email
                </Button>
              </div>
            ),
          }))}
        />
        <main
          className={cn(
            "my-5 gap-5 w-full  xs:w-[400px] sm:w-[550px] md:w-[650px] lg:w-[850px] xl:w-[1000px]  p-3 rounded-md",
            " text-black !font-[family-name:var(--font-montserrat)]",
            email ? "grid" : "!hidden"
          )}
        >
          <h2
            className={cn(
              "capitalize py-4 px-8 lg:px-16 text-white text-2xl font-bold rounded-xl",
              role === "broker" ? "bg-[#FE621D]" : "bg-[#3185FC]"
            )}
          >
            {role} registration
          </h2>
          <form
            onSubmit={handleSubmit}
            className={cn(
              "flex flex-col gap-12 border border-red-500",
              "bg-gray-100 py-12 lg:px-20 px-10 rounded-3xl border border-gray-300"
            )}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="firstName" className="font-bold text-gray-500">
                First Name
              </label>
              <Input
                type="text"
                name="firstName"
                id="firstName"
                required
                aria-placeholder="Enter your first name"
                size="large"
                placeholder="Enter your first name"
                className="!py-3 !text-lg"
                // disabled

                prefix={<BsPersonFillX size={22} />}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="lastName" className="font-bold text-gray-500">
                Last Name
              </label>
              <Input
                type="text"
                name="lastName"
                id="lastName"
                required
                aria-placeholder="Enter your last name"
                size="large"
                placeholder="Enter your last name"
                className="!py-3 !text-lg"
                // disabled
                prefix={<BsPersonFillUp size={22} className="!mr-2" />}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-bold text-gray-500">
                Email
              </label>
              <Input
                type="email"
                name="email"
                required
                aria-placeholder="Enter your email address"
                size="large"
                placeholder="Enter your email address"
                value={email}
                className="!py-3 !text-lg"
                // disabled
                prefix={<MdEmail size={22} />}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="dateOfBirth" className="font-bold text-gray-500">
                Date of birth
              </label>
              <Input
                type="dateOfBirth"
                name="dateOfBirth"
                required
                aria-placeholder="Enter your date of birth"
                size="large"
                placeholder="Enter your date of birth"
                value={email}
                className="!py-3 !text-lg"
                // disabled
                prefix={<BiCalendarX size={22} />}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="font-bold text-gray-500">
                Password
              </label>
              <Input.Password
                type="password"
                name="password"
                required
                aria-placeholder="Enter your password"
                size="large"
                placeholder="Enter your password"
                className="!py-3 !text-lg"
                prefix={<LockFilled size={22} />}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="font-bold text-gray-500">
                Confirm password
              </label>
              <Input.Password
                type="password"
                name="confirmPassword"
                required
                aria-placeholder="Confirm your password"
                size="large"
                placeholder="Confirm your password"
                className="!py-3 !text-lg"
                prefix={<LockFilled size={22} />}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button
              type="default"
              className="w-64 !uppercase !py-2 !rounded-full !bg-[#3185FC] !text-white !text-xl !font-bold"
              size="large"
              htmlType="submit"
            >
              Sign up
            </Button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default RegistrationForm;
