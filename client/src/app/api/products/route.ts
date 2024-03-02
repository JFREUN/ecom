export const dynamic = "force-dynamic";
import { Product } from "@/types/product";
import { NextRequest } from "next/server";

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

// export async function POST(request: Request) {
//   const formData = await request.formData();
//   const name = formData.get("name");
//   const email = formData.get("email");
//   return Response.json({ name, email });
// }
