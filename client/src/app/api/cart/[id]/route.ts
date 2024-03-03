export const dynamic = "force-dynamic";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = params.id;
  try {
    const userId = params.id;
    const res = await fetch(`${process.env.API_URL}/api/cart/${userId}`);
    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    console.log(error);
  }
}
