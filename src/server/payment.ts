import stripeClient from "stripe";
import paypalClient, { Order } from "@paypal/paypal-server-sdk";

// const paypalEnvironment =  paypalClient.Environment(
//     process.env.PAYPAL_CLIENT_ID as string,
//     process.env.PAYPAL_SECRET as string,
//     paypalClient.environments.Sandbox
//   );

export const stripe = new stripeClient(process.env.STRIPE_SECRET_KEY as string);

import DB from "@/lib/db";
import Stripe from "stripe";
import { paypal } from "./paypal";

type Metadata = {
  lead_type: "shared" | "exclusive";
  lead_id: string;
  broker_id: string;
};

class Payment extends DB {
  constructor() {
    super();
  }

  public async doesExclusivePurchaseExist(lead_id: string) {
    const result = await this.db
      .selectFrom("purchases")
      .select("lead_type")
      .where("lead_id", "=", lead_id)
      .where("lead_type", "=", "exclusive")
      .executeTakeFirst();
    return result?.lead_type === "exclusive";
  }

  public async hasBrokerPurchased(broker_id: string, lead_id: string) {
    const result = await this.db
      .selectFrom("purchases")
      .select("id")
      .where("lead_id", "=", lead_id)
      .where("broker_id", "=", broker_id)
      .executeTakeFirst();
    return !!result?.id;
  }

  public async createPaymentIntent(
    amount: number,
    lead_type: "shared" | "exclusive",
    lead_id: string,
    broker_id: string
  ) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "cad",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        lead_type,
        lead_id,
        broker_id,
      } as Metadata,
    });
    return {
      clientSecret: paymentIntent.client_secret,
      dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
    };
  }

  public async stripeIntentSucceeded(pi: Stripe.PaymentIntent) {
    await this.paymentSuccess(pi);
  }

  private async paymentSuccess(
    order:
      | Stripe.PaymentIntent
      | {
          metadata: Metadata;
          amount: number;
          currency: string;
          payment_method: string | null;
        }
  ) {
    const metadata = order.metadata as Metadata;
    if (await this.doesExclusivePurchaseExist(metadata.lead_id)) {
      return;
    }
    console.log("meta", metadata);
    console.log("order", order);
    await this.db
      .insertInto("purchases")
      .values({
        ...metadata,
        amount_paid: order.amount,
        currency: order.currency,
        purchased_at: new Date(),
        payment_method: order.payment_method?.toString(),
      })
      .execute();

    if (order.metadata.lead_type === "exclusive") {
      await this.db
        .updateTable("leads")
        .set({ is_sold: true })
        .where("id", "=", metadata.lead_id)
        .execute();
    }
  }

  public createPayPalOrder(
    lead_id: string,
    orderType: "shared" | "exclusive",
    amount: number
  ) {
    return paypal.createOrder(lead_id, orderType, amount);
  }

  public async capturePayPalOrder(
    orderID: string,
    lead_id: string,
    lead_type: "shared" | "exclusive",
    broker_id: string
  ) {
    const captureResponse = await paypal.captureOrder(orderID);
    if (captureResponse?.result.status === "COMPLETED") {
      const purchaseUnit = captureResponse.result.purchaseUnits![0];
      const capture = purchaseUnit.payments?.captures![0];
      const { currencyCode: currency, value } = capture?.amount!;
      const payment_method = "paypal";

      const data = {
        metadata: { lead_id, broker_id, lead_type },
        amount: parseFloat(value),
        currency,
        payment_method,
      };
      console.log("data in capturePayPalOrder", data);
      await this.paymentSuccess(data);
      return captureResponse.result.id;
    }

    throw new Error("Failed to capture PayPal order");
  }
}

export const payment = new Payment();
