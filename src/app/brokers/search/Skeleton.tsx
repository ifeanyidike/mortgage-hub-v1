import React, { useState } from "react";
import { DotChartOutlined } from "@ant-design/icons";
import type { RadioChangeEvent } from "antd";
import { Flex, Divider, Form, Radio, Skeleton, Space, Switch } from "antd";

type SizeType = "default" | "small" | "large";
type ButtonShapeType = "circle" | "square" | "round" | "default";
type AvatarShapeType = "circle" | "square";

const SkeletonLoading: React.FC = () => {
  return (
    <Flex gap="middle" wrap>
      <Skeleton.Node active={true} className="!w-96 !h-96 !flex !flex-col">
        <Skeleton.Node
          className="!w-36 !h-36 !rounded-full !overflow-hidden !shadow-md !mb-6"
          active={false}
        >
          <Skeleton.Image
            active={true}
            className="!object-cover !w-full !h-full !rounded-full"
          />
        </Skeleton.Node>
        <Skeleton />
      </Skeleton.Node>
      <Skeleton.Node active={true} className="!w-96 !h-96 !flex !flex-col">
        <Skeleton.Node
          className="!w-36 !h-36 !rounded-full !overflow-hidden !shadow-md !mb-6"
          active={false}
        >
          <Skeleton.Image
            active={true}
            className="!object-cover !w-full !h-full !rounded-full"
          />
        </Skeleton.Node>
        <Skeleton />
      </Skeleton.Node>
      <Skeleton.Node active={true} className="!w-96 !h-96 !flex !flex-col">
        <Skeleton.Node
          className="!w-36 !h-36 !rounded-full !overflow-hidden !shadow-md !mb-6"
          active={false}
        >
          <Skeleton.Image
            active={true}
            className="!object-cover !w-full !h-full !rounded-full"
          />
        </Skeleton.Node>
        <Skeleton />
      </Skeleton.Node>
      <Skeleton.Node active={true} className="!w-96 !h-96 !flex !flex-col">
        <Skeleton.Node
          className="!w-36 !h-36 !rounded-full !overflow-hidden !shadow-md !mb-6"
          active={false}
        >
          <Skeleton.Image
            active={true}
            className="!object-cover !w-full !h-full !rounded-full"
          />
        </Skeleton.Node>
        <Skeleton />
      </Skeleton.Node>
    </Flex>
  );
};

export default SkeletonLoading;
