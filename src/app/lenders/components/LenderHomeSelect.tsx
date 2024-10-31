"use client";
import React, { useState } from "react";
import { Button, Select, Space } from "antd";
import GroupSelect from "@/components/GroupSelect";
import { useRouter } from "next/navigation";

const handleChange = (value: string, key: string) => {
  console.log(`selected ${value} - ${key}`);
};

const locations = {
  key: "location",
  placeholder: "Location",
  options: [
    { label: "Anywhere in Canada", value: "" },
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
    { label: "All", value: "" },
    { label: "Private lender", value: "private lender" },
    { label: "Direct lender", value: "direct lender" },
    { label: "Mortgage broker", value: "mortgage broker" },
    { label: "Mortgage Investment Corporation", value: "mortgage investment" },
    { label: "Credit Union", value: "credit union" },
    { label: "Trust Company", value: "trust company" },
  ],
};

const reviews = {
  key: "reviews",
  placeholder: "Reviews",
  options: [
    { label: "All", value: "" },
    { label: "5 stars", value: "5" },
    { label: "4 stars", value: "4" },
    { label: "3 stars", value: "3" },
    { label: "2 stars", value: "2" },
    { label: "1 star", value: "1" },
  ],
};

const data = [locations, lenderType, reviews];

const LenderHomeSelect = () => {
  const router = useRouter();
  const [searchState, setSearchState] = useState({
    location: "",
    lenderType: "",
    rating: "",
  });
  return (
    <GroupSelect
      data={data}
      onChangeCb={(value: string, key: string) => {
        console.log(`selected ${value} - ${key}`);
        setSearchState((prevState) => ({ ...prevState, [key]: value }));
      }}
      onSearchCb={() => {
        router.push(
          `/lenders/search?location=${searchState.location}&lenderType=${searchState.lenderType}&rating=${searchState.rating}`
        );
      }}
    />
  );
};

export default LenderHomeSelect;
