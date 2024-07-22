import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY!);
export async function POST(req: NextRequest) {
  try {
    console.log("client body", req.body);
    const body = await req.json();

    // Create a Stripe customer
    const stripeCustomer = await stripe.customers.create({
      email: body.email,
      name: `${body.firstName} ${body.lastName}`,
    });
    console.log("Stripe cst:", stripeCustomer);

    // Add the Stripe customer ID to the body
    const modifiedBody = { ...body, stripeCustomerId: stripeCustomer.id };

    // Send the modified body to your authentication service
    const res = await fetch(`${process.env.API_URL}/auth/signup`, {
      method: "POST",
      body: JSON.stringify(modifiedBody),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
