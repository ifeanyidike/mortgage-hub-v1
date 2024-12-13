"use client";
import { handleCredentialLogin } from "@/actions/auth";
import { LoadingOutlined, LockFilled } from "@ant-design/icons";
import { Button, Input, message, Spin } from "antd";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { cn } from "../utils/";
import Link from "next/link";
import SocialLoginForm from "./SocialLoginForm";
import { CustomSessionUser } from "@/types/general";

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      setLoading(true);
      const response = await handleCredentialLogin(formData);

      if (response.error) {
        console.log(response.error);
        messageApi.open({ type: "error", content: response.error.message });
        setError(response.error.message);
        return;
      }
      messageApi.open({ type: "success", content: "Login successful" });
      const session = await getSession();

      if (!session) {
        router.push("/");
        return;
      }

      const user = session.user as CustomSessionUser;
      console.log("user", user, session);
      if (user?.role === "user") {
        router.push(`/dashboard/user?id=${user.id}`);
      } else if (user?.role === "broker") {
        router.push(`/dashboard/broker?id=${user.id}`);
      }
    } catch (error: any) {
      console.log(error);
      messageApi.open({ type: "error", content: error.message });
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  // {loading && (
  //   <div className="fixed top-0 left-0 w-screen h-full  bg-gray-100/50 grid place-items-center z-10">
  //     <Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} />
  //   </div>
  // )}
  return (
    <main
      className={cn(
        "my-5 gap-5 w-full  xs:w-[400px] sm:w-[550px] md:w-[650px] lg:w-[850px] xl:w-[1000px]  p-3 rounded-md",
        " text-black !font-[family-name:var(--font-montserrat)] !grid",
        " h-full mb-16 mx-auto"
      )}
    >
      {contextHolder}

      {loading && (
        <div className="fixed top-0 left-0 w-screen h-full  bg-gray-100/50 grid place-items-center z-10">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} />
        </div>
      )}
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
