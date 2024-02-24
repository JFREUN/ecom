export const dynamic = "force-dynamic";
import { Product } from "@/types/product";
import { get } from "@/utils/api/get";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");
    const res = await fetch(`${process.env.API_URL}/api/products`);
    const data = await res.json();
    const favourites = data
      .sort((a: Product, b: Product) => b.rating - a.rating)
      .slice(0, 3);
    console.log("All products, favourites", { data, favourites });
    if (query === "favourites") return Response.json(favourites);
    return Response.json(data);
  } catch (error) {
    console.log(error);
  }
}

// export async function POST(request: Request) {
//   const formData = await request.formData();
//   const name = formData.get("name");
//   const email = formData.get("email");
//   return Response.json({ name, email });
// }
