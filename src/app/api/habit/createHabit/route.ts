import Habit from "@/db/habit-model";
import { ConnectDB } from "@/db/connect";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { name, creator } = await req.json();
  try {
    await ConnectDB();
  } catch (error) {}
}
