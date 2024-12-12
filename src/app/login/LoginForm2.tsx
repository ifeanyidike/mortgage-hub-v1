"use client";

import { useState, type MouseEvent } from "react";
import clsx from "clsx";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { message, Alert } from "antd";
import { getSession, useSession } from "next-auth/react";
import { KeenIcon } from "@/app/dashboard-components";
import { toAbsoluteUrl } from "@/app/utils";
import Header from "@/components/Header";
import { handleCredentialLogin } from "@/actions/auth";
import { handleSocialLogin } from "@/actions/auth";
import { CustomSessionUser } from "@/types/general";
import SocialLoginForm, { SocialLoginForm2 } from "./SocialLoginForm";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .min(3, "Minimum 3 characters")
    .max(50, "Maximum 50 characters")
    .required("Email is required"),
  password: Yup.string()
    .min(3, "Minimum 3 characters")
    .max(50, "Maximum 50 characters")
    .required("Password is required"),
});

const initialValues = {
  email: "",
  password: "",
  remember: false,
};

const LoginForm2 = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>("");
  const [messageApi, contextHolder] = message.useMessage();

  const togglePassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      console.log("called");
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("email", values.email);
        formData.append("password", values.password);

        const response = await handleCredentialLogin(formData);
        if (response.error) {
          messageApi.open({ type: "error", content: response.error.message });
          setError(response.error.message);
          return;
        }
        getSessionAndRedirect();
      } catch (error: any) {
        messageApi.open({ type: "error", content: error.message });
        setError(error.message);
      } finally {
        setLoading(false);
      }
    },
  });

  async function getSessionAndRedirect() {
    messageApi.open({ type: "success", content: "Login successful" });
    const userSession = await getSession();

    if (!userSession) {
      router.push("/");
      return;
    }

    const user = userSession.user as CustomSessionUser;
    if (user.role === "user") {
      router.push(`/dashboard/user?id=${user.id}`);
    } else if (user.role === "broker") {
      router.push(`/dashboard/broker?id=${user.id}`);
    }
  }

  const performSocialLogin = async () => {
    console.log("called performSocialLogin");
    try {
      setLoading(true);
      // await performAction(formData); // Handle Google login
      const formData = new FormData();
      await handleSocialLogin(formData);
      // await getSessionAndRedirect();
    } catch (error: any) {
      messageApi.open({ type: "error", content: error.message });
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      {/* <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0"
      /> */}
      <div className="relative flex items-center md:items-start md:mt-52 justify-center h-full">
        <div className="card max-w-lg w-full bg-white shadow-3xl rounded-xl border border-gray-400 p-10 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center space-y-2"
          >
            <h3 className="text-3xl font-bold text-gray-800">Welcome Back!</h3>
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/signup"
                className="text-primary font-semibold hover:underline"
              >
                Sign up
              </Link>
            </p>
          </motion.div>
          {/* <SocialLoginForm /> */}
          <SocialLoginForm2 />

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative flex items-center"
          >
            <span className="border-t border-gray-300 flex-grow"></span>
            <span className="mx-4 text-sm text-gray-500">OR</span>
            <span className="border-t border-gray-300 flex-grow"></span>
          </motion.div>

          {error && <Alert message={error} type="error" showIcon closable />}

          <form onSubmit={formik.handleSubmit} className="space-y-5" noValidate>
            <div>
              <label className="text-sm font-medium text-gray-900 mb-1 block">
                Email
              </label>
              <input
                type="email"
                {...formik.getFieldProps("email")}
                className={clsx(
                  "form-input w-full px-4 py-3 rounded-lg border focus:ring-primary focus:border-primary transition",
                  {
                    "border-red-500":
                      formik.touched.email && formik.errors.email,
                  }
                )}
                placeholder="Enter your email"
              />
              {formik.touched.email && formik.errors.email && (
                <span className="text-xs text-red-500 mt-1">
                  {formik.errors.email}
                </span>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-900 mb-1 block">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...formik.getFieldProps("password")}
                  className={clsx(
                    "form-input w-full px-4 py-3 rounded-lg border focus:ring-primary focus:border-primary transition",
                    {
                      "border-red-500":
                        formik.touched.password && formik.errors.password,
                    }
                  )}
                  placeholder="Enter your password"
                />
                <button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary transition"
                  onClick={togglePassword}
                >
                  <KeenIcon
                    icon={showPassword ? "eye-slash" : "eye"}
                    className="w-5 h-5"
                  />
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <span className="text-xs text-red-500 mt-1">
                  {formik.errors.password}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  {...formik.getFieldProps("remember")}
                  className="form-checkbox rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-700">Remember me</span>
              </label>
              <Link
                href="/auth/reset-password"
                className="text-sm font-semibold text-primary hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary w-full py-3 rounded-2xl font-semibold text-white bg-primary hover:bg-primary-dark transition focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-50 text-center flex justify-center"
              disabled={loading || formik.isSubmitting}
            >
              {loading ? "Signing In..." : "Sign In"}
            </motion.button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm2;
