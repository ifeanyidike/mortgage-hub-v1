"use client";
import { verifyEmail } from "@/actions/emailVerification";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const VerifyEmail = () => {
  const params = useSearchParams();
  const token = params.get("token");
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      if (token) {
        try {
          await verifyEmail(token as string);
          setMessage("Email successfully verified!");
        } catch (error) {
          setMessage("Invalid or expired token.");
        }
      }
    })();
  }, [token]);

  const verifyToken = async () => {
    // const res = await fetch(`/api/auth/verify?token=${token}`);
    // if (res.ok) {
    //   setMessage("Email successfully verified!");
    // } else {
    //   setMessage("Invalid or expired token.");
    // }
  };

  return (
    <div>
      <h1>Email Verification</h1>
      <p>{message}</p>
    </div>
  );
};

export default VerifyEmail;
