import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    console.log("client body", req.body);
    const res = await fetch(`${process.env.API_URL}/auth/signup`, {
      method: "POST",
      body: JSON.stringify(req.body),
    });
    const data = await res.json();
    return new Response(JSON.stringify(data), { status: res.status });
  } catch (error) {
    console.log(error);
  }
}
