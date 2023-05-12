import { NextFunction, Response } from "express";
import { IRequest } from "../config/inferfaces";

export async function checkAuth(
  req: IRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token;
  try {
    if (!token) {
      next();
    } else {
      return res.status(403).json({ message: "Please log out previous user." });
    }
  } catch (error) {
    console.error(error);
  }
}
