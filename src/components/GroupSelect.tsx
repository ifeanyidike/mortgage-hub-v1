"use client";
import React from "react";
import { Button, Select, Space } from "antd";

const handleChange = (value: string, key: string) => {
  console.log(`selected ${value} - ${key}`);
};

type Props = {
  mb?: string;
  btnColor?: string;
  data: {
    key: string;
    placeholder: string;
    options: {
      label: string;
      value: string;
    }[];
  }[];
};

const GroupSelect = (props: Props) => {
  const { data, btnColor = "", mb = "mb-40" } = props;
  return (
    <div className={`mt-auto ${mb} mx-auto`}>
      <Space
        wrap
        size="large"
        className="flex flex-col gap-8 mt-24 md:flex-row flex-wrap lg:items-center lg:justify-center lg:content-center"
      >
        {data.map((d) => (
          <Select
            size="large"
            style={{
              width: 250,
              height: 50,
              fontFamily: "Montserrat, sans-serif",
            }}
            className="!placeholder-black !border !rounded-lg !text-black group-select"
            allowClear
            onChange={(value) => handleChange(value, d.key)}
            placeholder={d.placeholder}
            options={d.options}
            key={d.key}
          />
        ))}

        <Button
          type="primary"
          shape="round"
          size="large"
          style={{ height: 50 }}
          className={`uppercase text-white w-40 mx-auto !font-bold !text-xl ${btnColor}`}
        >
          Search
        </Button>
      </Space>
    </div>
  );
};

export default GroupSelect;
