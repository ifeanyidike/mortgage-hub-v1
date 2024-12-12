import React from "react";
import SingleLeadInfo from "./component/SingleLeadInfo";
import { purchases } from "@/server/purchases";
import { auth } from "@/auth";
import broker from "@/server/broker";
import { PurchaseData } from "@/types/general";

const Page = async ({ params }: { params: { id: string } }) => {
  const session = await auth();
  const profileData = await broker.getBrokerByUserId(session?.user?.id!);

  if (!profileData) throw new Error("Not auuthorized! You're not a broker");

  const purchase_data = (await purchases.fetchPurchaseDataById(
    params.id
  )) as PurchaseData;

  return <SingleLeadInfo purchase_data={purchase_data} />;
};

export default Page;
