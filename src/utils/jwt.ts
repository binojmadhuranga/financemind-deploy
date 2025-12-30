import jwt from "jsonwebtoken";
import { AppJwtPayload } from "../types/jwtPayload";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const generateToken = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
};


export const verifyToken = (token: string): AppJwtPayload => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET!);

  if (typeof decoded === "string") {
    throw new Error("Invalid token payload");
  }

  return decoded as AppJwtPayload;
};