"use client";
import { verifyEmail } from "@/actions/verification";
import { Button, Result, Spin } from "antd";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaMailBulk } from "react-icons/fa";
import React from "react";
import { FiMail } from "react-icons/fi";
import { motion } from "framer-motion";

import { cn } from "@/app/utils/";
import Header from "@/components/Header";
import Link from "next/link";
import { LoadingOutlined } from "@ant-design/icons";

const VerifyEmail = () => {
  const params = useSearchParams();
  const token = params.get("token");
  const [message, setMessage] = useState("");
  const [state, setState] = useState(false);

  useEffect(() => {
    (async () => {
      if (token) {
        try {
          await verifyEmail(token as string);
          setState(true);
          setMessage(
            "Congratulations!!, you have successfully verified your email! Please click on login to continue."
          );
        } catch (error) {
          setMessage(
            "It seems your verification link has expired or is invalid. Please request a new verification email to proceed."
          );
        }
      } else {
        setMessage(
          "It seems your verification link has expired or is invalid. Please request a new verification email to proceed."
        );
      }
    })();
  }, [token]);

  return (
    <div className="bg-gradient-to-b from-blue-50 to-indigo-200 ">
      <Header bgColor="bg-transparent" />
      <div
        className="flex flex-col items-center justify-center relative overflow-hidden px-4 sm:px-8"
        style={{ minHeight: "min(800px, 100vh)" }}
      >
        {/* Decorative Glow Effect */}
        {!message ? (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 80 }} spin />} />
        ) : (
          <>
            <div className="absolute top-1/3 left-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] bg-blue-300 opacity-20 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>

            <Result
              icon={
                <div className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:!w-32 md:h-32 bg-white rounded-full shadow-lg">
                  <FiMail
                    size={48}
                    className="text-blue-600 sm:text-4xl lg:text-5xl"
                  />
                </div>
              }
              status="info"
              title={
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 text-center">
                  Email verification
                </h1>
              }
              subTitle={
                <p className="!text-base sm:!text-lg text-gray-600 max-w-xs sm:max-w-sm lg:max-w-lg text-center mt-2">
                  {message}
                </p>
              }
              extra={
                <div className="flex flex-col sm:flex-row gap-4 mt-6 items-center justify-center w-full sm:w-auto">
                  {state ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.3,
                        duration: 0.6,
                        type: "spring",
                        stiffness: 200,
                      }}
                    >
                      <Link href="/login">
                        <Button
                          size="large"
                          type="primary"
                          shape="round"
                          className={cn(
                            "!w-full sm:!w-auto !px-6 sm:!px-10 !py-3 sm:!py-4 !text-base sm:!text-lg font-semibold shadow-xl transition-all duration-200 transform hover:scale-105",
                            "bg-gradient-to-r from-blue-600 to-indigo-500 border-none text-white"
                          )}
                        >
                          Continue to Login
                        </Button>
                      </Link>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.5,
                        duration: 0.6,
                        type: "spring",
                        stiffness: 200,
                      }}
                    >
                      <Link href="email/resend">
                        <Button
                          size="large"
                          type="primary"
                          shape="round"
                          className={cn(
                            "!w-full sm:!w-auto !px-6 sm:!px-10 !py-3 sm:!py-4 !text-base sm:!text-lg font-semibold shadow-xl transition-all duration-200 transform hover:scale-105 !bg-red-500",
                            "bg-white border-gray-300 text-gray-700"
                          )}
                        >
                          Resend Verification Email
                        </Button>
                      </Link>
                    </motion.div>
                  )}
                </div>
              }
              className="flex flex-col items-center text-center gap-4 p-6 sm:p-8 rounded-xl bg-white bg-opacity-75 shadow-2xl border border-gray-200 w-full max-w-xl"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
