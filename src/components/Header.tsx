// "use client";
// import {
//   AppstoreOutlined,
//   CloseOutlined,
//   HomeFilled,
//   MenuOutlined,
// } from "@ant-design/icons";
// import { useUser } from "@auth0/nextjs-auth0/client";
// import { Button, Dropdown, Flex, Menu, MenuProps, Space } from "antd";
// import React, { useEffect, useState } from "react";
// import { getSession, useSession, signOut } from "next-auth/react";
// import Link from "next/link";
// import { handleLogout } from "@/actions/auth";
// import Logo from "@/app/assets/logo.png";
// import Image from "next/image";

// const items: Record<"key" | "label", string>[] = [
//   {
//     label: "Home",
//     key: "/",
//   },
//   {
//     label: "Lenders",
//     key: "lenders",
//   },
//   {
//     label: "Brokers",
//     key: "brokers",
//   },
//   {
//     label: "New Immigrants",
//     key: "new-immigrants",
//   },
//   {
//     label: "AI Genie",
//     key: "ai",
//   },
// ];

// const Header = () => {
//   const [current, setCurrent] = useState("home");
//   // const { user, error, isLoading } = useUser();
//   const { data: session, update, status } = useSession();

//   const onClick: MenuProps["onClick"] = (e) => {
//     console.log("click ", e);
//     setCurrent(e.key);
//   };
//   const [mobileExpand, setMobileExpand] = useState(false);

//   return (
//     <>
//       <div className="w-full my-auto flex max-[1200px]:px-14 px-20 py-12 !items-center  bg-[#f0f0f0] font-[family-name:var(--font-montserrat)] max-lg:hidden">
//         <Flex justify="space-between" align="center" className="w-full ">
//           {/* <h5 className="whitespace-nowrap font-extrabold text-xl">
//           Mortgage Hub
//         </h5> */}
//           <Link href="/">
//             <Image src={Logo} alt="" />
//           </Link>

//           <div className="w-4/5 flex justify-between items-end text-lg font-semibold px-24 max-[1200px]:px-14 max-[1050px]:px-8">
//             {items.map((i) => (
//               <Link key={i?.key} href={`/${i.key}`} className="text-black  ">
//                 {i.label}
//               </Link>
//             ))}
//           </div>
//           {!session?.user ? (
//             <Button
//               shape="round"
//               className="uppercase !bg-[#f0f0f0] !border !border-black"
//             >
//               <a href="/login">Log-in | Register</a>
//             </Button>
//           ) : (
//             <Button
//               shape="round"
//               className="uppercase !bg-[#f0f0f0] !border !border-black"
//               onClick={async () => {
//                 console.log("session user", session?.user);
//                 if (session?.user) {
//                   await signOut();
//                   await handleLogout();
//                 }
//               }}
//             >
//               Logout
//             </Button>
//           )}
//         </Flex>
//       </div>
//       <div
//         className={`w-full my-auto  flex flex-col font-[family-name:var(--font-montserrat)] lg:hidden bg-[#f0f0f0] ${
//           mobileExpand && "fixed h-screen z-20"
//         }`}
//       >
//         <div className="flex justify-between  px-10 max-[500px]:px-4 py-12 !items-center w-full">
//           <Link onClick={() => setMobileExpand(false)} href="/">
//             <Image src={Logo} alt="" />
//           </Link>
//           <button
//             className="cursor-pointer"
//             onClick={() => setMobileExpand(!mobileExpand)}
//           >
//             {!mobileExpand ? (
//               <MenuOutlined className="text-4xl" />
//             ) : (
//               <CloseOutlined className="text-4xl" />
//             )}
//           </button>
//         </div>
//         {mobileExpand && (
//           <div className="w-full flex flex-col items-center justify-between font-semibold text-4xl max-md:text-2xl h-[50%] max-md:h-[40%] mt-24 overflow-auto">
//             {items.map((i) => (
//               <Link
//                 onClick={() => setMobileExpand(false)}
//                 key={i?.key}
//                 href={`/${i.key}`}
//                 className="text-black  "
//               >
//                 {i.label}
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Header;

"use client";
import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { handleLogout } from "@/actions/auth";
import Logo from "@/app/assets/logo.png";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useHeaderSettings } from "@/app/context/HeaderContext";
import { cn } from "@/app/utils";

const items = [
  { label: "Home", key: "/" },
  { label: "Lenders", key: "lenders" },
  { label: "Brokers", key: "brokers" },
  { label: "New Immigrants", key: "new-immigrants" },
  { label: "AI Genie", key: "ai" },
];

type Props = {
  bgColor: string;
};
const Header = (props: Props) => {
  const { data: session } = useSession();
  const [mobileExpand, setMobileExpand] = useState(false);

  function handleAuth() {
    return (
      <>
        {!session?.user ? (
          <div className="rounded-full text-[14px] bg-[#f0f0f0] font-mono border border-black whitespace-nowrap px-[10px] py-1">
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
          "w-full my-auto flex px-32 py-12 items-center bg-transparent font-[family-name:var(--font-montserrat)] max-lg:hidden",
          props.bgColor
        )}
      >
        <Flex justify="space-between" align="center" className="w-full">
          <Link href="/">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Image src={Logo} alt="Mortgage Hub Logo" />
            </motion.div>
          </Link>
          <div className="w-4/5 flex justify-between items-end text-lg font-semibold px-24">
            {items.map((i) => (
              <Link
                key={i.key}
                href={`/${i.key}`}
                className="text-black hover:text-[#3185FC]"
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
          mobileExpand && "fixed h-screen z-20",
          mobileExpand ? "bg-[#f0f0f0]" : props.bgColor
        )}
      >
        <div className="flex justify-between px-4 lg:px-10 py-12 items-center w-full">
          <Link onClick={() => setMobileExpand(false)} href="/">
            <Image
              src={Logo}
              alt="Mortgage Hub Logo"
              className="w-60 lg:w-80"
            />
          </Link>
          <button
            className="cursor-pointer"
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
              className="w-full flex flex-col items-center justify-between text-2xl font-semibold h-[40%] mt-12 overflow-auto "
            >
              {items.map((i) => (
                <Link
                  key={i.key}
                  href={`/${i.key}`}
                  className="text-black"
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
    </>
  );
};

export default Header;
