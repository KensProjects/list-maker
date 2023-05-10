import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: ".../.env" });

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_TEST_URL as string);
  } catch (e) {
    return console.error("Error!");
  }
}
