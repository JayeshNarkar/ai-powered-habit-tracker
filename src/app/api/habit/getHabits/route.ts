import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const data = await getServerSession({ req });
  console.log(data.user);
  return new Response(JSON.stringify(data.user));
}
