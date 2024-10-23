"use client";
import { handleCredentialLogin, handleSocialLogin } from "@/actions/auth";
import { DownloadOutlined, LockFilled } from "@ant-design/icons";
import { Button, Input } from "antd";
import { signIn, useSession, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { MdEmail, MdPassword } from "react-icons/md";

const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const { update } = useSession();
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const response = await handleCredentialLogin(formData);

      if (response.error) {
        console.log(response.error);
        setError(response.error.message);
      }
      await getSession();
      router.push("/");
    } catch (error: any) {
      console.log(error);
      setError(error.message);
    }
  }
  return (
    <>
      <form
        className="flex flex-col gap-5 w-96"
        action={handleCredentialLogin}
        onSubmit={onSubmit}
      >
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
        {error && <p className="text-red-500 mx-auto text-sm">{error}</p>}
        <Button type="default" size="large" htmlType="submit">
          Submit
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
