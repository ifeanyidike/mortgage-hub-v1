"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaPiggyBank, FaCreditCard, FaHome, FaUserTie } from "react-icons/fa";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
} from "@/app/dashboard-components/modal";
import { KeenIcon } from "@/app/dashboard-components";
import Link from "next/link";
import { cn } from "@/app/utils";
import { updateUserProfile } from "@/actions/regular_user";
import { getSession, useSession } from "next-auth/react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

type ToolOption =
  | "budgeting"
  | "credit_builder"
  | "mortgage_assistance"
  | "broker_finder";
type MainOption = "full" | "individual" | null;

interface IModalWelcomeMessageProps {
  open: boolean;
  onClose: () => void;
}

const ModalWelcomeMessage = ({ open, onClose }: IModalWelcomeMessageProps) => {
  const [selectedOption, setSelectedOption] = useState<MainOption>(null);
  const [selectedTool, setSelectedTool] = useState<ToolOption | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const session = useSession();

  const toolDetails = [
    {
      name: "Budgeting App",
      icon: <FaPiggyBank />,
      toolId: "budgeting" as ToolOption,
      description: "Track expenses, set goals, and manage savings.",
    },
    {
      name: "Credit Builder",
      icon: <FaCreditCard />,
      toolId: "credit_builder" as ToolOption,
      description: "Improve your credit score with personalized guidance.",
    },
    {
      name: "Mortgage Assistance",
      icon: <FaHome />,
      toolId: "mortgage_assistance" as ToolOption,
      description: "Insights into mortgage options and application.",
    },
    {
      name: "Broker Finder",
      icon: <FaUserTie />,
      toolId: "broker_finder" as ToolOption,
      description: "Connect with brokers based on your needs.",
    },
  ];

  const handleSelectOption = (option: MainOption) => {
    setSelectedOption(option);
    if (option === "full") setSelectedTool(null);
  };

  const selectTool = (tool: ToolOption) => {
    setSelectedOption("individual");
    setSelectedTool((prev) => (prev === tool ? null : tool));
  };

  const updateTools = async () => {
    if (!selectedOption) return;
    try {
      setIsLoading(true);
      const tools = [] as (ToolOption | "all")[];
      if (selectedOption === "full") {
        tools.push("all");
      } else {
        if (!selectedTool) return;
        tools.concat(selectedTool);
      }

      await updateUserProfile(session.data?.user?.id!, {
        tools_selection: { tools, do_later: false },
      });

      await getSession();

      setSelectedOption(null);
      setSelectedTool(null);
      onClose();
    } catch (error) {
      console.error("Failed to update user profile:", error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDoLater = async () => {
    try {
      setIsLoading(true);
      await updateUserProfile(session.data?.user?.id!, {
        tools_selection: { tools: [], do_later: true },
      });
      await getSession();
      setSelectedOption(null);
      setSelectedTool(null);
      onClose();
    } catch (error) {
      console.error("Failed to update user profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContent className="modal-center w-full max-w-[800px] p-6 modal-class modal-content relative">
        {isLoading && (
          <div className="absolute top-0 left-0 w-full h-full  bg-gray-100/50 grid place-items-center z-10">
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />}
            />
          </div>
        )}
        <ModalHeader className="flex justify-between items-center border-b pb-4">
          <h2 className="font-bold text-gray-800">
            Choose Your Financial Support
          </h2>
          <button
            className="btn btn-sm btn-icon btn-light btn-clear"
            onClick={onClose}
          >
            <KeenIcon icon="cross" />
          </button>
        </ModalHeader>
        <ModalBody className="space-y-6">
          <div className="flex flex-col items-center gap-4">
            <img
              src="/media/illustrations/21.svg"
              alt="Welcome Illustration"
              className="max-h-[120px] mb-4 dark:hidden"
            />
            <h3 className="text-lg font-semibold text-gray-800 text-center">
              Welcome to Your Financial Hub
            </h3>
            <p className="text-gray-600 text-center text-sm">
              Choose a comprehensive financial solution or individual tools to
              assist with budgeting, credit building, and more.
            </p>
          </div>

          <div className="space-y-4">
            <motion.div
              className={cn(
                "rounded-lg p-6 border shadow-md transition-all cursor-pointer",
                selectedOption === "full"
                  ? "bg-blue-100 border-blue-400"
                  : "bg-blue-50 border-blue-200"
              )}
              onClick={() => handleSelectOption("full")}
              whileHover={{ scale: 1.02 }}
            >
              <h4 className="font-bold text-blue-800 mb-2">
                Comprehensive Support
              </h4>
              <p className="text-gray-700 text-sm">
                Get all the tools to help you manage your finances in one place.
              </p>
            </motion.div>

            <motion.div
              className={cn(
                "rounded-lg p-6 border shadow-md transition-all cursor-pointer",
                selectedOption === "individual"
                  ? "bg-green-100 border-green-400"
                  : "bg-green-50 border-green-200"
              )}
              onClick={() => handleSelectOption("individual")}
              whileHover={{ scale: 1.02 }}
            >
              <h4 className="font-bold text-green-800 mb-2">
                Individual Tools
              </h4>
              <p className="text-gray-700 text-sm">
                Choose specific tools tailored to your financial goals.
              </p>
            </motion.div>

            {selectedOption === "individual" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {toolDetails.map(({ name, icon, toolId, description }) => (
                  <motion.div
                    key={toolId}
                    className={cn(
                      "p-4 rounded-lg border shadow-md transition-all cursor-pointer",
                      selectedTool === toolId
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200"
                    )}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => selectTool(toolId)}
                  >
                    <div className="text-4xl text-green-600 mb-2">{icon}</div>
                    <h5 className="text-md font-medium text-gray-800">
                      {name}
                    </h5>
                    <p className="text-sm text-gray-600">{description}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          <div className="text-center btn-group mx-auto flex justify-center gap-4">
            <button
              className="btn btn-primary px-6 py-3"
              disabled={
                !selectedOption ||
                (selectedOption === "individual" && !selectedTool)
              }
              onClick={updateTools}
            >
              Confirm Selection
            </button>

            <button
              className="btn btn-danger btn-outline px-6 py-3"
              onClick={handleDoLater}
            >
              Do later
            </button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export { ModalWelcomeMessage };
