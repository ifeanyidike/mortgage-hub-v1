"use client";
import React, { useState } from "react";
import { Button, Input, Form, Result, message } from "antd";
import { FiMail } from "react-icons/fi";
import { motion } from "framer-motion";
import cn from "classnames";
import Header from "@/components/Header";
import Link from "next/link";
import { resendVerificationEmail } from "@/actions/verification";

const ResendVerificationForm: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  const handleResendEmail = async (values: { email: string }) => {
    setLoading(true);
    try {
      await resendVerificationEmail(values.email);
      messageApi.open({
        type: "success",
        content: "Verification email sent to " + values.email,
      });
    } catch (error: any) {
      messageApi.open({
        type: "error",
        content: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-100">
      {contextHolder}
      <Header bgColor="bg-transparent" />
      <div
        className="flex flex-col items-center justify-center  px-4 sm:px-8"
        style={{ minHeight: "min(800px, 100vh)" }}
      >
        {/* Decorative Gradient and Glow */}
        <div className="absolute top-1/3 left-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-purple-300 opacity-20 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>

        <Result
          icon={<FiMail size={64} className="text-purple-600" />}
          status="info"
          title={
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 text-center">
              Resend Verification Email
            </h1>
          }
          subTitle={
            <p className="text-lg text-gray-600 max-w-xs sm:max-w-sm lg:max-w-lg text-center mt-2">
              Enter your email address below, and we&apos;ll send you a new
              verification link.
            </p>
          }
          extra={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
              className="w-full max-w-xl p-12 bg-white bg-opacity-75 shadow-xl rounded-3xl border border-gray-200"
            >
              <Form
                layout="vertical"
                onFinish={handleResendEmail}
                className="space-y-4"
              >
                <Form.Item
                  label={
                    <span className="text-gray-700 font-medium">
                      Email Address
                    </span>
                  }
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your email!" },
                    { type: "email", message: "Please enter a valid email!" },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="Enter your email"
                    prefix={<FiMail className="text-gray-400 text-2xl" />}
                    className="!rounded-xl !shadow-sm !p-3 !text-lg"
                  />
                </Form.Item>

                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
                    className="w-full sm:w-auto"
                  >
                    <Button
                      size="large"
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      shape="round"
                      className={cn(
                        "!w-full sm:!w-auto !px-6 sm:!px-10 !py-3 sm:!py-4 !text-lg !shadow-lg !transition-transform !transform hover:!scale-105",
                        "!bg-gradient-to-r !from-purple-500 !to-indigo-500 !border-none !text-white !font-semibold"
                      )}
                    >
                      Resend Verification Email
                    </Button>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
                    className="w-full sm:w-auto"
                  >
                    <Link href="/">
                      <Button
                        size="large"
                        type="default"
                        shape="round"
                        className={cn(
                          "!w-full sm:!w-auto !px-6 sm:!px-10 !py-3 sm:!py-4 !text-lg !font-semibold !shadow-lg",
                          "!transition-transform !transform hover:!scale-105 !bg-white !border-gray-300 !text-gray-700"
                        )}
                        onClick={() => console.log("Go to Home")}
                      >
                        Back to Home
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </Form>
            </motion.div>
          }
          className="flex flex-col items-center text-center gap-4"
        />
      </div>
    </div>
  );
};

export default ResendVerificationForm;
