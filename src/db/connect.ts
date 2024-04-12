import mongoose from "mongoose";

export async function ConnectDB() {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    const mongoUrl = process.env.MONGO_URL || "";
    await mongoose.connect(mongoUrl);
  } catch (e) {
    console.log("error connecting to db " + e);
  }
}
