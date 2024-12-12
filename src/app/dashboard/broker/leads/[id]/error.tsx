"use client";
import { Demo1Layout } from "@/app/dashboard/page-layout";
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
    <Demo1Layout>
      <Error404Page
        tag="401 Unauthorized"
        title="You're not authorized to access this page"
        description={
          <>
            No available lead matches the URL. Check the URL or&nbsp;
            <Link
              href="/dashboard/broker/leads"
              className="text-primary font-medium hover:text-primary-active"
            >
              Return to Lead Page
            </Link>
          </>
        }
      />
    </Demo1Layout>
  );
};

export default Error;
