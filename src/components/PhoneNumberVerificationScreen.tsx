"use client";
import { cn } from "@/app/utils/";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { motion } from "framer-motion";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";

const PhoneNumberVerificationScreen = () => {
  return (
    <main className="flex flex-col items-center justify-center max-h-screen bg-white p-6">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={cn(
          "capitalize py-3 px-8 lg:px-16 text-white text-xl lg:text-2xl font-bold rounded-xl shadow-lg",
          "bg-gradient-to-r from-orange-500 to-red-500"
        )}
      >
        Phone Number Verification
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="rounded-3xl bg-white w-full max-w-lg p-8 lg:p-12 mt-8 flex flex-col items-center shadow-2xl border border-gray-200"
      >
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="absolute -top-6 -right-16 rounded-full bg-gray-100 px-5 py-2 shadow-md font-semibold text-lg text-gray-600"
          >
            <p>**********</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex items-center justify-center w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-md"
          >
            <FaPhone className="w-10 h-10 text-white" />
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex items-center justify-center bg-gradient-to-r from-green-500 to-teal-500 w-48 p-3 rounded-full mt-12 shadow-lg"
        >
          <FaCheck color="white" className="w-6 h-6" />
          <span className="text-xl font-semibold pl-3 text-white">Phone</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-xl font-semibold mt-6 mb-8 text-gray-700"
        >
          Enter Phone Number
        </motion.p>

        <PhoneNumberInput onChange={() => {}} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="w-full mt-8"
        >
          <Button
            size="large"
            type="primary"
            className="w-full uppercase bg-gradient-to-r from-orange-500 to-red-500 border-none text-white font-semibold rounded-full shadow-md hover:opacity-90"
            shape="round"
          >
            Send Code
          </Button>
        </motion.div>
      </motion.div>
    </main>
  );
};

export default PhoneNumberVerificationScreen;

interface PhoneNumberInputProps {
  onChange: (phone: string) => void;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({ onChange }) => {
  const [phone, setPhone] = useState("");

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    onChange(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
      className="flex items-center bg-gray-50 rounded-full shadow-lg py-2 px-4 w-full lg:w-[80%] mx-auto mt-4 border border-gray-200"
    >
      <PhoneInput
        country={"ca"}
        value={phone}
        onChange={handlePhoneChange}
        inputClass="!border-none !bg-transparent !w-full !text-gray-700 !outline-none !text-lg"
        buttonClass="!border-none !bg-transparent"
        dropdownClass="!bg-white !shadow-md !rounded"
        placeholder="1234 5678 9101"
        disableDropdown={false}
        inputProps={{
          name: "phone",
          required: true,
          autoFocus: true,
        }}
      />
      {phone && (
        <button
          onClick={() => setPhone("")}
          className="text-gray-400 hover:text-gray-600 transition duration-200"
        >
          <CloseOutlined className="w-5 h-5" />
        </button>
      )}
    </motion.div>
  );
};
