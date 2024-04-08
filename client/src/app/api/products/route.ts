export const dynamic = "force-dynamic";
import { Product, StripeProduct } from "@/types/product";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET(request: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY!);
  const fetchedProducts = await stripe.products.list({
    limit: 8,
  });

  const prices = await stripe.prices.list({
    limit: 8,
  });

  const products = fetchedProducts.data.map((product: any) => {
    const selectedPrice = prices.data.find(
      (price) => price.product === product.id
    );
    const returnProduct: StripeProduct = {
      _id: product.id,
      name: product.name,
      description: product.description,
      imageUrl: product.images[0],
      price: selectedPrice ? (selectedPrice.unit_amount as number) : 1,
      priceId: selectedPrice ? selectedPrice.id : "",
      quantity: 1,
    };

    return returnProduct;
  });

  return NextResponse.json(products);
  // const searchParams = request.nextUrl.searchParams;
  // const query = searchParams.get("query");
  // try {
  //   if (query === "favourites") {
  //     const res = await fetch(`${process.env.API_URL}/api/products`);
  //     const data = await res.json();
  //     const favourites = data
  //       .sort((a: Product, b: Product) => b.rating - a.rating)
  //       .slice(0, 3);
  //     return Response.json(favourites);
  //   }
  //   const res = await fetch(`${process.env.API_URL}/api/products`);
  //   const data = await res.json();
  //   return Response.json(data);
  // } catch (error) {
  //   console.log(error);
  // }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const res = await fetch(
      `${process.env.API_URL}/api/products/image/upload`,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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
