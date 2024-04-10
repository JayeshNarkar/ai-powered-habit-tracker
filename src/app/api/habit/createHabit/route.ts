import Habit from "@/db/habit-model";
import { ConnectDB } from "@/db/connect";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    await ConnectDB();
  } catch (error) {}
}
