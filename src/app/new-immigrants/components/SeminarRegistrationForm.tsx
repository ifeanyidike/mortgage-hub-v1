"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { ReactNode } from "react";
import NewSeminarRegistrationBanner from "@/app/assets/Images/new-seminar-reg-banner.png";
import { Radio, Select } from "antd";

// Form Field Interface for strong typing
interface FormField {
  label: string;
  placeholder: string;
  type: "text" | "email" | "tel" | "select" | "radio";
  options?: string[];
}

// Section Interface for group typing
interface SectionProps {
  title: string;
  fields: FormField[];
}

// Attendee Interface for managing attendee state
interface Attendee {
  personal: Record<string, string>;
  address: Record<string, string>;
  seminar: Record<string, string>;
}

const SeminarRegistrationForm = () => {
  // Sample Fields for demonstration
  const personalInfoFields: FormField[] = [
    { label: "First Name", placeholder: "Enter your first name", type: "text" },
    { label: "Last Name", placeholder: "Enter your last name", type: "text" },
    { label: "Email Address", placeholder: "Enter your email", type: "email" },
  ];

  const addressInfoFields: FormField[] = [
    { label: "Address", placeholder: "Enter your address", type: "text" },
    { label: "City", placeholder: "Enter your city", type: "text" },
    {
      label: "State/Province",
      placeholder: "Select your state",
      type: "select",
      options: [
        // Canada Province
        "Alberta",
        "British Columbia",
        "Manitoba",
        "New Brunswick",
        "Newfoundland and Labrador",
        "Northwest Territories",
        "Nova Scotia",
        "Nunavut",
        "Ontario",
        "Prince Edward Island",
        "Quebec",
        "Saskatchewan",
        "Yukon",
      ],
    },
    {
      label: "Zip/Postal Code",
      placeholder: "Enter zip/postal code",
      type: "text",
    },
    { label: "Phone Number", placeholder: "Enter phone number", type: "tel" },
  ];

  const seminarQuestionsFields: FormField[] = [
    { label: "Full Title", placeholder: "Enter your title", type: "text" },
    {
      label: "Professional Position",
      placeholder: "Enter your position",
      type: "text",
    },
    {
      label: "Degree",
      placeholder: "Select degree",
      type: "radio",
      options: ["BA/BS", "Master’s", "Doctorate"],
    },
  ];

  // Component for rendering each section of the form
  const Section = ({ title, fields }: SectionProps) => (
    <motion.div
      //   className="p-6 bg-gray-100 rounded-lg mb-6 w-full shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="md:px-16 mb-16"
    >
      <h3 className="text-xl font-extrabold text-gray-800 mb-8">{title}</h3>
      {fields.map((field) => (
        <div key={field.label} className="mb-8 gap-8">
          <label className="text-gray-600 text-base mb-1 block font-bold">
            {field.label}
          </label>
          {field.type === "text" ||
          field.type === "email" ||
          field.type === "tel" ? (
            <input
              type={field.type}
              placeholder={field.placeholder}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          ) : field.type === "select" ? (
            <Select
              size="large"
              style={{ width: "100%", height: "50px" }}
              className="!font-[family-name:var(--font-montserrat)]"
              allowClear
              options={field.options?.map((option) => ({
                label: option,
                value: option.toLowerCase(),
              }))}
              placeholder={field.placeholder}
            />
          ) : (
            <Radio.Group size="large" onChange={() => {}}>
              {field.options?.map((option) => (
                <Radio
                  key={option}
                  className="!font-[family-name:var(--font-montserrat)]"
                  value={option}
                >
                  {option}
                </Radio>
              ))}
            </Radio.Group>
          )}
        </div>
      ))}
    </motion.div>
  );

  return (
    <section className="flex flex-col items-center md:px-16 py-6 ">
      <motion.div
        className="w-full mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Image
          src={NewSeminarRegistrationBanner}
          alt="Seminar"
          className="rounded-lg shadow-lg w-full"
        />
      </motion.div>

      {/* Registration Title */}
      <motion.h2
        className="text-lg md:text-2xl font-bold text-gray-800 bg-[#F2F2F2] p-5  md:pl-16 w-full mb-8 md:rounded-2xl"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        New Immigrant Seminar Registration
      </motion.h2>

      {/* Registration Form */}
      <motion.div
        className="bg-[#F2F2F2] md:rounded-[80px] shadow-lg w-full p-8 pt-16 lg:pt-8 md:p-12 mt-12 relative"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-base bg-[#FE621D] px-4 py-2 rounded text-white mb-8 absolute -top-4 left-8 md:left-20">
          Attendee 1
        </h3>
        <Section title="Personal Information" fields={personalInfoFields} />
        <Section title="Address Information" fields={addressInfoFields} />
        <Section title="Seminar Questions" fields={seminarQuestionsFields} />

        {/* Submit Button */}
        <motion.button
          className=" lg:ml-16 w-40 py-3 mt-6 font-semibold text-white bg-blue-600 rounded-3xl hover:bg-blue-700 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Submit
        </motion.button>
      </motion.div>
    </section>
  );
};

export default SeminarRegistrationForm;
