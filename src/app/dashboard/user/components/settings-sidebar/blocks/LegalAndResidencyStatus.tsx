"use client";
import { updateUserProfile } from "@/actions/regular_user";
import { regularUserStore } from "@/app/store/regularUserStore";
import { isSubsetMatching } from "@/app/utils";
import { UserData } from "@/types/general";
import { LoadingOutlined } from "@ant-design/icons";
import { Input, InputNumber, message, Select, Space, Spin } from "antd";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";

const LegalAndResidencyStatus = observer(() => {
  const profile = regularUserStore.user_profile;
  console.log("profile: ", profile);
  const [messageApi, contextHolder] = message.useMessage();
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<{
    residency_status?: string;
    government_id_type?: string | null;
    government_id_number?: string | null;
  }>({
    residency_status: profile?.residency_status,
    government_id_type: profile?.government_id_type,
    government_id_number: profile?.government_id_number,
  });

  const handleSubmit = async () => {
    console.log("submitting");
    try {
      setSaving(true);

      await updateUserProfile(profile?.user_id!, data);

      // await getOne(profile?.user_id!);
      await regularUserStore.loadUserProfile(profile?.user_id!);
      setSaving(false);

      messageApi.open({
        type: "success",
        content: "Profile data has been successfully saved.",
      });
    } catch (error) {
      console.log("error", error);
      messageApi.open({
        type: "error",
        content: "An error occurred while saving your data.",
      });
      setSaving(false);
    }
  };

  const allowSubmit = !isSubsetMatching(data || {}, profile || {});
  return (
    <div className="card">
      {contextHolder}
      {saving && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-100/50 grid place-items-center z-10">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} />
        </div>
      )}
      <div className="card-header" id="legal_residency_status">
        <h3 className="card-title">Legal and Residency Status</h3>
      </div>
      <div className="card-body grid gap-5 lg:py-7.5">
        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
          <label className="form-label max-w-56">Residency Status</label>
          <Space direction="vertical" className="w-full" size={12}>
            <Select
              defaultValue={profile?.residency_status || "Not set"}
              // style={{ width: "100%" }}
              options={[
                { label: "Citizen", value: "citizen" },
                { label: "Permanent Resident", value: "permanent resident" },
                { label: "Work Permit", value: "work permit" },
                { label: "Not set" },
              ]}
              className="!w-full !input-no-border sidebar-form"
              style={{ fontSize: 12 }}
              size="large"
              onChange={(e) => {
                setData({
                  ...data,
                  residency_status: e,
                });
              }}
            />
          </Space>
        </div>

        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
          <label className="form-label max-w-56">Credit Card Balance</label>

          <Space direction="vertical" className="w-full" size={12}>
            <Select
              defaultValue={profile?.government_id_type || "Not set"}
              // style={{ width: "100%" }}
              options={[
                { label: "Passport", value: "passport" },
                { label: "Driver's License", value: "drivers license" },
                { label: "Health Card", value: "health card" },
                { label: "Citizenship Card", value: "citizenship card" },
                {
                  label: "Permanent Resident Card",
                  value: "permanent resident card",
                },
                {
                  label: "Certificate of Indian Status",
                  value: "certificate of indian status",
                },
                {
                  label: "Provincial or Territorial Identification Card",
                  value: "provincial or territorial identification card",
                },
                {
                  label: "Student Identity Card",
                  value: "student identity card",
                },
                { label: "Not set" },
              ]}
              className="!w-full !input-no-border !placeholder sidebar-form"
              style={{ fontSize: 12 }}
              size="large"
              onChange={(e) => {
                setData({
                  ...data,
                  residency_status: e,
                });
              }}
            />
          </Space>
        </div>

        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
          <label className="form-label max-w-56">Government ID Number</label>

          <Space direction="vertical" className="w-full" size={12}>
            <Input
              className="!input"
              defaultValue={data.government_id_number!}
              onChange={(e) => {
                setData({
                  ...data,
                  government_id_number: e.target.value,
                });
              }}
            />
          </Space>
        </div>

        <div className="flex justify-end pt-2.5">
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={!allowSubmit}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
});

export { LegalAndResidencyStatus };
