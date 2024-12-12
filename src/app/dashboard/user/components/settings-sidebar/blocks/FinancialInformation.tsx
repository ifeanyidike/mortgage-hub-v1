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

// // Financial Information
// table.decimal("savings_amount", 15, 2).nullable();
// table.decimal("credit_card_balance", 15, 2).nullable();
// table.decimal("other_debt", 15, 2).nullable();

const FinancialInformation = observer(() => {
  const profile = regularUserStore.user_profile;
  console.log("profile: ", profile);
  const [messageApi, contextHolder] = message.useMessage();
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState<{
    savings_amount?: number | null;
    credit_card_balance?: number | null;
    other_debt?: number | null;
  }>({
    savings_amount: profile?.savings_amount,
    credit_card_balance: profile?.credit_card_balance,
    other_debt: profile?.other_debt,
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
      <div className="card-header" id="financial_information">
        <h3 className="card-title">Financial Information</h3>
      </div>
      <div className="card-body grid gap-5 lg:py-7.5">
        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
          <label className="form-label max-w-56">Savings Amount</label>
          <Space direction="vertical" className="w-full" size={12}>
            <InputNumber<number>
              className="!input !w-full"
              defaultValue={data.savings_amount!}
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) =>
                value?.replace(/\$\s?|(,*)/g, "") as unknown as number
              }
              onChange={(e) => {
                setData({
                  ...data,
                  savings_amount: e,
                });
              }}
            />
          </Space>
        </div>

        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
          <label className="form-label max-w-56">Credit Card Balance</label>

          <Space direction="vertical" className="w-full" size={12}>
            <InputNumber<number>
              className="!input !w-full"
              defaultValue={data.credit_card_balance!}
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) =>
                value?.replace(/\$\s?|(,*)/g, "") as unknown as number
              }
              onChange={(e) => {
                setData({
                  ...data,
                  credit_card_balance: e,
                });
              }}
            />
          </Space>
        </div>

        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
          <label className="form-label max-w-56">Other Debts</label>

          <Space direction="vertical" className="w-full" size={12}>
            <InputNumber<number>
              className="!input !w-full"
              defaultValue={data.other_debt!}
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) =>
                value?.replace(/\$\s?|(,*)/g, "") as unknown as number
              }
              onChange={(e) => {
                setData({
                  ...data,
                  other_debt: e,
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

export { FinancialInformation };
