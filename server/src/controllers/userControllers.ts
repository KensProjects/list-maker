import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();

import { IRequest, IUsername } from "../config/inferfaces";
import { Response } from "express";

import bcrypt from "bcrypt";

import { User } from "../models/userModel";

export async function checkServer(req: IRequest, res: Response) {
  try {
    return res.status(200).json({ message: "Server up!" });
  } catch (error) {
    console.log("error");
  }
}

export async function getUser(req: IRequest, res: Response) {
  try {
    const { username } = req.user as IUsername;
    const user = await User.findOne({ username: username });
    if (!user) return res.status(403).json({ message: "Unauthorized access!" });
    res.json(user);
  } catch (error) {
    return res.json({ message: "Unauthorized access!" });
  }
}
export async function loginUser(req: IRequest, res: Response) {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(401).json("Please fill in all fields!");
    const user = await User.findOne({ username: username });
    if (!user) return res.status(403).json({ message: "Login failed!" });
    const isPass = await bcrypt.compare(password, user.password);
    if (!isPass) return res.status(403).json({ message: "Login failed!" });
    const payload = {
      id: user._id,
      username: user.username,
      password: user.password,
    };
    const token = jwt.sign(payload, process.env.SECRET as string, {
      expiresIn: "1h",
    });
    const hr = 1000 * 60 * 60; //1 hour
    return res
      .cookie("token", token, {
        expires: new Date(Date.now() + hr),
        httpOnly: true,
        secure: true,
      })
      .json({ message: `Login successful!` });
  } catch (error) {
    return res.json({ message: "Error logging in!" });
  }
}
export async function registerUser(req: IRequest, res: Response) {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(401).json("Please fill all fields!");
    const user = await User.findOne({ username: username });
    if (user) return res.status(403).json({ message: "Registration failed!" });
    const protectedPass = await bcrypt.hash(password, 15);
    const createdUser = await User.create({
      username: username,
      password: protectedPass,
      list: [],
    });
    const payload = {
      id: createdUser._id,
      username: createdUser.username,
      password: createdUser.password,
    };

    const token = jwt.sign(payload, process.env.SECRET as string, {
      expiresIn: "1h",
    });
    const hr = 1000 * 60 * 60; //1 hour
     return res
      .cookie("token", token, {
        expires: new Date(Date.now() + hr),
        httpOnly: true,
        secure: true,
      })
      .json({
        message: `Congratulations, ${username}! Your account has been created.`,
      });
  } catch (error) {
    console.log(error)
    return res.status(401).json({message:"Registration error!"})
  }
}

export async function logoutUser( res: Response) {
  try {
    return res
      .clearCookie("token")
      .json({ message: "Logged out!" });
  } catch (error) {
    return res.json({ message: "Logout error!" });
  }
}
export async function authCheck(req: IRequest, res: Response) {
  try {
    const { username } = req.user as IUsername;
    if (!username) return res.status(403).json({ message: "Unauthorized!" });
    return res.json({ message: username });
  } catch (error) {
    return res.json({ message: "Authorization failed!" });
  }
}
