"use client";
import { AppstoreOutlined, HomeFilled } from "@ant-design/icons";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Button, Dropdown, Flex, Menu, MenuProps, Space } from "antd";
import React, { useState } from "react";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { PiBankBold } from "react-icons/pi";
import { TbBrain } from "react-icons/tb";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: "Home",
    key: "home",
    icon: <HomeFilled />,
  },
  {
    label: "Lenders",
    key: "lenders",
    icon: <PiBankBold />,
  },
  {
    label: "Brokers",
    key: "SubMenu",
    icon: <AppstoreOutlined />,
    // children: [
    //   {
    //     type: "group",
    //     label: "Item 1",
    //     children: [
    //       { label: "Option 1", key: "setting:1" },
    //       { label: "Option 2", key: "setting:2" },
    //     ],
    //   },
    //   {
    //     type: "group",
    //     label: "Item 2",
    //     children: [
    //       { label: "Option 3", key: "setting:3" },
    //       { label: "Option 4", key: "setting:4" },
    //     ],
    //   },
    // ],
  },
  {
    label: "AI Genie",
    key: "ai",
    icon: <TbBrain />,
  },
  {
    label: "First Home",
    key: "first-home",
    icon: <HiOutlineHomeModern />,
  },
];

const Header = () => {
  const [current, setCurrent] = useState("home");
  const { user, error, isLoading } = useUser();

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <div className="w-full my-auto flex px-20 py-12 !items-center  bg-white">
      <Flex justify="space-between" align="center" className="w-full ">
        <h5 className="whitespace-nowrap font-extrabold text-xl">
          Mortgage Hub
        </h5>

        <Menu
          mode="horizontal"
          selectedKeys={[current]}
          defaultSelectedKeys={["home"]}
          items={items}
          expandIcon
          className="!w-fit font-medium !flex gap-10 !leading-[50px] !text-base"
          onClick={onClick}
        />
        <Button shape="round" className="uppercase">
          {!user ? (
            <a href="/api/auth/login">Log-in | Register</a>
          ) : (
            <a href="/api/auth/logout">Log-out</a>
          )}
        </Button>
        {/* <a
        href="https://www.google.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button type="primary">Search</Button>
      </a>
      <Dropdown menu={{ items }}>
        <Button>
          <Avatar src="https://zos.alipayobjects.com/rmsportal/QBnOOoLaAfKPdL.png" />
          <span className="ml-2">Profile</span>
        </Button>
      </Dropdown> */}
      </Flex>
    </div>
  );
};

export default Header;

