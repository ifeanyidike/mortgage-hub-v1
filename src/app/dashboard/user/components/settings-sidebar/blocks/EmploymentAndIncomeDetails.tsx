"use client";
import { updateUserProfile } from "@/actions/regular_user";
import { regularUserStore } from "@/app/store/regularUserStore";
import { isSubsetMatching } from "@/app/utils";
import { UserData } from "@/types/general";
import { LoadingOutlined } from "@ant-design/icons";
import {
  DatePicker,
  DatePickerProps,
  InputNumber,
  message,
  Space,
  Spin,
} from "antd";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import dayjs from "dayjs";

const EmploymentAndIncomeDetails = observer(() => {
  const profile = regularUserStore.user_profile;
  console.log("profile: ", profile);
  const [messageApi, contextHolder] = message.useMessage();
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<{
    employer_name?: string | null;
    job_title?: string | null;
    annual_income?: number | null;
    employment_start_date?: string | null;
  }>({
    employer_name: profile?.employer_name,
    job_title: profile?.job_title,
    annual_income: profile?.annual_income,
    employment_start_date: profile?.employment_start_date,
  });

  const onOk = (value: DatePickerProps["value"]) => {
    console.log("onOk: ", value);
  };
  const dateFormat = "YYYY/MM/DD";

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
      <div className="card-header" id="employment_income_details">
        <h3 className="card-title">Employment and Income Details</h3>
      </div>
      <div className="card-body grid gap-5 lg:py-7.5">
        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
          <label className="form-label flex items-center gap-1 max-w-56">
            Employer Name
          </label>
          <input
            className="input"
            type="text"
            value={data.employer_name!}
            onChange={(e) =>
              setData({
                ...data,
                employer_name: e.target.value,
              })
            }
          />
        </div>

        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
          <label className="form-label max-w-56">Job Title</label>
          <input
            className="input"
            type="text"
            value={data.job_title!}
            // onChange={(e) => setData({ ...data, city: e.target.value })}
            onChange={(e) =>
              setData({
                ...data,
                job_title: e.target.value,
              })
            }
          />
        </div>

        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
          <label className="form-label max-w-56">Annual Income</label>

          <Space direction="vertical" className="w-full" size={12}>
            <InputNumber<number>
              className="!input !w-full"
              defaultValue={data.annual_income!}
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) =>
                value?.replace(/\$\s?|(,*)/g, "") as unknown as number
              }
              onChange={(e) => {
                setData({
                  ...data,
                  annual_income: e,
                });
              }}
            />
          </Space>
        </div>

        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
          <label className="form-label max-w-56">Employment Start Date</label>

          <Space direction="vertical" className="w-full" size={12}>
            <DatePicker
              defaultValue={
                data.employment_start_date
                  ? dayjs(
                      new Date(data.employment_start_date).toLocaleString(),
                      dateFormat
                    )
                  : null
              }
              onChange={(value, dateString) => {
                console.log("Selected Time: ", value);
                console.log("Formatted Selected Time: ", dateString);
                setData({
                  ...data,
                  employment_start_date: dateString as string,
                });
              }}
              onOk={onOk}
              className="!input !w-full"
              // className={cn(
              //   !isEditing && "!border-none !outline-none !border-0"
              // )}
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

export { EmploymentAndIncomeDetails };
