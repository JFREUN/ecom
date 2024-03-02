export const dynamic = "force-dynamic";
import { Product } from "@/types/product";
import { get } from "@/utils/api/get";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = params.id;
    const res = await fetch(`${process.env.API_URL}/api/products/${productId}`);
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
