"use client";
import {
  AppstoreOutlined,
  CloseOutlined,
  HomeFilled,
  MenuOutlined,
} from "@ant-design/icons";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Button, Dropdown, Flex, Menu, MenuProps, Space } from "antd";
import React, { useEffect, useState } from "react";
import { getSession, useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { handleLogout } from "@/actions/auth";
import Logo from "@/app/assets/logo.png";
import Image from "next/image";

const items: Record<"key" | "label", string>[] = [
  {
    label: "Home",
    key: "/",
  },
  {
    label: "Lenders",
    key: "lenders",
  },
  {
    label: "Brokers",
    key: "brokers",
  },
  {
    label: "New Immigrants",
    key: "new-immigrants",
  },
  {
    label: "AI Genie",
    key: "ai",
  },
];

const Header = () => {
  const [current, setCurrent] = useState("home");
  // const { user, error, isLoading } = useUser();
  const { data: session, update, status } = useSession();

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  const [mobileExpand, setMobileExpand] = useState(false);

  return (
    <>
      <div className="w-full my-auto flex max-[1200px]:px-14 px-20 py-12 !items-center  bg-[#f0f0f0] font-[family-name:var(--font-montserrat)] max-lg:hidden">
        <Flex justify="space-between" align="center" className="w-full ">
          {/* <h5 className="whitespace-nowrap font-extrabold text-xl">
          Mortgage Hub
        </h5> */}
          <Link href="/">
            <Image src={Logo} alt="" />
          </Link>

          <div className="w-4/5 flex justify-between items-end text-lg font-semibold px-24 max-[1200px]:px-14 max-[1050px]:px-8">
            {items.map((i) => (
              <Link key={i?.key} href={`/${i.key}`} className="text-black  ">
                {i.label}
              </Link>
            ))}
          </div>
          {!session?.user ? (
            <Button
              shape="round"
              className="uppercase !bg-[#f0f0f0] !border !border-black"
            >
              <a href="/login">Log-in | Register</a>
            </Button>
          ) : (
            <Button
              shape="round"
              className="uppercase !bg-[#f0f0f0] !border !border-black"
              onClick={async () => {
                console.log("session user", session?.user);
                if (session?.user) {
                  await signOut();
                  await handleLogout();
                }
              }}
            >
              Logout
            </Button>
          )}
        </Flex>
      </div>
      <div
        className={`w-full my-auto  flex flex-col font-[family-name:var(--font-montserrat)] lg:hidden bg-[#f0f0f0] ${
          mobileExpand && "fixed h-screen z-20"
        }`}
      >
        <div className="flex justify-between  px-10 max-[500px]:px-4 py-12 !items-center w-full">
          <Link onClick={() => setMobileExpand(false)} href="/">
            <Image src={Logo} alt="" />
          </Link>
          <button
            className="cursor-pointer"
            onClick={() => setMobileExpand(!mobileExpand)}
          >
            {!mobileExpand ? (
              <MenuOutlined className="text-4xl" />
            ) : (
              <CloseOutlined className="text-4xl" />
            )}
          </button>
        </div>
        {mobileExpand && (
          <div className="w-full flex flex-col items-center justify-between font-semibold text-4xl h-[50%] mt-24 overflow-auto">
            {items.map((i) => (
              <Link
                onClick={() => setMobileExpand(false)}
                key={i?.key}
                href={`/${i.key}`}
                className="text-black  "
              >
                {i.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
