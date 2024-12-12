"use client";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { handleLogout } from "@/actions/auth";
import Logo from "@/app/assets/logo3.png";
import Image from "next/image";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn, toAbsoluteUrl } from "@/app/utils/";
import { usePathname } from "next/navigation";
import { Menu, MenuItem, MenuToggle } from "@/app/dashboard-components";
import { DropdownUser } from "@/app/partials/dropdowns/user";

const items = [
  { label: "Home", key: "/" },
  { label: "Lenders", key: "lenders" },
  { label: "Brokers", key: "brokers" },
  { label: "New Immigrants", key: "new-immigrants" },
  { label: "AI Genie", key: "ai-genie" },
];

type Props = {
  bgColor: string;
};
const Header = (props: Props) => {
  const { data: session } = useSession();
  const [mobileExpand, setMobileExpand] = useState(false);
  const itemUserRef = useRef<any>(null);
  const pathname = usePathname();
  function handleAuth() {
    return (
      <>
        {!session?.user ? (
          <div className="rounded-full text-xs bg-[#f0f0f0] font-mono border border-black whitespace-nowrap px-[10px] py-2">
            <a
              href="/login"
              className="text-black uppercase hover:text-[#3185FC] hover:font-bold"
            >
              Login
            </a>{" "}
            |{" "}
            <a
              href="/register"
              className="text-black uppercase hover:text-[#3185FC] hover:font-bold"
            >
              Register
            </a>
          </div>
        ) : (
          // <Button
          //   shape="round"
          //   className="uppercase !bg-[#f0f0f0] !border !border-black"
          // >
          //   <a href="/login">Log-in | Register</a>
          // </Button>
          <Button
            shape="round"
            className="uppercase !bg-[#f0f0f0] !border !border-black"
            onClick={async () => {
              if (session.user) {
                await signOut();
                await handleLogout();
              }
            }}
          >
            Logout
          </Button>
        )}
      </>
    );
  }

  return (
    <>
      {/* Desktop Header */}
      <div
        className={cn(
          " max-w-screen-xl mx-auto my-auto !z-20 flex py-4  items-center bg-transparent font-[family-name:var(--font-montserrat)] max-lg:hidden",
          props.bgColor
        )}
      >
        <Flex align="end" className="w-full px-8 ">
          <Link href="/" className="z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Image src={Logo} alt="Mortgage Hub Logo" className="w-32" />
            </motion.div>
          </Link>
          <div className="w-full 2xl:ml-auto flex justify-between items-end text-base font-semibold px-12 1-5xl:px-24 z-50">
            {items.map((i) => (
              <Link
                key={i.key}
                href={`/${i.key}`}
                className={cn(
                  "text-black hover:text-[#3185FC]",
                  pathname.includes(`/${i.key}`) &&
                    "border-b-2 border-[black] hover:border-[#3185FC]"
                )}
              >
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {i.label}
                </motion.span>
              </Link>
            ))}
          </div>

          {handleAuth()}
        </Flex>
      </div>

      {/* Mobile Header */}
      <div
        className={cn(
          "w-full font-[family-name:var(--font-montserrat)] lg:hidden ",
          // props.bgColor,
          mobileExpand && "fixed h-screen z-50",
          mobileExpand ? "bg-[#f0f0f0]" : props.bgColor
        )}
      >
        <div className="flex justify-between px-4 lg:px-10 py-8 items-center w-full ">
          <Link
            onClick={() => setMobileExpand(false)}
            href="/"
            className=" z-50"
          >
            <Image
              src={Logo}
              alt="Mortgage Hub Logo"
              // className="w-60 lg:w-80"
              className="w-28"
            />
          </Link>
          <button
            className="cursor-pointer ml-auto z-50"
            onClick={() => setMobileExpand(!mobileExpand)}
          >
            {!mobileExpand ? (
              <MenuOutlined className="text-3xl" />
            ) : (
              <CloseOutlined className="text-3xl" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileExpand && (
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              // exit={{ y: -150, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full flex flex-col items-center justify-between text-2xl font-semibold h-[60%] mt-12 overflow-auto "
            >
              {items.map((i) => (
                <Link
                  key={i.key}
                  href={`/${i.key}`}
                  className={cn(
                    "text-black",
                    pathname.includes(`/${i.key}`) &&
                      "border-b-2 border-[black] hover:border-[#3185FC]"
                  )}
                  onClick={() => setMobileExpand(false)}
                >
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {i.label}
                  </motion.span>
                </Link>
              ))}
              {handleAuth()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* <Menu>
        <MenuItem
          ref={itemUserRef}
          toggle="dropdown"
          trigger="click"
          dropdownProps={{
            placement: "bottom-end",
            modifiers: [
              {
                name: "offset",
                options: {
                  offset: [20, 10], // [skid, distance]
                },
              },
            ],
          }}
        >
          <MenuToggle className="btn btn-icon rounded-full">
            <img
              className="size-9 !rounded-full !border-2 border-success !shrink-0"
              src={toAbsoluteUrl("/media/avatars/300-2.png")}
              alt=""
              width={36}
              height={36}
            />
          </MenuToggle>
          {DropdownUser({ menuItemRef: itemUserRef })}
        </MenuItem>
      </Menu> */}
    </>
  );
};

export default Header;
