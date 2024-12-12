import React from "react";
import PaymentPage from "../../components/PaymentPage";
import { lead } from "@/server/lead";
import { downPaymentSources, propertyTypes } from "@/app/utils";
import broker from "@/server/broker";
import { auth } from "@/auth";

const PurchaseServerSide = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { type: string };
}) => {
  const session = await auth();
  const profileData = await broker.getBrokerByUserId(session?.user?.id!);

  if (!profileData) throw new Error("Not auuthorized! You're not a broker");

  const leadInfo = await lead.fetchSingleLeadWithFewUserInfo(params.id);
  if (!leadInfo) throw new Error("Could not find lead info");
  const purchaseType =
    searchParams.type === "exclusive" ? "exclusive" : "shared";

  const paymentDetails = {
    id: leadInfo.id,
    username: leadInfo.user_name!,
    userImage: leadInfo.user_picture, // Replace with user's image URL
    propertyAddress: leadInfo.property_address,
    propertyPrice: Number(leadInfo.property_price).toLocaleString("en-US", {
      style: "currency",
      currency: "CAD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }),
    downPayment: leadInfo.down_payment
      ? Number(leadInfo.down_payment).toLocaleString("en-US", {
          style: "currency",
          currency: "CAD",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })
      : null,
    downPaymentSource: leadInfo.down_payment_source
      ? downPaymentSources[
          leadInfo.down_payment_source as keyof typeof downPaymentSources
        ]
      : leadInfo.down_payment_source,
    propertyType: leadInfo.property_type
      ? propertyTypes[leadInfo.property_type as keyof typeof propertyTypes]
      : leadInfo.property_type,
    leadPurchasePrice: purchaseType === "shared" ? "$5,000" : "$10,000",
  };

  return (
    <PaymentPage
      profileData={profileData}
      purchaseType={purchaseType}
      paymentDetails={paymentDetails}
    />
  );
};

export default PurchaseServerSide;
