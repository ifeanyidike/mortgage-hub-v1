import React from "react";
import LeadsList from "./components/LeadsList";
import { lead } from "@/server/lead";
import { auth } from "@/auth";
import broker from "@/server/broker";

const Page = async () => {
  // const profileData = await broker.getBrokerByUserId(session?.user?.id!);
  // const data = await lead.fetchLeadsWithUserInfo();

  const session = await auth();
  const profileData = await broker.getBrokerByUserId(session?.user?.id!);

  if (!profileData) throw new Error("Not auuthorized! You're not a broker");
  return <LeadsList />;
};

export default Page;
