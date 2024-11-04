"use client";
import React, { useState } from "react";
import { Button, Select, Space } from "antd";
import { runInAction } from "mobx";
import { brokerStore } from "@/app/store/brokerStore";

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
  onChangeCb: (value: string, key: string) => void;
  onSearchCb: () => void;
};

const GroupSelect = (props: Props) => {
  const { data, btnColor = "", mb = "mb-40" } = props;
  // const [searchState, setSearchState] = useState({
  //   province: "",
  //   city: "",
  //   broker_type: "",
  // });

  // const handleChange = (value: string, key: string) => {
  //   console.log(`selected ${value} - ${key}`);
  //   setSearchState((prevState) => ({ ...prevState, [key]: value }));
  // };
  return (
    <div className={`mt-auto ${mb} mx-auto`}>
      <Space
        wrap
        size="large"
        className="flex flex-col gap-8 md:flex-row flex-wrap lg:items-center lg:justify-center lg:content-center"
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
            onChange={(value) => props.onChangeCb(value, d.key)}
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
          onClick={async () => {
            runInAction(() => {
              props.onSearchCb();
            });
          }}
        >
          Search
        </Button>
      </Space>
    </div>
  );
};

export default GroupSelect;
