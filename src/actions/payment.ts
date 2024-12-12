"use server";

import { payment } from "@/server/payment";

export async function createPaymentIntent(
  amount: number,
  lead_type: "shared" | "exclusive",
  lead_id: string,
  broker_id: string
) {
  return await payment.createPaymentIntent(
    amount,
    lead_type,
    lead_id,
    broker_id
  );
}

export async function validatePurchase(broker_id: string, lead_id: string) {
  // throw new Error("Just testing out errors");
  const exclusive_exist = await payment.doesExclusivePurchaseExist(lead_id);
  if (exclusive_exist)
    throw new Error(
      "You cannot purchase lead, lead is already purchased as exclusive"
    );
  const broker_purchased = await payment.hasBrokerPurchased(broker_id, lead_id);

  if (broker_purchased) {
    throw new Error("You have already purchased this lead");
  }
  return !(exclusive_exist && broker_purchased);
}

export async function createPayPalOrder(
  lead_id: string,
  orderType: "shared" | "exclusive",
  amount: number
) {
  return await payment.createPayPalOrder(lead_id, orderType, amount);
}

export async function capturePayPalOrder(
  orderID: string,
  lead_id: string,
  lead_type: "shared" | "exclusive",
  broker_id: string
) {
  console.log("in actions ", orderID, lead_id, lead_type, broker_id);
  return await payment.capturePayPalOrder(
    orderID,
    lead_id,
    lead_type,
    broker_id
  );
}
