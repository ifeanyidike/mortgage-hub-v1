"use client";
import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { StripePaymentElementOptions } from "@stripe/stripe-js";
import { notification, Radio, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { validatePurchase } from "@/actions/payment";
import { useSession } from "next-auth/react";
import { FaStripe } from "react-icons/fa6";
import { motion } from "framer-motion";
import { KeenIcon } from "@/app/dashboard-components";

export default function StripeCheckoutForm({
  leadId,

  dpmCheckerLink,
}: {
  leadId: string;
  dpmCheckerLink: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [api, contextHolder] = notification.useNotification();

  const { data: session } = useSession();

  const [message, setMessage] = useState<string | null | undefined>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPayPal, setIsPayPal] = useState(false);
  const paymentElementOptions = {
    layout: {
      type: "accordion",
      defaultCollapsed: true,
      radios: true,
      spacedAccordionItems: true,
    },

    // business: {
    //   name: "Mortgage Hub",
    //   email: session?.user?.email,
    // },
  } as StripePaymentElementOptions;

  function triggerNotification(message: string, description: string) {
    // const message = status === "success" ? "Payment success" : "Payment error";
    api.open({
      message,
      description,
      icon: <FaStripe style={{ color: "#108ee9" }} />,
    });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    try {
      await validatePurchase(session?.user?.id!, leadId);

      const { error: submitError } = await elements.submit();
      if (submitError) {
        triggerNotification(
          "Invalid parameters",
          submitError.message || "An error occurred when processing the payment"
        );
      }
      setIsLoading(true);

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/broker/leads/${leadId}/purchase/complete`,
        },
      });

      // This point will only be reached if there is an immediate error when
      // confirming the payment. Otherwise, your customer will be redirected to
      // your `return_url`. For some payment methods like iDEAL, your customer will
      // be redirected to an intermediate site first to authorize the payment, then
      // redirected to the `return_url`.
      if (error.type === "card_error" || error.type === "validation_error") {
        const caption =
          error.type === "card_error" ? "Card error" : "Validation error";
        setMessage(error.message);
        triggerNotification(
          caption,
          error.message || "An error occurred when processing the payment"
        );
      } else {
        setMessage("An unexpected error occurred.");
        triggerNotification("Payment error", "An unexpected error occurred.");
      }
    } catch (error: any) {
      triggerNotification("Payment error", error.message);
      console.error("Error confirming payment:", error);
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <form className="grid" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={paymentElementOptions} />

        <motion.button
          className={`mx-auto mt-5 w-full md:!w-40  py-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition-all duration-300 flex items-center justify-center space-x-2`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading || !stripe || !elements}
          type="submit"
        >
          {/* <FiCreditCard className="w-5 h-5" /> */}
          {isLoading ? (
            <Spin
              className="!text-yellow-400"
              indicator={<LoadingOutlined spin />}
            />
          ) : (
            <KeenIcon icon="credit-cart" />
          )}

          {/* <KeenIcon icon="credit-cart" /> */}
          <span>Pay now</span>
        </motion.button>
        {/* <button
          className="btn-primary"
          disabled={isLoading || !stripe || !elements}
          id="submit"
        >
          <span id="button-text">
            {isLoading ? (
              <Spin indicator={<LoadingOutlined spin />} />
            ) : (
              "Pay now"
            )}
          </span>
        </button> */}
        {/* Show any error or success messages */}
        {message && <small id="payment-message">{message}</small>}
      </form>
    </>
  );
}
