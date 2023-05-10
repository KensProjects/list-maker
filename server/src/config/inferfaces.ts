import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface IRequest extends Request {
  user?: JwtPayload | string;
  cookies: { token: string };
}
export interface IUsername {
  username: string;
}

export type TEntry = {
  entry: string;
  id?(): string;
};
export type TUser = {
  save(): () => void;
  username: string;
  password: string;
};
