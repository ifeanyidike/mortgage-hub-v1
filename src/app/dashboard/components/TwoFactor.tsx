"use client";
import React, { useState, useRef, ChangeEvent } from "react";
import { motion } from "framer-motion";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
} from "@/app/dashboard-components/modal";
import { KeenIcon } from "@/app/dashboard-components";
import { Input, Spin } from "antd";
import { CloseOutlined, LoadingOutlined } from "@ant-design/icons";
import { FaCheck, FaPhone } from "react-icons/fa6";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { MessageInstance } from "antd/es/message/interface";
import { verifyPhone } from "@/actions/verification";
import { customError } from "@/server/error";
import { observer } from "mobx-react-lite";
import { regularUserStore } from "@/app/store/regularUserStore";
import { useSession } from "next-auth/react";

const TwoFactor = observer(
  ({
    open,
    onClose,
    phone,
    handleSendVerificationText,
    phoneVerificationTextPending,
    messageApi,
  }: {
    open: boolean;
    onClose: () => void;
    phone: string | null | undefined;
    handleSendVerificationText: (phone: string) => Promise<void>;
    phoneVerificationTextPending: boolean;
    messageApi: MessageInstance;
  }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isPhoneStep, setIsPhoneStep] = useState(!phone);
    const [phoneNumber, setPhoneNumber] = useState(phone || "");
    const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""));
    const { data: session } = useSession();

    const inputRefs = Array(6)
      .fill(0)
      .map(() => useRef<any>(null));

    const handleInputChange = (
      index: number,
      e: ChangeEvent<HTMLInputElement>
    ) => {
      const { value } = e.target;
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value.slice(-1);
      setOtpValues(newOtpValues);

      if (value.length === 1 && index < inputRefs.length - 1) {
        inputRefs[index + 1].current?.focus();
      } else if (value.length === 0 && index > 0) {
        inputRefs[index - 1].current?.focus();
      }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
      if (e.key === "Backspace" && !otpValues[index] && index > 0) {
        inputRefs[index - 1].current?.focus();
      }
    };

    const handlePhoneSubmit = async () => {
      // setIsLoading(true);
      // setTimeout(() => {
      //   setIsLoading(false);
      //   setIsPhoneStep(false);
      // }, 2000);
      console.log("phone number", phoneNumber);
      await handleSendVerificationText(phoneNumber);
      setIsPhoneStep(false);
    };

    const handleVerifyPhone = async () => {
      const user_id = session?.user?.id;
      if (!user_id) return;
      try {
        setIsLoading(true);
        console.log("user_id", user_id);
        await verifyPhone(user_id, otpValues.join(""), phoneNumber);
        messageApi.open({
          type: "success",
          content: "Phone number successfully verified",
        });

        await regularUserStore.loadUserProfile(
          regularUserStore.user_profile?.user_id!
        );
        onClose();
      } catch (error: any) {
        console.error("Failed to verify the phone number", error);
        messageApi.open({
          type: "error",
          content: "Failed to verify the phone number.",
        });

        const serializedError = customError.serializeError(error);
        messageApi.open({
          type: "error",
          content: serializedError,
        });

        console.log("Serialized Axios error:", serializedError);
      } finally {
        setIsLoading(false);
      }

      // await handleVerifyPhone(otpValues.join(""));
    };

    return (
      <Modal open={open} onClose={onClose}>
        <ModalContent className="modal-center w-full max-w-[450px] p-6 relative modal-class">
          {(isLoading || phoneVerificationTextPending) && (
            <div className="absolute top-0 left-0 w-full h-full bg-gray-100/50 grid place-items-center z-10">
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />}
              />
            </div>
          )}

          <ModalHeader className="flex justify-between items-center pb-4">
            <h2 className="font-bold text-gray-800">
              Two-Factor Authentication
            </h2>
            <button
              className="btn btn-sm btn-icon btn-light btn-clear"
              onClick={onClose}
            >
              <KeenIcon icon="cross" />
            </button>
          </ModalHeader>

          <ModalBody className="space-y-6">
            {isPhoneStep ? (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center space-y-8"
              >
                <div className="relative">
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-md mx-auto"
                  >
                    <FaPhone className="w-10 h-10 text-white" />
                  </motion.div>
                </div>
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-lg font-semibold mt-6 mb-8 text-gray-700"
                >
                  Enter Phone Number
                </motion.h3>

                <PhoneNumberInput onChange={(phone) => setPhoneNumber(phone)} />
                <motion.button
                  className={`btn btn-primary flex justify-center w-full mt-6 ${
                    !phoneNumber && "opacity-50 pointer-events-none"
                  }`}
                  onClick={handlePhoneSubmit}
                  disabled={!phoneNumber}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  Send Code
                </motion.button>
              </motion.div>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center space-y-8"
                >
                  <h3 className="text-lg font-medium text-gray-900 mb-5">
                    Verify Your Phone
                  </h3>
                  <motion.img
                    src={"/media/illustrations/34.svg"}
                    className="h-20 mb-2 mx-auto"
                    alt=""
                  />
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-700 mb-1.5">
                      Enter the verification code we sent to
                    </span>
                    <a href="#" className="text-sm font-medium text-gray-900">
                      {phoneNumber ||
                        `****** ${phoneNumber.slice(phoneNumber.length - 4)}`}
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7 }}
                  className="flex space-x-3 justify-center"
                >
                  {Array(6)
                    .fill(0)
                    .map((_, i) => (
                      <Input
                        key={i}
                        maxLength={1}
                        ref={inputRefs[i]}
                        value={otpValues[i]}
                        onChange={(e) => handleInputChange(i, e)}
                        onKeyDown={(e) => handleKeyDown(i, e)}
                        className="text-center text-xl font-bold w-12 h-12 bg-gray-100 rounded-lg border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md transition-all duration-150 ease-in-out"
                      />
                    ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="flex flex-col items-center space-y-4 mt-6"
                >
                  <button
                    className="btn btn-primary flex justify-center w-full"
                    onClick={handleVerifyPhone}
                  >
                    Continue
                  </button>
                  <span className="text-xs text-gray-700">
                    Didn&apos;t receive a code?{" "}
                    <a href="#" className="link text-primary font-medium">
                      Resend
                    </a>
                  </span>
                </motion.div>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }
);

export default TwoFactor;

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
      className="flex items-center bg-gray-50 rounded-full shadow-lg  py-2 px-4 w-full lg:w-[80%] mx-auto mt-4 border border-gray-200"
    >
      <PhoneInput
        country={"ca"}
        value={phone}
        onChange={handlePhoneChange}
        inputClass="!border-none !bg-transparent !w-full !text-gray-700 !outline-none"
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
