"use client";
import { updateUserProfile } from "@/actions/regular_user";
import { regularUserStore } from "@/app/store/regularUserStore";
import { isSubsetMatching } from "@/app/utils";
import { UserData } from "@/types/general";
import { LoadingOutlined } from "@ant-design/icons";
import {
  DatePicker,
  DatePickerProps,
  Input,
  InputNumber,
  message,
  Space,
  Spin,
} from "antd";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { runes } from "runes2";

// table.string("social_insurance_number", 15)
//     table.boolean("credit_check_consent").defaultTo(false);
//     table.string("credit_score", 10).nullable();

const CreditHistory = observer(() => {
  const profile = regularUserStore.user_profile;
  console.log("profile: ", profile);
  const [messageApi, contextHolder] = message.useMessage();
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<{
    social_insurance_number?: string | null;
    credit_check_consent?: boolean;
    credit_score?: string | null;
  }>({
    social_insurance_number: profile?.social_insurance_number,
    credit_check_consent: profile?.credit_check_consent,
    credit_score: profile?.credit_score,
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
      <div className="card-header" id="credit_history">
        <h3 className="card-title">Credit History</h3>
      </div>
      <div className="card-body grid gap-5 lg:py-7.5">
        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
          <label className="form-label max-w-56">Social Security Number</label>
          <Space direction="vertical" className="w-full" size={12}>
            <Input
              className="!input"
              count={{
                show: true,
                max: 9,
                strategy: (txt) => runes(txt).length,
                exceedFormatter: (txt, { max }) =>
                  runes(txt).slice(0, max).join(""),
              }}
              defaultValue={data.social_insurance_number!}
              onChange={(e) => {
                setData({
                  ...data,
                  social_insurance_number: e.target.value,
                });
              }}
            />
          </Space>
        </div>

        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
          <label className="form-label max-w-56">Credit Score</label>

          <Space direction="vertical" className="w-full" size={12}>
            <Input
              className="!input"
              count={{
                show: false,
                max: 9,
                strategy: (txt) => runes(txt).length,
                exceedFormatter: (txt, { max }) =>
                  runes(txt).slice(0, max).join(""),
              }}
              defaultValue={data.credit_score!}
              onChange={(e) => {
                setData({
                  ...data,
                  credit_score: e.target.value,
                });
              }}
            />
          </Space>
        </div>

        <div className="flex flex-wrap gap-2.5 mb-1.5">
          <label className="form-label max-w-56">Credit check consent</label>
          <div className="flex flex-col items-start gap-5">
            <div className="flex flex-col gap-2.5">
              <label className="checkbox-group">
                <input
                  className="checkbox"
                  name="attributes"
                  type="checkbox"
                  defaultChecked={!!profile?.credit_check_consent}
                  // credit_check_consent
                  value={data?.credit_check_consent ? 1 : 0}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    setData({
                      ...data,
                      credit_check_consent: !value,
                    });
                  }}
                />
                <span className="checkbox-label">
                  Allow secure access to your credit score
                </span>
              </label>
              <div className="form-hint">
                Show task names next to ids for linked project tasks.
              </div>
            </div>
          </div>
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

export { CreditHistory };
