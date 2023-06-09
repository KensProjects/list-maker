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
import { checkAuth } from "./middleware/checkAuth";
import { connectDB } from "./config/db";

const port: number = Number(process.env.PORT) ?? 7500;

app.use(cookieParser());

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin:["http://localhost:5173", process.env.ORIGIN as string]
  })
);

connectDB();

app.get("/", checkServer);

app.post("/login", checkAuth, loginUser);

app.post("/register", checkAuth, registerUser);

app.get("/auth", checkCookie, authCheck);

app.get("/dashboard", checkCookie, getUser);

app.post("/dashboard", checkCookie, createEntry);

app.delete("/dashboard/:id", checkCookie, deleteEntry);

app.get("/logout", checkCookie, logoutUser);

app.listen(port, () => console.log(`Connected on port ${port}`));
