"use client";
import React, { useState } from "react";
import { Button, Select, Space } from "antd";
import GroupSelect from "@/components/GroupSelect";
import { constants } from "buffer";
import { brokerStore } from "@/app/store/brokerStore";

const province = {
  key: "province",
  placeholder: "Province",
  options: [
    { label: "Ontario", value: "Ontario" },
    // { label: "Quebec", value: "Quebec" },
    // { label: "Newfoundland and Labrador", value: "Newfoundland and Labrador" },
    // { label: "British Columbia", value: "British Columbia" },
    // { label: "Manitoba", value: "Manitoba" },
    // { label: "Saskatchewan", value: "Saskatchewan" },
    { label: "Alberta", value: "Alberta" },
    // { label: "Northwest Territories", value: "Northwest Territories" },
    // { label: "Yukon", value: "Yukon" },
    // { label: "Nunavut", value: "Nunavut" },
    // { label: "New Brunswick", value: "New Brunswick" },
    // { label: "Prince Edward Island", value: "Prince Edward Island" },
    // { label: "Nova Scotia", value: "Nova Scotia" },
    // { label: "Newfoundland and Labrador", value: "Newfoundland and Labrador" },
    // { label: "Saskatchewan", value: "Saskatchewan" },
    // { label: "Manitoba", value: "Manitoba" },
  ],
};

const city = {
  key: "city",
  placeholder: "City",
  options: [
    { label: "Toronto", value: "Toronto" },
    // { label: "Ottawa", value: "Ottawa" },
    // { label: "Montreal", value: "Montreal" },
    // { label: "Quebec City", value: "Quebec City" },
    { label: "Vancouver", value: "Vancouver" },
    { label: "Edmonton", value: "Edmonton" },
    { label: "Mississauga", value: "Mississauga" },
    // { label: "Winnipeg", value: "Winnipeg" },
    // { label: "Regina", value: "Regina" },
    // { label: "Saskatoon", value: "Saskatoon" },
    // { label: "Halifax", value: "Halifax" },
    // { label: "St. John's", value: "St. John's" },
    // { label: "Charlottetown", value: "Charlottetown" },
    // { label: "Fredericton", value: "Fredericton" },
    // { label: "Gatineau", value: "Gatineau" },
    // { label: "London", value: "London" },
    // { label: "Ottawa", value: "Ottawa" },
    // { label: "Montreal", value: "Montreal" },
    // { label: "Quebec City", value: "Quebec City" },
    // { label: "Vancouver", value: "Vancouver" },
    // { label: "Edmonton", value: "Edmonton" },
    // { label: "Winnipeg", value: "Winnipeg" },
    // { label: "Regina", value: "Regina" },
    // { label: "Saskatoon", value: "Saskatoon" },
    // { label: "Halifax", value: "Halifax" },
    // { label: "St. John's", value: "St. John's" },
    // { label: "Charlottetown", value: "Charlottetown" },
    // { label: "Fredericton", value: "Fredericton" },
    // { label: "Gatineau", value: "Gatineau" },
  ],
};

const brokerType = {
  key: "broker_type",
  placeholder: "Broker Type",
  options: [
    { label: "Mortgage Associate", value: "Mortgage Associate" },
    { label: "Mortgage Planner", value: "Mortgage Planner" },
    { label: "Mortgage Agent", value: "Mortgage Agent" },
    { label: "Mortgage Agent Level 1", value: "Mortgage Agent Level 1" },
  ],
};

const data = [province, city, brokerType];

const BrokersHomeSelect = () => {
  const [searchState, setSearchState] = useState({
    province: "",
    city: "",
    broker_type: "",
  });
  return (
    <GroupSelect
      data={data}
      btnColor="!bg-black"
      mb="-mt-16"
      onChangeCb={(value: string, key: string) => {
        console.log(`selected ${value} - ${key}`);
        setSearchState((prevState) => ({ ...prevState, [key]: value }));
      }}
      onSearchCb={() => {
        const { province, city, broker_type } = searchState;
        brokerStore.searchBrokers(city, province, broker_type);
      }}
    />
  );
};

export default BrokersHomeSelect;
