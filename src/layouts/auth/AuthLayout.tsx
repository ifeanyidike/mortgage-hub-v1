"use client";
import { AuthLayoutProvider } from "./AuthLayoutProvider";
import { toAbsoluteUrl } from "@/app/utils";
import useBodyClasses from "@/hooks/useBodyClasses";
import { Fragment, PropsWithChildren } from "react";

const Layout = ({ children }: PropsWithChildren) => {
  // Applying body classes to set the background color in dark mode
  useBodyClasses("dark:bg-coal-500");

  return (
    <div
      style={{
        backgroundImage: "url('/media/images/2600x1200/bg-10.png')",
      }}
    >
      {/* <style>
        {`
          .page-bg {
            background-image: url('${toAbsoluteUrl(
              "/media/images/2600x1200/bg-10.png"
            )}');
          }
          .dark .page-bg {
            background-image: url('${toAbsoluteUrl(
              "/media/images/2600x1200/bg-10-dark.png"
            )}');
          }
        `}
      </style> */}
      <div className="flex items-center justify-center grow bg-center bg-no-repeat page-bg bg-[url('/media/images/2600x1200/bg-10.png')]">
        {/* <Outlet /> */}
        {children}
      </div>
    </div>
  );
};

const AuthLayout = ({ children }: PropsWithChildren) => (
  <AuthLayoutProvider>
    <Layout>{children}</Layout>
  </AuthLayoutProvider>
);

export { AuthLayout };
