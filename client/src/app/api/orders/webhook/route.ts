import Stripe from "stripe";
import getRawBody from "raw-body";
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
  return new Promise((resolve, reject) => {
    let cartItems = [];

    line_items?.data?.forEach(async (item: any) => {
      const product = await stripe.products.retrieve(item.price.product);
      const productId = product.metadata.productId;

      cartItems.push({
        product: productId,
        name: product.name,
        price: item.price.unit_amount_decimal / 100,
        quantity: item.quantity,
        image: product.images[0],
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
    console.log(apiKey);
    const bodyString = await req.text();
    let event;

    try {
      event = stripe.webhooks.constructEvent(bodyString, sig, endpointSecret);
    } catch (err: any) {
      console.log("Webhook error: ", err.message);
      return NextResponse.json(
        { error: `Webhook Error: ${err.message}` },
        { status: 400 }
      );
    }

    console.log("event.type", JSON.stringify(event.type));

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
      const lineItems = session.line_items;

      if (!lineItems || !apiKey)
        return NextResponse.json(
          { error: "Internal Server Error" },
          { status: 500 }
        );

      try {
        // Save the data, change customer account info, etc
        console.log("Fullfill the order with custom logic");
        console.log("data", lineItems.data);
        console.log(
          "customer email",
          (event.data.object as any).customer_details.email
        );
        const orderItems = await getCartItems(lineItems);
        const userId = session.client_reference_id;
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
          shippingInfo: session.metadata ? session.metadata.shippingInfo : "",
          paymentInfo,
          orderItems,
        };

        console.log("Payment: ", paymentInfo);
        console.log("Order Data ", orderData);
        console.log("created", (event.data.object as any).created);
        // const order = await Order.create(orderData); hier order.post
        return NextResponse.json({ success: true }, { status: 200 });
      } catch (error: any) {
        console.log(error.message);
        return NextResponse.json(
          { error: "Internal Server Error" },
          { status: 500 }
        );
      }
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
