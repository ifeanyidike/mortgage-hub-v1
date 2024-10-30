"use client";
import React, { useEffect, useState } from "react";
import SocialLoginForm from "../login/SocialLoginForm";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button, DatePicker, Input, message, Tabs } from "antd";
import { MdEmail } from "react-icons/md";
import { customError } from "@/server/error";
import supabaseSubscriptions from "@/server/supabase-subscriptions";
import { supabase } from "@/lib/supabase";
import { cn } from "../utils";
import { LockFilled } from "@ant-design/icons";
import { BsPersonFillX } from "react-icons/bs";
import { BiCalendarX } from "react-icons/bi";
import Link from "next/link";
import { registerUser } from "@/actions/auth";

const options = [
  { label: "Register as a broker", value: "broker" },
  { label: "Register as a user", value: "user" },
];
const RegistrationForm = () => {
  const router = useRouter();
  const [role, setRole] = useState<"user" | "broker">("user");
  const [tempEmail, setTempEmail] = useState("");
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const subscription = supabaseSubscriptions.listenToEvents(
      "INSERT",
      (payload) => console.log("Payload: ", payload)
    );

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  function redirectToLogin() {
    return (
      <div className="py-3 font-bold">
        Already have an account?
        <Link href="/login" className="mx-2 underline text-[#3185FC]">
          Login
        </Link>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    console.log("submitting...");
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    console.log("data: ", data);
    formData.set("role", role);

    if (data.confirmPassword !== data.password) {
      setError("Passwords do not match");
      return;
    }

    try {
      // const response = await axios.post("/api/auth/register", { ...data });
      // if (response.status === 201) router.push("/login");
      await registerUser(formData);
      messageApi.open({
        type: "success",
        content: "Registration successful!. Please login",
      });
      router.push("/login");
    } catch (error: any) {
      // if (axios.isAxiosError(error)) {
      const serializedError = customError.serializeError(error);
      messageApi.open({
        type: "error",
        content: serializedError,
      });
      setError(serializedError);
      console.log("Serialized Axios error:", serializedError);
      // } else {
      //   console.error("Unknown error:", error);
      // }
    }
  }
  return (
    <div className=" h-full mb-16">
      {contextHolder}
      {/* <button onClick={() => upload_brokers()}>Bulk Uplaod Brokers</button> */}
      {/* <button
        onClick={async () => {
          const brokers = await fetchBrokersByFields(
            "Edmonton",
            "Alberta",
            "Mortgage Agent"
          );
          console.log(brokers);
        }}
      >
        Fetch brokers
      </button> */}
      <div
        className={cn(
          "flex flex-col items-center",
          email === null ? "mt-4" : "mt-2"
        )}
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
            "!font-[family-name:var(--font-montserrat)] !w-full !mb-8 !mx-auto !py-10",
            email !== null && "!hidden"
          )}
          items={options.map((t) => ({
            key: t.value,
            label: (
              <button
                className="!text-sm xs:text-base lg:!text-[24px] font-bold mr-5 lg:!mr-10"
                onClick={() => setRole(t.value as "broker" | "user")}
              >
                {t.label}
              </button>
            ),
            children: (
              <div className="flex flex-col gap-6 pt-6 items-center lg:w-4/5 mx-auto">
                <SocialLoginForm role={role} />
                <p>OR</p>
                <Input
                  type="email"
                  name="email"
                  required
                  aria-placeholder="Enter your email address"
                  size="large"
                  className="!py-3 mb-4 !text-lg"
                  placeholder="Enter your email address"
                  onChange={(e) => setTempEmail(e.currentTarget.value)}
                  prefix={<MdEmail size={22} />}
                />

                <Button
                  type="primary"
                  className="w-3/5 !py-3 !font-bold !uppercase !rounded-full"
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
        {email === null && redirectToLogin()}

        <main
          className={cn(
            "my-5 gap-5 w-full  xs:w-[400px] sm:w-[550px] md:w-[650px] lg:w-[850px] xl:w-[1000px]  p-3 rounded-md",
            " text-black !font-[family-name:var(--font-montserrat)]",
            email === null ? "!hidden" : "!grid"
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
              "flex flex-col gap-12",
              "bg-gray-100 py-12 lg:px-20 px-5 rounded-3xl lg:rounded-[80px] border border-gray-300"
            )}
          >
            {error && (
              <p className="text-red-500 font-bold mx-auto text-base">
                {error}
              </p>
            )}
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-bold text-gray-500">
                Name
              </label>
              <Input
                type="text"
                name="name"
                id="name"
                required
                aria-placeholder="Enter your first name"
                size="large"
                placeholder="Enter your first name"
                className="!py-3 !text-lg"
                // disabled

                prefix={<BsPersonFillX size={22} />}
              />
            </div>

            {/* <div className="flex flex-col gap-2">
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
            </div> */}

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
                // placeholder="Enter your email address"
                value={email || undefined}
                onChange={(e) => setEmail(e.target.value)}
                className="!py-3 !text-lg"
                // disabled
                prefix={<MdEmail size={22} />}
              />
            </div>
            {/* <div className="flex flex-col gap-2">
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
                className="!py-3 !text-lg"
                // disabled
                prefix={<BiCalendarX size={22} />}
              />
            </div> */}
            <div className="flex flex-col gap-2">
              <label htmlFor="dob" className="font-bold text-gray-500">
                Date of birth
              </label>
              <DatePicker
                name="dob"
                required
                aria-placeholder="Enter your date of birth"
                size="large"
                className="!py-3 !text-lg w-full" // w-full makes it responsive
                placeholder="Select your date of birth"
                suffixIcon={<BiCalendarX size={22} />} // replaces the default icon
                format="YYYY-MM-DD" // or any date format you prefer
                onChange={(date, dateString) => {
                  // handle selected date
                  console.log("Selected date:", dateString);
                }}
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
            <Button
              type="default"
              className="w-64 !uppercase !py-2 !rounded-full !bg-[#3185FC] !text-white !text-xl !font-bold"
              size="large"
              htmlType="submit"
            >
              Sign up
            </Button>

            {redirectToLogin()}
          </form>
        </main>
      </div>
    </div>
  );
};

export default RegistrationForm;
