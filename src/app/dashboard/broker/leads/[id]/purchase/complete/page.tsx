import React from "react";
import StripeCompletePage from "../../../components/StripeCompletedPage";
import PayPalCompletePage from "../../../components/PayPalCompletePage";

const Page = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: {
    source: string;
    message: string;
    status: "succeeded" | "failed";
    payment_id: string;
  };
}) => {
  return (
    <>
      {searchParams.source === "paypal" ? (
        <PayPalCompletePage
          message={searchParams.message}
          status={searchParams.status}
          paymentId={searchParams.payment_id}
        />
      ) : (
        <StripeCompletePage />
      )}
    </>
  );
};

export default Page;
