import { Request, Response } from "express";
import { generateToken } from "../../lib/token";
import { ENV } from "../../lib/env";

export async function refreshTokenController(req: Request, res: Response) {
  const user = req.user;
  if (!user) {
    res.status(401).json({
      message: "You are not logged in!",
    });
    return;
  }

  console.log("user", user, ENV.JWT_EXPIRATION_TIME_IN_SECONDS);

  // generate access token
  const accessToken = generateToken(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      username: user.username,
    },
    ENV.JWT_EXPIRATION_TIME_IN_SECONDS
  );

  // generate refresh token
  const refreshToken = generateToken(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      username: user.username,
    },
    ENV.REFRESH_TOKEN_EXPIRATION_TIME_IN_SECONDS
  );

  res.cookie("token", accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: ENV.JWT_TOKEN_COOKIE_AGE_IN_SECONDS * 1000,
    path: "/",
    domain: "localhost",
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    domain: "localhost",
    maxAge: ENV.REFRESH_TOKEN_EXPIRATION_TIME_IN_SECONDS * 1000,
  });

  res.json({
    message: "You are logged in!",
    data: { accessToken, refreshToken },
  });
}
