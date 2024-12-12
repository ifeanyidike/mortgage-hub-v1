import { auth } from "@/auth";
import { purchases } from "@/server/purchases";
import React from "react";
import PurchaseList from "./components/PurchaseList";
import { PurchaseData } from "@/types/general";
import broker from "@/server/broker";

const Page = async () => {
  const session = await auth();
  const profileData = await broker.getBrokerByUserId(session?.user?.id!);

  if (!profileData) throw new Error("Not auuthorized! You're not a broker");

  const purchased_leads = (await purchases.fetchPurchasesByUserId(
    session?.user?.id!
  )) as PurchaseData[];

  return <PurchaseList profileData={profileData} data={purchased_leads} />;
};

export default Page;
