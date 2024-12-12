"use client";
import { cn } from "@/app/utils/";
import React, { useRef, ChangeEvent, useState } from "react";
import { motion } from "framer-motion";
import { LiaUnlockAltSolid } from "react-icons/lia";
import { Button, Input } from "antd";
import { QRCodeSVG } from "qrcode.react"; // Make sure to install 'qrcode.react'

const TOTPSetupAndVerificationScreen: React.FC = () => {
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [code, setCode] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  const inputRefs = Array(6)
    .fill(0)
    .map(() => useRef<any>(null));

  const secret = "JBSWY3DPEHPK3PXP"; // Example TOTP secret - replace with your backend-generated secret

  // Handle input changes with auto-focus
  const handleInputChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value) && index < inputRefs.length - 1) {
      inputRefs[index + 1].current?.focus();
    } else if (value.length === 0 && index > 0) {
      inputRefs[index - 1].current?.focus();
    }

    const newCode = [...code.split("")];
    newCode[index] = value;
    setCode(newCode.join(""));
  };

  const confirmCode = () => {
    if (code.length === 6) {
      // Here you would validate the code with your backend
      setIsConfirmed(true);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-700 to-purple-900 p-8">
      {isConfirmed ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center bg-white p-10 lg:p-14 rounded-3xl shadow-2xl border border-gray-100 max-w-md"
        >
          <LiaUnlockAltSolid className="w-24 h-24 text-green-500 mb-8" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            TOTP Confirmed!
          </h2>
          <p className="text-lg text-gray-600 mb-6 text-center">
            Your Time-based One-Time Password has been verified. Thank you!
          </p>
          <Button
            size="large"
            type="primary"
            className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-full shadow-md w-full hover:opacity-90"
          >
            Proceed
          </Button>
        </motion.div>
      ) : (
        <>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={cn(
              "capitalize py-4 px-10 lg:px-16 text-white text-3xl lg:text-4xl font-bold rounded-2xl shadow-lg",
              "bg-gradient-to-r from-pink-600 to-orange-500 min-w-80"
            )}
          >
            {isSetupComplete ? "Verify TOTP Code" : "Setup TOTP"}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl bg-white w-full max-w-md p-10 lg:p-14 mt-8 flex flex-col items-center shadow-2xl border border-gray-100"
          >
            {isSetupComplete ? (
              <>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="text-2xl font-semibold mt-8 mb-10 text-gray-700"
                >
                  Enter TOTP Code
                </motion.p>

                <div className="flex space-x-3 mb-8">
                  {Array(6)
                    .fill(0)
                    .map((_, i) => (
                      <Input
                        key={i}
                        maxLength={1}
                        ref={inputRefs[i]}
                        onChange={(e) => handleInputChange(i, e)}
                        className="text-center text-2xl font-bold w-14 h-14 bg-gray-100 rounded-lg border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md transition-all duration-150 ease-in-out"
                        style={{ transition: "all 0.2s" }}
                      />
                    ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="w-full mt-6"
                >
                  <Button
                    size="large"
                    type="primary"
                    onClick={confirmCode}
                    className="w-full uppercase bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-full shadow-lg hover:opacity-90 hover:shadow-xl transform transition-all duration-200 ease-out"
                    shape="round"
                  >
                    Confirm Code
                  </Button>
                </motion.div>
              </>
            ) : (
              <>
                <p className="text-lg font-semibold mb-8 text-gray-600">
                  Scan the QR Code below with your authenticator app
                </p>
                <QRCodeSVG
                  value={`otpauth://totp/YourAppName:${encodeURIComponent(
                    "user@example.com"
                  )}?secret=${secret}&issuer=YourAppName`}
                  size={180}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  className="shadow-lg rounded-md"
                />
                <Button
                  size="large"
                  type="primary"
                  onClick={() => setIsSetupComplete(true)}
                  className="w-full mt-8 uppercase bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold rounded-full shadow-md hover:opacity-90"
                  shape="round"
                >
                  Next: Enter Code
                </Button>
              </>
            )}
          </motion.div>
        </>
      )}
    </main>
  );
};

export default TOTPSetupAndVerificationScreen;
