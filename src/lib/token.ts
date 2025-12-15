import jwt from "jsonwebtoken";
import { Role } from "../generated/prisma/enums";
import { ENV } from "./env";

type TTokenPayload = {
  id: number;
  email: string;
  role: Role;
  username: string;
};

export function generateToken(userPayload: TTokenPayload) {
  const token = jwt.sign(userPayload, ENV.JWT_SECRET, {
    expiresIn: ENV.JWT_EXPIRATION_TIME_IN_SECONDS, // 15 minutes
  });
  return token;
}

export function verifyToken(token: string) {
  try {
    const userPayload = jwt.verify(token, ENV.JWT_SECRET);
    return userPayload as TTokenPayload;
  } catch (error) {
    console.error(`Failed to verify the token`, error);
    return null;
    // throw new Error(`Failed to verify the token`);
  }
}
