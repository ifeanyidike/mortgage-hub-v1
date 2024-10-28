"use client";
import React from "react";
import { Button, Select, Space } from "antd";
import GroupSelect from "@/components/GroupSelect";
import { constants } from "buffer";

const handleChange = (value: string, key: string) => {
  console.log(`selected ${value} - ${key}`);
};

const locations = {
  key: "location",
  placeholder: "Location",
  options: [
    { label: "Ontario", value: "Ontario" },
    { label: "Quebec", value: "Quebec" },
    { label: "Newfoundland and Labrador", value: "Newfoundland and Labrador" },
    { label: "British Columbia", value: "British Columbia" },
    { label: "Manitoba", value: "Manitoba" },
    { label: "Saskatchewan", value: "Saskatchewan" },
    { label: "Alberta", value: "Alberta" },
    { label: "Northwest Territories", value: "Northwest Territories" },
    { label: "Yukon", value: "Yukon" },
    { label: "Nunavut", value: "Nunavut" },
    { label: "New Brunswick", value: "New Brunswick" },
    { label: "Prince Edward Island", value: "Prince Edward Island" },
    { label: "Nova Scotia", value: "Nova Scotia" },
    { label: "Newfoundland and Labrador", value: "Newfoundland and Labrador" },
    { label: "Saskatchewan", value: "Saskatchewan" },
    { label: "Manitoba", value: "Manitoba" },
  ],
};

const loanType = {
  key: "loanType",
  placeholder: "Loan type",
  options: [
    { label: "Home Improvement", value: "home-improvement" },
    { label: "Refinance", value: "refinance" },
    { label: "Purchase", value: "purchase" },
    { label: "Second-hand", value: "second-hand" },
    { label: "Business", value: "business" },
    { label: "Other", value: "other" },
  ],
};
const rates = {
  key: "rates",
  placeholder: "Rates",
  options: [
    { label: "Fixed", value: "fixed" },
    { label: "Variable", value: "variable" },
    { label: "Negotiable", value: "negotiable" },
  ],
};

const data = [locations, loanType, rates];

const BrokersHomeSelect = () => {
  return <GroupSelect data={data} btnColor="!bg-black" mb="-mt-16" />;
};

export default BrokersHomeSelect;
