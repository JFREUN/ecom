export const dynamic = "force-dynamic";
import { get } from "@/utils/api/get";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET() {
  try {
    const res = await fetch(`${process.env.API_URL}/api/products`);
    const data = await res.json();
    return Response.json({ data });
  } catch (error) {
    console.log(error);
  }
}
