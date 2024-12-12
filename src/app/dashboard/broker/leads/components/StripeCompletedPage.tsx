"use client";

import React from "react";
import { Elements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe, PaymentIntent } from "@stripe/stripe-js";
import { motion } from "framer-motion";
import { FiCheckCircle, FiInfo, FiXCircle, FiHome } from "react-icons/fi";
import { Demo1Layout } from "@/app/dashboard/page-layout";
import { Container, KeenIcon } from "@/app/dashboard-components";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Link from "next/link";

// Load Stripe with your publishable key
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

// Status Map
const STATUS_CONTENT_MAP: Record<
  any,
  { text: string; icon: JSX.Element; color: string }
> = {
  succeeded: {
    text: "Payment succeeded",
    icon: <FiCheckCircle className="text-4xl text-green-600" />,
    color: "bg-green-100",
  },
  processing: {
    text: "Your payment is processing.",
    icon: <FiInfo className="text-4xl text-gray-600" />,
    color: "bg-gray-100",
  },
  requires_payment_method: {
    text: "Your payment was not successful. Please try again.",
    icon: <FiXCircle className="text-4xl text-red-600" />,
    color: "bg-red-100",
  },
  default: {
    text: "Something went wrong. Please try again.",
    icon: <FiXCircle className="text-4xl text-red-600" />,
    color: "bg-red-100",
  },
};

// CompletedPage Component
function CompletedPage() {
  const stripe = useStripe();
  const [status, setStatus] = React.useState<PaymentIntent.Status | "default">(
    "default"
  );
  const [intentId, setIntentId] = React.useState<string | null | undefined>();

  React.useEffect(() => {
    if (!stripe) return;

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    if (!clientSecret) return;

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (!paymentIntent) {
        setIntentId(null);
        return;
      }

      setStatus(paymentIntent.status);
      setIntentId(paymentIntent.id);
    });
  }, [stripe]);

  const statusContent =
    STATUS_CONTENT_MAP[status] || STATUS_CONTENT_MAP["default"];

  return (
    <div className=" p-6 mt-32">
      {/* Card Wrapper */}
      {intentId === undefined ? (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-100/50 grid place-items-center z-10">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} />
        </div>
      ) : (
        <motion.div
          className={`p-8 space-y-8 flex flex-col max-w-xl mx-auto rounded-lg shadow-lg ${statusContent.color}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Status Icon */}
          <div className="flex items-center justify-center mb-4">
            {statusContent.icon}
          </div>
          {/* Status Message */}
          <h2 className="text-xl font-semibold text-center mb-4">
            {statusContent.text}
          </h2>

          {/* Payment Details */}
          {intentId && (
            <motion.div
              className="bg-white p-4 rounded-md shadow-md"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <table className="w-full text-sm text-left text-gray-600">
                <tbody>
                  <tr>
                    <td className="py-2 font-medium">Payment ID:</td>
                    <td className="py-2">{intentId}</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium">Status:</td>
                    <td className="py-2 capitalize">{status}</td>
                  </tr>
                </tbody>
              </table>
            </motion.div>
          )}

          {/* Links */}
          <div className="mt-6 flex flex-col items-center gap-8">
            {intentId ? (
              <>
                <a
                  href={`https://dashboard.stripe.com/payments/${intentId}`}
                  target="_blank"
                  className="text-sm text-blue-600 hover:underline"
                  rel="noopener noreferrer"
                >
                  View Payment Details
                </a>
                <div className="flex flex-col md:!flex-row gap-4 md:!gap-8">
                  <Link
                    href="/"
                    className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:ring focus:ring-blue-300"
                  >
                    {/* <FiHome className="mr-2 text-lg" /> */}
                    <KeenIcon icon="additem" className="!text-lg !mr-2" />
                    View Lead Details
                  </Link>

                  <Link
                    href="/dashboard/broker/leads"
                    className="inline-flex items-center px-6 py-2 bg-purple-600 text-white rounded-md shadow hover:bg-purple-700 focus:ring focus:ring-blue-300"
                  >
                    {/* <FiHome className="mr-2 text-lg" /> */}
                    <KeenIcon icon="purchase" className="!text-lg !mr-2" />
                    Buy Another Lead
                  </Link>
                </div>
              </>
            ) : (
              <Link
                href="/"
                className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:ring focus:ring-blue-300"
              >
                <FiHome className="mr-2 text-lg" />
                Try again
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}

// StripeCompletePage Component
export default function StripeCompletePage() {
  return (
    <Demo1Layout>
      <Container>
        <Elements stripe={stripePromise}>
          <CompletedPage />
        </Elements>
      </Container>
    </Demo1Layout>
  );
}
