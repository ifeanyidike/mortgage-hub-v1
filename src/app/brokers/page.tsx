"use client";
import { sendVerifiationText, verifyPhone } from "@/actions/verification";
import Verification from "@/server/Verification";
import { PhoneFilled } from "@ant-design/icons";
import { Button, Form, GetProps, Input } from "antd";
import React, { useState } from "react";

type OTPProps = GetProps<typeof Input.OTP>;

const page = () => {
  const [code, setCode] = useState("");

  const [form] = Form.useForm();
  const onChange: OTPProps["onChange"] = (text) => {
    console.log("onChange:", text);
  };

  const sharedProps: OTPProps = {
    onChange,
  };

  const handleFinish = async (values: any) => {
    const { otp: otpString } = values;

    const otp = parseInt(otpString);

    if (!otp || otpString.includes(undefined)) {
      return form.setFields([
        {
          name: "otp",
          errors: ["OTP is invalid."],
        },
      ]);
    }
    await verifyPhone(otp);
  };
  return (
    <div className="grid place-items-center min-h-screen">
      <div className="flex flex-col gap-5">
        <Input size="large" placeholder="large size" prefix={<PhoneFilled />} />

        <Button
          onClick={async () => await sendVerifiationText()}
          type="primary"
        >
          Send OTP
        </Button>
        <Form form={form} onFinish={handleFinish}>
          <Form.Item
            name="otp"
            className="center-error-message !w-full"
            rules={[{ validator: async () => Promise.resolve() }]}
          >
            <Input.OTP className="!w-full" autoFocus />
          </Form.Item>

          <Form.Item noStyle>
            <Button block htmlType="submit" type="primary">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default page;
