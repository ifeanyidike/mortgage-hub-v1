"use client";
import React from "react";
import { Button, Select, Space } from "antd";
import GroupSelect from "@/components/GroupSelect";

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

const lenderType = {
  key: "lenderType",
  placeholder: "Lender type",
  options: [
    { label: "Private lender", value: "private" },
    { label: "Public lender", value: "public" },
  ],
};

const reviews = {
  key: "reviews",
  placeholder: "Reviews",
  options: [
    { label: "5 stars", value: "5" },
    { label: "4 stars", value: "4" },
    { label: "3 stars", value: "3" },
    { label: "2 stars", value: "2" },
    { label: "1 star", value: "1" },
  ],
};

const data = [locations, lenderType, reviews];

const LenderHomeSelect = () => {
  return <GroupSelect data={data} />;
};

export default LenderHomeSelect;
