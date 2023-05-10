import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import cookieParser from "cookie-parser";

import {
  getUser,
  registerUser,
  loginUser,
  logoutUser,
  authCheck,
  checkServer,
} from "./controllers/userControllers";

import { createEntry, deleteEntry } from "./controllers/listControllers";
import { checkCookie } from "./middleware/checkCookie";
import { connectDB } from "./config/db";

const port: number = Number(process.env.PORT) ?? 7500;

app.use(cookieParser());

app.use(express.json());

app.use(cors({ credentials: true }));

connectDB();

app.get("/", checkServer);

app.post("/login", loginUser);

app.post("/register", registerUser);

app.get("/auth", checkCookie, authCheck);

app.get("/dashboard", checkCookie, getUser);

app.post("/dashboard", checkCookie, createEntry);

app.delete("/dashboard/:id", checkCookie, deleteEntry);

app.get("/logout", checkCookie, logoutUser);

app.listen(port, () => console.log(`Connected on port ${port}`));
