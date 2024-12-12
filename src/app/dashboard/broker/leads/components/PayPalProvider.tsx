import React from "react";
import {
  capturePayPalOrder,
  createPayPalOrder,
  validatePurchase,
} from "@/actions/payment";
import { notification, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { FaPaypal } from "react-icons/fa6";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";

type Props = {
  hasStripeSecret: boolean;
  id: string;
  brokerId: string;
  purchaseType: "shared" | "exclusive";
  amount: number;
};
const PayPalProvider = (props: Props) => {
  const { id, hasStripeSecret, purchaseType, amount } = props;
  const [{ isPending }] = usePayPalScriptReducer();
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();

  function triggerNotification(message: string, description: string) {
    api.open({
      message,
      description,
      icon: <FaPaypal style={{ color: "#108ee9" }} />,
    });
  }

  async function handleOrderPayPal() {
    try {
      await validatePurchase(props.brokerId, id);
      return await createPayPalOrder(id, purchaseType, amount);
    } catch (error: any) {
      triggerNotification(
        "Payment Error",
        error.message || "An error occurred when processing the payment"
      );
    }
  }

  async function handleCaptureOrderPayPal(order_id: string) {
    const addr = `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/broker/leads/${id}/purchase/complete`;
    try {
      console.log(
        "order_id, id, purchaseType, brokerId",
        order_id,
        id,
        purchaseType,
        props.brokerId
      );
      const paymentId = await capturePayPalOrder(
        order_id,
        id,
        purchaseType,
        props.brokerId
      );
      router.push(
        `${addr}?payment_id=${paymentId}&message=&status=succeeded&source=paypal`
      );
      triggerNotification(
        "Payment Successful",
        "Payment completed successfully"
      );
    } catch (error: any) {
      triggerNotification(
        "Payment Error",
        error.message || "An error occurred when processing the payment"
      );
      router.push(`${addr}?payment_id=&message=&status=failed&source=paypal`);
    }
  }
  return (
    <form className="flex flex-col">
      {contextHolder}
      {hasStripeSecret && (
        <div className="relative flex items-center mb-8">
          <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-gray-400"></div>
          <span className="relative px-4 text-gray-600 font-semibold text-sm bg-white">
            <span className="rounded-full bg-gray-200 px-4 py-1 shadow-md">
              OR
            </span>
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-gray-400"></div>
        </div>
      )}

      <div className="flex flex-col  gap-4 pb-4 justify-center px-5 w-full border border-gray-300 shadow-md">
        {/* Paypal accordion */}
        <div className="flex gap-4 items-center">
          <FaPaypal size={16} color="#2563eb" />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/3/39/PayPal_logo.svg"
            alt="PayPal"
            className="w-16 h-16"
          />
        </div>
        <p>
          In order to complete your transaction, we will transfer you over to
          PayPal's secure servers. Click continue to proceed.
        </p>

        {isPending && (
          <div className="absolute top-0 left-0 w-full h-full bg-gray-100/50 grid place-items-center z-10">
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
            />
          </div>
        )}
        <PayPalButtons
          style={{
            color: "gold",
            shape: "pill",
            label: "pay",
            height: 40,
          }}
          className="!w-full md:!w-48 !py-2 !transition-all !duration-300 !mx-auto"
          fundingSource="paypal"
          createOrder={async (data, actions) => {
            const response = await handleOrderPayPal();
            if (response) return response.id!;
            return "";
          }}
          onApprove={async (data, actions) => {
            await handleCaptureOrderPayPal(data.orderID);
            // if (response) return true;
            // return false;
          }}
          onError={(err) => {
            const addr = `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/broker/leads/${id}/purchase/complete`;
            triggerNotification(
              "Payment Error",
              "An error occurred when processing the payment"
            );
            router.push(
              `${addr}?payment_id=&message=&status=failed&source=paypal`
            );
          }}
        />
      </div>
    </form>
  );
};

export default PayPalProvider;
