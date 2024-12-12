"use client";

import { Input, InputNumber, Select, message, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { updateUserProfile } from "@/actions/regular_user";
import { regularUserStore } from "@/app/store/regularUserStore";
import { leadStore, LeadDataType } from "@/app/store/leadStore";
import { useSession } from "next-auth/react";

const { TextArea } = Input;

const ProspectiveHomeInfo = observer(() => {
  const { data: session } = useSession();
  const profile = regularUserStore.user_profile;
  const [messageApi, contextHolder] = message.useMessage();
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<LeadDataType>();

  function onChange(key: keyof LeadDataType, value: number | string | null) {
    setData({
      ...((data || {}) as LeadDataType),
      [key]: value,
    });
  }

  const handleSubmitLeadRequest = async () => {
    console.log("submitting");
    console.log("data", data);
    try {
      setSaving(true);
      const result = await leadStore.createLead(session?.user?.id!, data!);
      if (result.status === "success") {
        messageApi.open({
          type: "success",
          content: "Lead information has been successfully saved.",
        });
      }
      // else {
      //   messageApi.open({ type: "error", content: result.message });
      // }
      setSaving(false);
    } catch (error: any) {
      console.log("error", error);
      messageApi.open({
        type: "error",
        content: error.message,
      });
      setSaving(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="relative bg-white text-gray-900 rounded-3xl shadow-xl border border-gray-400 p-8 lg:p-12">
      {contextHolder}
      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-white to-gray-50 rounded-3xl pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-4xl font-extrabold tracking-tight mb-4">
            Share Your Dream Home Details
          </h2>
          <p className="text-lg text-gray-600">
            Provide us with a few specifics to help us tailor your home-buying
            experience.
          </p>
        </div>

        {/* Form */}
        <form className="grid gap-8 lg:grid-cols-2">
          {/* Desired Property Price */}
          <div className="form-group">
            <label className="block text-lg font-semibold text-gray-700 mb-3">
              Desired Property Price
            </label>
            <InputNumber<number>
              className="!w-full !rounded-lg !px-5 !py-4 !text-lg !bg-gray-100 !border-gray-300 focus:!ring-2 focus:!ring-blue-500"
              placeholder="$ Enter property price"
              size="large"
              min={0}
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) =>
                value?.replace(/\$\s?|(,*)/g, "") as unknown as number
              }
              onChange={(value) => onChange("property_price", value)}
            />
          </div>

          {/* Down Payment Amount */}
          <div className="form-group">
            <label className="block text-lg font-semibold text-gray-700 mb-3">
              Down Payment Amount
            </label>
            <InputNumber<number>
              className="!w-full !rounded-lg !px-5 !py-4 !text-lg !bg-gray-100 !border-gray-300 focus:!ring-2 focus:!ring-blue-500"
              placeholder="$ Enter down payment amount"
              size="large"
              min={0}
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) =>
                value?.replace(/\$\s?|(,*)/g, "") as unknown as number
              }
              onChange={(value) => onChange("down_payment", value)}
            />
          </div>

          {/* Down Payment Source */}
          <div className="form-group">
            <label className="block text-lg font-semibold text-gray-700 mb-3">
              Down Payment Source
            </label>
            <Select
              className="w-full !rounded-lg !bg-gray-100 !text-lg"
              dropdownStyle={{
                backgroundColor: "#F3F4F6", // Dropdown light background
                color: "#374151", // Dropdown text color
              }}
              placeholder="Select down payment source"
              size="large"
              options={[
                { value: "savings", label: "Personal Savings" },
                { value: "gift", label: "Gift from Family/Friends" },
                { value: "loan", label: "Loan or Line of Credit" },
                { value: "rrsp", label: "RRSP (Home Buyers' Plan)" },
                { value: "inheritance", label: "Inheritance" },
                { value: "investment", label: "Proceeds from Investments" },
                {
                  value: "property_sale",
                  label: "Proceeds from Sale of Property",
                },
                { value: "grants", label: "Government Grants or Assistance" },
                { value: "business_profits", label: "Business Profits" },
                { value: "other", label: "Other" },
              ]}
              onChange={(value) => onChange("down_payment_source", value)}
            />
          </div>

          <div className="form-group">
            <label className="block text-lg font-semibold text-gray-700 mb-3">
              Property Type
            </label>
            <Select
              className="w-full !rounded-lg !bg-gray-100 !text-lg"
              dropdownStyle={{
                backgroundColor: "#F3F4F6", // Dropdown light background
                color: "#374151", // Dropdown text color
              }}
              placeholder="Select down property type"
              size="large"
              options={[
                { value: "detached", label: "Detached House" },
                { value: "semi_detached", label: "Semi-Detached House" },
                { value: "townhouse", label: "Townhouse (Rowhouse)" },
                { value: "condo", label: "Condominium (Condo)" },
                { value: "duplex", label: "Duplex" },
                { value: "triplex", label: "Triplex" },
                { value: "bungalow", label: "Bungalow" },
                { value: "cottage", label: "Cottage (Cabin)" },
                { value: "mobile_home", label: "Mobile Home" },
                { value: "tiny_home", label: "Tiny Home" },
                { value: "laneway_house", label: "Laneway House" },
                {
                  value: "secondary_suite",
                  label: "Secondary Suite (Basement Suite/In-Law Suite)",
                },
                { value: "penthouse", label: "Penthouse" },
                { value: "mansion", label: "Mansion" },
                { value: "estate", label: "Estate Home" },
                { value: "farmhouse", label: "Farmhouse" },
                { value: "acreage", label: "Acreage" },
                { value: "ranch", label: "Ranch" },
                { value: "co_op", label: "Co-Op Housing" },
                { value: "heritage_home", label: "Heritage Home" },
                { value: "vacation_property", label: "Vacation Property" },
                { value: "eco_friendly", label: "Eco-Friendly Home" },
              ]}
              onChange={(value) => onChange("property_type", value)}
            />
          </div>

          {/* Property Address */}
          <div className="form-group lg:col-span-2">
            <label className="block text-lg font-semibold text-gray-700 mb-3">
              Property Address (Optional)
            </label>
            <TextArea
              rows={3}
              placeholder="Enter the address of the property, if available"
              className="w-full !rounded-lg !px-5 !py-4 !text-lg !bg-gray-100 !border-gray-300 focus:!ring-2 focus:!ring-blue-500"
              onChange={(e) => onChange("property_address", e.target.value)}
            />
          </div>
        </form>

        {/* Submit Button */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={handleSubmitLeadRequest}
            className="px-10 py-4 bg-gradient-to-r from-blue-800 via-green-700 to-teal-700 text-white font-bold text-lg rounded-full shadow-lg hover:scale-105 transition-transform"
          >
            {saving && (
              <Spin
                indicator={
                  <LoadingOutlined
                    className="!text-yellow-400"
                    style={{ fontSize: 20 }}
                    spin
                  />
                }
              />
            )}{" "}
            Submit Details
          </button>
        </div>
      </div>
    </div>
  );
});

export { ProspectiveHomeInfo };
