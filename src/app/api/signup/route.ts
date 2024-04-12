import { NextRequest, NextResponse } from "next/server";
import User from "@/db/user-model";
import { ConnectDB } from "@/db/connect";

export async function POST(req: NextRequest) {
  await ConnectDB();
  const { username, email, password } = await req.json();
  try {
    let existingUser = await User.findOne({
      email,
    });
    if (
      existingUser &&
      (existingUser.password.includes("%github%") ||
        existingUser.password.includes("%google%"))
    ) {
      throw new Error("Email being used for google or github signin");
    } else if (existingUser) {
      throw new Error("Email already taken");
    }
    existingUser = await User.findOne({
      username,
    });
    if (existingUser) {
      throw new Error("Username already taken");
    }
    const user = await User.create({
      username,
      email,
      password,
    });
    user.id = user._id;
    await user.save();
    return NextResponse.json({ message: "User signed in successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 400 });
  }
}
