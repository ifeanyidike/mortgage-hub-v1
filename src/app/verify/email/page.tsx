"use client";
import { verifyEmail } from "@/actions/verification";
import { Button } from "antd";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaMailBulk } from "react-icons/fa";

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
            "Congratulations!!, you have successfully verified your email!"
          );
        } catch (error) {
          setMessage("Invalid or expired token.");
        }
      }
    })();
  }, [token]);

  return (
    <div className="grid place-items-center h-screen">
      <div className="flex  flex-col justify-center items-center gap-8">
        <svg
          width="200px"
          x="0px"
          y="0px"
          viewBox="0 0 283.408 283.408"
          xmlSpace="preserve"
        >
          <g>
            <path
              style={{
                fill: "#FFDB77",
              }}
              d="M268.727,59.362c-3.471-2.903-7.939-4.655-12.819-4.655H27.5c-4.88,0-9.347,1.752-12.819,4.655 l127.023,82.341L268.727,59.362z"
            />
            <path
              style={{
                fill: "#FFDB77",
              }}
              d="M268.727,59.362l-127.023,82.341L14.681,59.362C10.294,63.031,7.5,68.542,7.5,74.708v133.991 c0,11.046,8.954,20,20,20h228.409c11.046,0,20-8.954,20-20V74.708C275.909,68.542,273.114,63.031,268.727,59.362z"
            />
            <path
              style={{
                fill: "#22313F",
              }}
              d="M283.408,208.699V74.708c0-15.279-12.421-27.5-27.5-27.5H27.5c-15.092,0-27.5,12.235-27.5,27.5 v133.991c0,15.104,12.285,27.5,27.5,27.5h228.408C271.132,236.199,283.408,223.792,283.408,208.699z M199.091,113.441 l68.088-44.137c0.8,1.666,1.229,3.507,1.229,5.404v131.436L199.091,113.441z M15,206.145V74.708c0-1.897,0.429-3.738,1.229-5.404 l68.088,44.137L15,206.145z M141.704,132.766L32.859,62.207H250.55L141.704,132.766z M27.5,221.199 c-1.555,0-3.039-0.299-4.414-0.82l73.846-98.76l40.692,26.378c2.483,1.609,5.678,1.608,8.16,0l40.692-26.378l73.846,98.76 c-1.375,0.521-2.859,0.82-4.414,0.82H27.5z"
            />
          </g>
        </svg>
        {/* <h1 className="text-3xl">Email Verification</h1> */}
        <p>{message}</p>
        {state && (
          <Button type="primary" className="w-40" size="large" href="/login">
            Login
          </Button>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
