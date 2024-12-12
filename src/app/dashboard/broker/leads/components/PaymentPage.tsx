"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FiLock } from "react-icons/fi";
import { Container, KeenIcon } from "@/app/dashboard-components";
import { cn } from "@/app/utils";
import { Demo1Layout } from "@/app/dashboard/page-layout";
import {
  Toolbar,
  ToolbarActions,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle,
} from "@/app/partials/toolbar";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckoutForm from "../components/StripeCheckoutForm";
import StripeCompletePage from "./StripeCompletedPage";
import { createPaymentIntent } from "@/actions/payment";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PayPalProvider from "./PayPalProvider";
import { BrokerData, UserData } from "@/types/general";
import { observer } from "mobx-react-lite";
import { runInAction } from "mobx";
import { brokerStore } from "@/app/store/brokerStore";

interface PaymentPageProps {
  profileData: (BrokerData | UserData) | undefined;
  purchaseType: "shared" | "exclusive";
  paymentDetails: {
    id: string;
    username: string;
    userImage: string | null;
    propertyAddress: string | null | undefined;
    propertyPrice: string;
    downPayment: string | null;
    downPaymentSource: string | null | undefined;
    leadPurchasePrice: string;
    propertyType: string | null | undefined;
  };
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const PaymentPage: React.FC<PaymentPageProps> = observer(
  ({ profileData, purchaseType, paymentDetails }) => {
    const {
      id,
      username,
      userImage,
      propertyAddress,
      propertyPrice,
      downPayment,
      downPaymentSource,
      leadPurchasePrice,
      propertyType,
    } = paymentDetails;

    useEffect(() => {
      if (profileData) {
        runInAction(() => {
          brokerStore.broker_profile = profileData as BrokerData;
        });
      }
    }, []);

    const [clientSecret, setClientSecret] = useState<string | null>("");
    const [dpmCheckerLink, setDpmCheckerLink] = useState("");
    const searchParams = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    useEffect(() => {
      (async () => {
        //   const result = await payment.createPaymentIntent(500);
        const result = await createPaymentIntent(
          500,
          purchaseType,
          id,
          profileData?.id!
        );
        setClientSecret(result.clientSecret);
        setDpmCheckerLink(result.dpmCheckerLink);
      })();
    }, []);

    const appearance = {
      theme: "stripe",
      labels: "floating",
    } as StripeElementsOptions["appearance"];
    const options = {
      loader: "always",

      business: "RocketRides",
      clientSecret,
      appearance,
    } as StripeElementsOptions;

    return (
      <Demo1Layout>
        <Container>
          {/* <Upgrade /> */}
          <Toolbar>
            <ToolbarHeading>
              <ToolbarPageTitle />
              <ToolbarDescription>
                Tailored Tools for Business Scalability
              </ToolbarDescription>
            </ToolbarHeading>
            <ToolbarActions>
              <a href="#" className="btn btn-sm btn-light">
                Public Profile
              </a>
              <a href="#" className="btn btn-sm btn-primary">
                My profile
              </a>
            </ToolbarActions>
          </Toolbar>
        </Container>

        <Container>
          <div className=" text-gray-800 flex items-center justify-center mt-16 ">
            <motion.div
              className="bg-white p-10 rounded-3xl shadow-lg max-w-3xl w-full space-y-8 border border-gray-300"
              initial={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Header */}
              <div className="flex items-center space-x-6">
                <Image
                  src={userImage || ""}
                  alt="User Avatar"
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full shadow-md"
                />
                <div>
                  <h2 className="text-2xl font-bold">
                    Payment for{" "}
                    {purchaseType === "shared" ? "Shared" : "Exclusive"} Lead
                  </h2>
                  <p className="text-sm text-gray-500">
                    <KeenIcon icon="home-3" />{" "}
                    {propertyAddress || "Property address not provided"}
                  </p>
                </div>
              </div>

              {/* Informational Details */}
              <div className="bg-gray-100 rounded-2xl p-6 space-y-6 relative border border-gray-300">
                <SectionTag text="Purchase Info" color="bg-blue-500" />
                <DetailItem
                  label="Owner"
                  value={username}
                  valueClass="font-bold"
                />
                <DetailItem label="Property Price" value={propertyPrice} />
                <DetailItem label="Down Payment" value={downPayment} />
                <DetailItem
                  label="Source of Payment"
                  value={downPaymentSource}
                />
              </div>

              {/* Lead Purchase Price */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl px-6 py-10 shadow-lg relative border border-gray-300">
                <SectionTag text="Lead Information" color="bg-gray-500" />
                <DetailItem
                  label="Lead Purchase Price"
                  value={leadPurchasePrice}
                  highlight
                />
              </div>

              {clientSecret ? (
                <Elements options={options} stripe={stripePromise}>
                  {searchParams ? (
                    <StripeCompletePage />
                  ) : (
                    <StripeCheckoutForm
                      leadId={id}
                      dpmCheckerLink={dpmCheckerLink}
                    />
                  )}
                </Elements>
              ) : (
                <div className="flex justify-center items-center">
                  <Spin
                    indicator={
                      <LoadingOutlined style={{ fontSize: 25 }} spin />
                    }
                  />
                </div>
              )}

              <PayPalScriptProvider
                options={{
                  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
                  currency: "CAD",
                  intent: "capture",
                }}
              >
                <PayPalProvider
                  hasStripeSecret={!!clientSecret}
                  id={id}
                  brokerId={profileData?.id!}
                  purchaseType={purchaseType}
                  amount={5000}
                />
              </PayPalScriptProvider>

              {/* Security Notice */}
              <div className="space-y-2">
                <div className="flex items-center space-x-3 text-gray-500 mt-4">
                  <FiLock className="w-4 h-4" />
                  <p className="text-xs">
                    Your payment is secure. All data is encrypted and protected.
                  </p>
                </div>

                <div className="flex items-start space-x-3 text-gray-500 mt-4">
                  <KeenIcon icon="information" />
                  <p className="text-xs">
                    On Purchasing this lead, you will have full access to the
                    users' information and will be able to communicate with
                    them. You will also access their documents and other
                    features.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </Demo1Layout>
    );
  }
);

// Detail Item Component
const DetailItem: React.FC<{
  label: string;
  value: string | undefined | null;
  highlight?: boolean;
  valueClass?: string;
}> = ({ label, value, highlight, valueClass = "" }) => (
  <div className="flex items-center justify-between">
    <span
      className={cn(
        highlight
          ? "font-semibold text-lg text-gray-700"
          : "text-gray-500 text-sm"
      )}
    >
      {label}
    </span>
    <span
      className={cn(
        highlight
          ? "text-blue-600 font-extrabold text-2xl"
          : "text-gray-800 text-sm",
        valueClass
      )}
    >
      {value}
    </span>
  </div>
);

// Payment Button Component
const PaymentButton: React.FC<{
  label: string;
  bg: string;
  hoverBg: string;
  icon: string;
  // onClick: () => void;
}> = ({ label, bg, hoverBg, icon }) => (
  <motion.button
    className={`mx-auto w-full md:!w-40  py-2 ${bg} text-white rounded-xl shadow-md ${hoverBg} transition-all duration-300 flex items-center justify-center space-x-2`}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    // onClick={onClick}
    type="submit"
  >
    {/* <FiCreditCard className="w-5 h-5" /> */}
    <KeenIcon icon={icon} />
    {/* <KeenIcon icon="credit-cart" /> */}
    <span>{label}</span>
  </motion.button>
);

export default PaymentPage;

const SectionTag: React.FC<{ text: string; color: string }> = ({
  text,
  color,
}) => (
  <div
    className={`absolute -top-4 px-6 py-1 rounded-full text-sm font-medium text-white ${color}`}
  >
    {text}
  </div>
);
