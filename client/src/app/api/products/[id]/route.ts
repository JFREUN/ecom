import Stripe from "stripe";
import { StripeProduct } from "@/types/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY!);
    const productId = params.id;

    const fetchedProduct = await stripe.products.retrieve(productId);
    const fetchedPrice = await stripe.prices.retrieve(
      fetchedProduct.default_price as string
    );

    const returnProduct: StripeProduct = {
      _id: fetchedProduct.id,
      name: fetchedProduct.name,
      description: fetchedProduct.description ? fetchedProduct.description : "",
      imageUrl: fetchedProduct.images[0],
      price: fetchedPrice.unit_amount ? fetchedPrice.unit_amount : 1,
      priceId: fetchedPrice ? fetchedPrice.id : "",
      quantity: 1,
    };

    console.log(returnProduct);

    return NextResponse.json(returnProduct);
  } catch (error) {
    console.log(error);
  }
}
