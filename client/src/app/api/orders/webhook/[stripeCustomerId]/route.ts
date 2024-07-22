import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { StripeCharge } from "@/types/charges";
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

export async function GET(
  req: NextRequest,
  { params }: { params: { stripeCustomerId: string } }
) {
  try {
    const orders = await stripe.charges.list({
      customer: params.stripeCustomerId,
    });

    const charges = orders.data;

    console.log("Orders: ", orders);
    return NextResponse.json(charges);
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
}
