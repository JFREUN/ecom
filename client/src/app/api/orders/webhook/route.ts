import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY as string, {
  apiVersion: "2023-10-16",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;
const apiKey = process.env.STRIPE_PRIVATE_KEY as string;

// Make sure to add this, otherwise you will get a stream.not.readable error
export const config = {
  api: {
    bodyParser: false,
  },
};

async function getCartItems(line_items: any) {
  return new Promise((resolve) => {
    let cartItems = [];

    line_items?.data?.forEach(async (item: any) => {
      const product = await stripe.products.retrieve(item.price.product);
      const productId = product.metadata.productId;

      cartItems.push({
        product: productId,
        quantity: item.quantity,
      });

      if (cartItems.length === line_items?.data.length) {
        resolve(cartItems);
      }
    });
  });
}

export async function POST(req: NextRequest) {
  try {
    const sig: any = req.headers.get("stripe-signature");
    const bodyString = await req.text();
    let event;

    try {
      event = stripe.webhooks.constructEvent(bodyString, sig, endpointSecret);
    } catch (err: any) {
      return NextResponse.json(
        { error: `Webhook Error: ${err.message}` },
        { status: 400 }
      );
    }

    if (event.type === "checkout.session.completed") {
      const session = await stripe.checkout.sessions.retrieve(
        (event.data.object as any).id,
        {
          expand: ["line_items"],
        },
        {
          apiKey: apiKey?.split(" ")[1],
        }
      );
      const isLoggedIn = session.metadata?.isLoggedIn === "true";
      const lineItems = session.line_items;

      if (!lineItems || !apiKey)
        return NextResponse.json(
          { error: "Internal Server Error" },
          { status: 500 }
        );
      if (isLoggedIn) {
        try {
          // Save the data, change customer account info, etc
          const orderItems = await getCartItems(lineItems);
          const userId = session.metadata?.userId;
          const amountPaid = session.amount_total
            ? session.amount_total / 100
            : 0;

          const paymentInfo = {
            id: session.payment_intent,
            status: session.payment_status,
            amountPaid,
            taxPaid: session.total_details
              ? session.total_details.amount_tax / 100
              : 0,
          };

          const orderData = {
            user: userId,
            shippingInfo: session.metadata
              ? JSON.parse(session.metadata.shippingInfo)
              : "",
            paymentInfo,
            orderItems,
          };

          const res = await fetch(`${process.env.API_URL}/api/orders`, {
            method: "POST",
            body: JSON.stringify(orderData),
            headers: {
              "Content-Type": "application/json",
            },
          });

          const data = await res.json();
          console.log("Order data sent: ", orderData); // Added: Logging order data
          console.log("Response data: ", data); // Added: Logging response data

          if (res.status !== 200) {
            // Added: Check for non-200 response
            console.error("Failed to create order: ", data); // Added: Logging error
            return NextResponse.json(
              { error: "Failed to create order" },
              { status: 500 }
            );
          }
          return NextResponse.json(data, { status: 200 });
        } catch (error: any) {
          console.error("Error processing order: ", error);
          return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
          );
        }
      } else {
        console.log("Guest order");
        return NextResponse.json({ status: 200 });
      }
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
