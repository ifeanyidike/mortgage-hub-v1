"use client";
import { Error404Page } from "@/errors/";
import Link from "next/link";
import React from "react";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  console.log("error", error, reset);
  return (
    <>
      <Error404Page
        tag="401 Unauthorized"
        title="You're not authorized to access this page"
        description={
          <>
            You're not authorized to access this page. Check the URL or&nbsp;
            <Link
              href="/"
              className="text-primary font-medium hover:text-primary-active"
            >
              Return Home
            </Link>
          </>
        }
      />
    </>
  );
};

export default Error;
