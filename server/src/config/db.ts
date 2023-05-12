import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: ".../.env" });

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log("Connected to DB")
  } catch (e) {
    console.error("Connection error!");
  }
}
