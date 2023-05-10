import jwt from "jsonwebtoken";

import { Response, NextFunction } from "express";
import { IRequest } from "../config/inferfaces";

import dotenv from "dotenv";
dotenv.config({ path: ".../.env" });

export async function checkCookie(
  req: IRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token;
  try {
    if (!token) return res.status(403).json({ message: "Error! Logging out!" });
    const user = jwt.verify(token, process.env.SECRET as string);
    req.user = user;
    next();
  } catch (e) {
    return res.status(403).json({ message: "Error" });
  }
}
