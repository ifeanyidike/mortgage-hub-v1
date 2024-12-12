"use client";
import { updateUserProfile } from "@/actions/regular_user";
import { regularUserStore } from "@/app/store/regularUserStore";
import { isSubsetMatching } from "@/app/utils";
import { UserData } from "@/types/general";
import { LoadingOutlined } from "@ant-design/icons";
import { Input, InputNumber, message, Select, Space, Spin } from "antd";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { runes } from "runes2";

// table.string("marital_status", 50).nullable();
//     table.integer("number_of_dependents").nullable();

const MaritalFinancialStatus = observer(() => {
  const profile = regularUserStore.user_profile;
  console.log("profile: ", profile);
  const [messageApi, contextHolder] = message.useMessage();
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<{
    marital_status?: string | null;
    number_of_dependents?: number | null;
  }>({
    marital_status: profile?.marital_status,
    number_of_dependents: profile?.number_of_dependents,
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
      <div className="card-header" id="marital_financial_status">
        <h3 className="card-title">Marital and Financial Status</h3>
      </div>
      <div className="card-body grid gap-5 lg:py-7.5">
        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
          <label className="form-label max-w-56">Marital Status</label>
          <Space direction="vertical" className="w-full" size={12}>
            <Select
              defaultValue={profile?.marital_status || "Not set"}
              // style={{ width: "100%" }}
              options={[
                { label: "Married", value: "married" },
                { label: "Single", value: "single" },
                { label: "Not set" },
              ]}
              className="!w-full !input-no-border sidebar-form"
              style={{ fontSize: 12 }}
              size="large"
              onChange={(e) => {
                setData({
                  ...data,
                  marital_status: e,
                });
              }}
            />
            {/* <Input
              className="!input"
              defaultValue={data.marital_status!}
              onChange={(e) => {
                setData({
                  ...data,
                  marital_status: e.target.value,
                });
              }}
            /> */}
          </Space>
        </div>

        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
          <label className="form-label max-w-56">Credit Card Balance</label>

          <Space direction="vertical" className="w-full" size={12}>
            <InputNumber<number>
              className="!input !w-full"
              defaultValue={data.number_of_dependents!}
              onChange={(e) => {
                setData({
                  ...data,
                  number_of_dependents: e,
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

export { MaritalFinancialStatus };
