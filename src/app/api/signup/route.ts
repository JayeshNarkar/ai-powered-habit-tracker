import { NextRequest, NextResponse } from "next/server";
import User from "@/db/user-model";
import { ConnectDB } from "@/db/connect";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  await ConnectDB();
  const { username, email, password } = await req.json();
  try {
    let existingUser = await User.findOne({
      email,
    });
    if (existingUser) {
      throw new Error("Email already taken");
    }
    existingUser = await User.findOne({
      username,
    });
    if (existingUser) {
      throw new Error("Username already taken");
    }

    const user = await User.create({
      _id: new mongoose.Types.ObjectId().toHexString(),
      username,
      email,
      password,
    });

    return NextResponse.json({ message: "User signed in successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 400 });
  }
}
