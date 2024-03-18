export const dynamic = "force-dynamic";
import { Product } from "@/types/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");
  try {
    if (query === "favourites") {
      const res = await fetch(`${process.env.API_URL}/api/products`);
      const data = await res.json();
      const favourites = data
        .sort((a: Product, b: Product) => b.rating - a.rating)
        .slice(0, 3);
      return Response.json(favourites);
    }
    const res = await fetch(`${process.env.API_URL}/api/products`);
    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    console.log(error);
  }
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
