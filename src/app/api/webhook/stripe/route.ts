import { streamToBuffer } from "@/app/utils";
import { payment, stripe } from "@/server/payment";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (req: NextRequest) => {
  let event: Stripe.Event;
  const stripeSignature = req.headers.get("stripe-signature");
  if (!stripeSignature) {
    return NextResponse.json(
      { error: "Missing Stripe signature header" },
      { status: 400 }
    );
  }

  try {
    const bodyBuffer = await streamToBuffer(
      req.body as ReadableStream<Uint8Array>
    );
    event = stripe.webhooks.constructEvent(
      bodyBuffer,
      stripeSignature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
    // return NextResponse.json(users);
  } catch (err: any) {
    console.log(`⚠️  Webhook signature verification failed.`);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  // Extract data from the event
  const data = event.data;
  const eventType = event.type;

  // Handle each event type
  switch (eventType) {
    case "payment_intent.succeeded":
      await payment.stripeIntentSucceeded(data.object as Stripe.PaymentIntent);
      // Update the status of the payment in your database
      break;
    // Add more event types as needed
    case "payment_intent.payment_failed":
      const failed_pi = data.object as Stripe.PaymentIntent;

    default:
      console.log(`Unhandled event type: ${eventType}`);
  }

  return NextResponse.json({ received: true });
};
