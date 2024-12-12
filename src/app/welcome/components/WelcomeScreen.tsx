"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaPiggyBank, FaCreditCard, FaHome, FaUserTie } from "react-icons/fa";
import { cn } from "@/app/utils/";
import { updateUserProfile } from "@/actions/regular_user";
import { useSession } from "next-auth/react";

type ToolOption =
  | "budgeting"
  | "credit_builder"
  | "mortgage_assistance"
  | "broker_finder";
type MainOption = "full" | "individual" | null;

export default function FinancialSupportOptions() {
  const [selectedOption, setSelectedOption] = useState<MainOption>(null);
  const [selectedTool, setSelectedTool] = useState<ToolOption | null>(null);
  const session = useSession();

  const handleUpdateProfile = async () => {
    // Update user profile with selected option
    // Example: updateUserProfile(selectedOption);
    if (!selectedOption) return;
    const tools = [] as (ToolOption | "all")[];
    if (selectedOption === "full") {
      tools.push("all");
    } else {
      if (!selectedTool) return;
      tools.concat(selectedTool);
    }
    // await updateUserProfile(session.data?.user?.id!, {
    //   tools_selection: { tools, do_later: false },
    // });
  };

  const handleSelectOption = (option: MainOption) => {
    if (option === "full") {
      setSelectedOption("full");
      setSelectedTool(null);
    } else if (option === "individual") {
      setSelectedOption("individual");
      setSelectedTool(null);
    }
  };

  const selectTool = (tool: ToolOption) => {
    setSelectedOption("individual");
    setSelectedTool((prev) => (prev === tool ? null : tool));
  };

  const toolDetails = [
    {
      name: "Budgeting App",
      icon: <FaPiggyBank />,
      toolId: "budgeting" as ToolOption,
      description: "Track expenses, set goals, and manage savings.",
    },
    {
      name: "Credit Builder App",
      icon: <FaCreditCard />,
      toolId: "credit" as ToolOption,
      description: "Improve your credit score with personalized guidance.",
    },
    {
      name: "Mortgage Assistance",
      icon: <FaHome />,
      toolId: "mortgage" as ToolOption,
      description: "Insights into mortgage options and application.",
    },
    {
      name: "Broker Finder",
      icon: <FaUserTie />,
      toolId: "broker" as ToolOption,
      description: "Connect with brokers based on your needs.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center py-6 px-4 lg:px-8">
      <motion.div
        // [#f5f5f6]
        className="w-full flex flex-col items-center bg-white shadow-xl border border-gray-300 rounded-3xl p-4 lg:p-8 space-y-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <h1 className="text-3xl font-extrabold text-center">
          Welcome to Your Financial Hub
        </h1>
        <p className="text-gray-600 text-base text-center max-w-3xl">
          Choose a financial support option tailored to your needs. Our tools
          will guide you through budgeting, credit building, mortgage
          assistance, and more.
        </p>

        {/* Option 1: Comprehensive Financial Support */}
        <motion.div
          className={`w-full p-6 rounded-lg border shadow-md transition ${
            selectedOption === "full"
              ? "bg-blue-100 border-blue-400"
              : "bg-blue-50 border-blue-200"
          }`}
        >
          <h2 className="text-xl font-bold text-blue-800 mb-4">
            Comprehensive Financial Support
          </h2>
          <p className="text-gray-700 mb-6">
            Opting for full support? Answer a few questions, and we&apos;ll
            automatically populate all the tools to provide you with
            comprehensive financial guidance.
          </p>

          {/* Tool Icons */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-around text-center mb-4"
          >
            {toolDetails.map(({ name, icon }) => (
              <div
                key={name}
                className="flex flex-col items-center bg-white bo-border p-8 rounded-2xl shadow-md"
              >
                <div className="text-4xl text-blue-600 mb-3">{icon}</div>
                <p className="text-base font-medium text-gray-800">{name}</p>
              </div>
            ))}
          </motion.div>

          {/* Select Full Option Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSelectOption("full")}
            className="mt-3 px-6 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
          >
            Select Comprehensive Support
          </motion.button>
        </motion.div>

        {/* Option 2: Select Individual Tools */}
        <motion.div
          className={cn(
            "w-full p-8 rounded-lg border shadow-md transition",
            selectedOption === "individual"
              ? "bg-green-100 border-green-400"
              : "bg-green-50 border-green-200"
          )}
        >
          <h2 className="text-xl font-bold text-green-800 mb-4">
            Select Individual Tools
          </h2>
          <p className="text-gray-700 mb-6">
            Prefer flexibility? Select an individual tool for personalized
            guidance in a specific financial area.
          </p>

          {/* Individual Tool Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-6">
            {toolDetails.map(({ name, icon, toolId, description }) => (
              <motion.div
                key={toolId}
                className={cn(
                  "flex flex-col items-center justify-between text-center p-8 bg-white rounded-xl border shadow-md hover:shadow-lg transition-all cursor-pointer transform",
                  selectedTool === toolId
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200"
                )}
                whileHover={{ scale: 1.05 }}
                onClick={() => selectTool(toolId)}
              >
                {/* Icon */}
                <div className="text-5xl text-green-600 mb-4">{icon}</div>

                {/* Tool Name */}
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {name}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-6 px-2">{description}</p>

                {/* Select Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // handleSelectOption("individual");
                    selectTool(toolId);
                  }}
                  className="mt-4 px-8 py-2 bg-green-600 text-white font-semibold rounded-xl shadow-md hover:bg-green-700 transition-colors transform"
                >
                  Select
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div
          className="w-full p-6 bg-gray-100 rounded-lg border border-gray-300 shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-gray-700 text-center text-sm">
            <strong>Data Handling:</strong> Your inputs and preferences are
            securely saved to enhance your experience across all tools. Privacy
            and security are our top priorities.
          </p>
        </motion.div>
        <motion.div
          className="w-full p-6 bg-blue-50 rounded-lg border border-blue-300 shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-xl font-semibold text-blue-800">
            Selected Option:
          </h3>
          {selectedOption === "full" ? (
            <p className="text-gray-800 mt-2">
              You&apos;ve chosen Comprehensive Financial Support.
            </p>
          ) : selectedTool ? (
            <p className="text-gray-800 mt-2">
              You&apos;ve selected the{" "}
              <strong>
                {toolDetails.find((tool) => tool.toolId === selectedTool)?.name}
              </strong>
              .
            </p>
          ) : (
            <p className="text-gray-800 mt-2">
              Please select an option above to proceed.
            </p>
          )}
        </motion.div>
        <motion.button
          className="flex items-center justify-center min-w-40 bg-blue-500 text-white rounded-full px-6 py-2 font-semibold hover:bg-blue-600 transition"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          disabled={!selectedOption || !selectedTool}
          onClick={async () => {
            handleUpdateProfile();
          }}
        >
          Continue
        </motion.button>
      </motion.div>
    </div>
  );
}
