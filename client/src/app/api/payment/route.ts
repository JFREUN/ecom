import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY!);
    const data = await req.json();
    const shippingInfo = data.shippingInfo;
    const session = await stripe.checkout.sessions.create({
      line_items: data.lineItems,
      customer_email: data.customerEmail,
      mode: "payment",
      metadata: { shippingInfo },
      shipping_options: [
        { shipping_rate: "shr_1Oxed8F0LVbhBF2oR7DkLHlQ" },
        { shipping_rate: "shr_1OxecsF0LVbhBF2oNZiRJrkA" },
      ],
      success_url: "http://localhost:3000",
      cancel_url: "http://localhost:3000",
    });
    return NextResponse.json(session.url);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
