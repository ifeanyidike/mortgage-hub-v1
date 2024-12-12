"use client";
import React, { useEffect } from "react";
import CRM from "./CRM";
import { BrokerData, UserData } from "@/types/general";
import { runInAction } from "mobx";
import { brokerStore } from "@/app/store/brokerStore";
import { regularUserStore } from "@/app/store/regularUserStore";
import { Skeleton } from "antd";
import { observer } from "mobx-react-lite";
import { Demo1Layout } from "../../page-layout";

type Props = {
  profileData: (BrokerData | UserData) | undefined;
  role: "broker" | "user";
};

const Main = observer((props: Props) => {
  useEffect(() => {
    if (props.profileData) {
      runInAction(() => {
        if (props.role === "broker") {
          brokerStore.broker_profile = props.profileData as BrokerData;
        } else {
          regularUserStore.user_profile = props.profileData as UserData;
        }
      });
    }
  }, []);

  const renderBrokerCRM = () => {
    if (props.role === "broker") {
      if (brokerStore.broker_profile) {
        return <CRM />;
      } else {
        return <Skeleton />;
      }
    }
  };

  const renderUserCRM = () => {
    if (props.role === "user") {
      if (regularUserStore.user_profile) {
        return <CRM />;
      } else {
        return <Skeleton />;
      }
    }
  };

  return (
    <Demo1Layout>
      {renderBrokerCRM()}
      {renderUserCRM()}
    </Demo1Layout>
  );
});

export default Main;
