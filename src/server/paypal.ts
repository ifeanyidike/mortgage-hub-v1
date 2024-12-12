import axios from "axios";
import {
  ApiError,
  CheckoutPaymentIntent,
  Client,
  Environment,
  LogLevel,
  OrderApplicationContextShippingPreference,
  OrderApplicationContextUserAction,
  OrderRequest,
  OrdersController,
  PaymentsController,
} from "@paypal/paypal-server-sdk";

class PayPal {
  private baseUrl: string;
  client: Client;
  ordersController: OrdersController;
  paymentsController: PaymentsController;

  constructor() {
    if (process.env.NODE_ENV === "production") {
      this.baseUrl = "https://api-m.paypal.com";
    } else {
      this.baseUrl = "https://api-m.sandbox.paypal.com";
    }
    console.log("PAYPAL_CLIENT_SECRET", process.env.PAYPAL_CLIENT_SECRET);
    console.log("PAYPAL_CLIENT_ID", process.env.PAYPAL_CLIENT_ID);
    const client = new Client({
      clientCredentialsAuthCredentials: {
        oAuthClientId: process.env.PAYPAL_CLIENT_ID!,
        oAuthClientSecret: process.env.PAYPAL_CLIENT_SECRET!,
      },
      timeout: 0,
      environment:
        process.env.NODE_ENV === "production"
          ? Environment.Production
          : Environment.Sandbox,
      logging: {
        logLevel: LogLevel.Info,
        logRequest: { logBody: true },
        logResponse: { logHeaders: true },
      },
    });

    this.client = client;
    this.ordersController = new OrdersController(client);
    this.paymentsController = new PaymentsController(client);
  }
  public async getAccessToken() {
    const response = await axios.post(
      `${this.baseUrl}/v1/oauth2/token`,
      "grant_type=client_credentials",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username: process.env.PAYPAL_CLIENT_ID!,
          password: process.env.PAYPAL_CLIENT_SECRET!,
        },
      }
    );
    console.log("response", response.data);

    return response.data.access_token;
  }

  public async createOrder(
    lead_id: string,
    orderType: "shared" | "exclusive",
    amount: number
  ) {
    // const accessToken = await this.getAccessToken();
    const amount_unit = {
      currencyCode: "CAD",
      value: amount.toFixed(2),
    };

    const collect = {
      body: {
        intent: CheckoutPaymentIntent.Capture,
        purchaseUnits: [
          {
            amount: {
              ...amount_unit,
              breakdown: {
                itemTotal: amount_unit,
              },
            },
            items: [
              {
                name: `Lead purchase -- ${orderType}`,
                description: `The purchase is for ${orderType} lead.`,
                quantity: "1",
                unitAmount: amount_unit,
              },
            ],
          },
        ],
        applicationContext: {
          returnUrl: `${process.env.BASE_URL}/dashboard/broker/leads/${lead_id}/purchase/complete`,
          cancelUrl: `${process.env.BASE_URL}/dashboard/broker/leads/${lead_id}/purchase/cancel`,
          shippingPreference:
            OrderApplicationContextShippingPreference.NoShipping,
          userAction: OrderApplicationContextUserAction.PayNow,
          brandName: "Mortgage Hub",
        },
      },
      prefer: "return=minimal",
    };
    // PurchaseUnitRequest
    try {
      const { body, ...httpResponse } =
        await this.ordersController.ordersCreate(collect);
      // Get more response info...
      // const { statusCode, headers } = httpResponse;

      return {
        jsonResponse: JSON.parse(body as string),
        httpStatusCode: httpResponse.statusCode,
        id: httpResponse.result.id,
      };
    } catch (error: any) {
      console.error("error in creating paypal order", error);
      //   if (error instanceof ApiError) {
      //     // const { statusCode, headers } = error;
      //     throw new Error(error.message);
      //   } else {
      //     console.error("Error creating order");
      //   }
    }

    // await axios(`${this.baseUrl}/v2/checkout/orders`, {
    //   method: "post",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + accessToken,
    //   },
    //   data: JSON.stringify({
    //     intent: "CAPTURE",
    //     purchase_units: [
    //       {
    //         items: [
    //           {
    //             name: `Lead purchase -- ${orderType}`,
    //             description: `The purchase is for ${orderType} lead.`,
    //             quantity: 1,
    //             unit_amount: amount_unit,
    //           },
    //         ],
    //         amount: {
    //           ...amount_unit,
    //           breakdown: {
    //             item_total: amount_unit,
    //           },
    //         },
    //       },
    //     ],
    //     application_context: {
    //       return_url: `${process.env.BASE_URL}/dashboard/broker/leads/${lead_id}/purchase/complete`,
    //       cancel_url: `${process.env.BASE_URL}/dashboard/broker/leads/${lead_id}/purchase/cancel`,
    //       shipping_preference: "NO_SHIPPING",
    //       user_action: "PAY_NOW",
    //       brand_name: "Mortgage Hub",
    //     },
    //   }),
    // });
  }

  public async captureOrder(orderID: string) {
    const collect = {
      id: orderID,
      prefer: "return=minimal",
    };

    try {
      const { body, ...httpResponse } =
        await this.ordersController.ordersCapture(collect);
      // Get more response info...
      // const { statusCode, headers } = httpResponse;
      console.log("body", body);
      console.log("http response", httpResponse);
      return {
        jsonResponse: JSON.parse(body as string),
        httpStatusCode: httpResponse.statusCode,
        result: httpResponse.result,
      };
    } catch (error) {
      if (error instanceof ApiError) {
        // const { statusCode, headers } = error;
        throw new Error(error.message);
      }
    }
  }
}

export const paypal = new PayPal();
