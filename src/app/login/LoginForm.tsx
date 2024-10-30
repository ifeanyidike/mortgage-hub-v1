"use client";
import { handleCredentialLogin } from "@/actions/auth";
import { LockFilled } from "@ant-design/icons";
import { Button, Input, message } from "antd";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { cn } from "../utils";
import Link from "next/link";
import SocialLoginForm from "./SocialLoginForm";

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [messageApi, contextHolder] = message.useMessage();

  const { update } = useSession();
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log("formData", formData);
    try {
      const response = await handleCredentialLogin(formData);
      console.log("response: ", response);

      if (response.error) {
        console.log(response.error);
        messageApi.open({ type: "error", content: response.error.message });
        setError(response.error.message);
        return;
      }
      messageApi.open({ type: "success", content: "Login successful" });
      await getSession();
      router.push("/");
    } catch (error: any) {
      console.log(error);
      messageApi.open({ type: "error", content: error.message });
      setError(error.message);
    }
  }
  return (
    <main
      className={cn(
        "my-5 gap-5 w-full  xs:w-[400px] sm:w-[550px] md:w-[650px] lg:w-[850px] xl:w-[1000px]  p-3 rounded-md",
        " text-black !font-[family-name:var(--font-montserrat)] !grid",
        " h-full mb-16 mx-auto"
      )}
    >
      {contextHolder}
      <h2
        className={cn(
          "capitalize py-4 px-8 lg:px-16 text-white text-2xl font-bold rounded-xl",
          "bg-[#3185FC]"
        )}
      >
        Login
      </h2>
      <div className="mx-auto mt-6">
        <SocialLoginForm />
        <p className="text-center mt-8 mb-6">OR</p>
      </div>
      <form
        className={cn(
          "flex flex-col gap-8",
          "bg-gray-100 pt-16 pb-12 lg:px-20 px-5 rounded-3xl lg:rounded-[80px] border border-gray-300"
        )}
        // className="flex flex-col gap-5 w-96 mx-auto"
        action={handleCredentialLogin}
        onSubmit={onSubmit}
      >
        {error && (
          <p className="text-red-500 mx-auto font-bold text-base">{error}</p>
        )}
        <Input
          type="email"
          name="email"
          required
          aria-placeholder="Enter your email address"
          size="large"
          placeholder="Enter your email address"
          className="!py-3 !text-lg"
          prefix={<MdEmail size={22} />}
        />
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

        <Button
          type="primary"
          size="large"
          htmlType="submit"
          className="w-fit !px-8 !rounded-full uppercase"
        >
          Submit
        </Button>

        <p className="py-0 font-bold">
          Don&apos;t have an account?
          <Link className="mx-2 underline text-[#3185FC]" href="register">
            Register
          </Link>
        </p>
      </form>
    </main>
  );
};

export default LoginForm;
