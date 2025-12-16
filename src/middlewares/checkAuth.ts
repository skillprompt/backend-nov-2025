import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";
import { verifyToken } from "../lib/token";

export async function checkAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = (req.cookies.token || req.headers.token) as string;

  if (!token) {
    res.status(401).json({
      message: "You are not logged in!",
    });
    return;
  }

  // const userSession = await prisma.userSession.findFirst({
  //   where: {
  //     session_id: token,
  //   },
  //   include: {
  //     user: true,
  //   },
  // });
  // if (!userSession) {
  //   res.status(401).json({
  //     message: "your session not found! please login again.",
  //   });
  //   return;
  // }

  const userPayload = verifyToken(token);
  if (!userPayload) {
    res.status(401).json({
      message: "Error verifying token! please login again.",
    });
    return;
  }

  req.user = userPayload;

  next();
}

export async function checkRefreshToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = (req.cookies.refreshToken ||
    req.headers.refreshToken) as string;

  if (!token) {
    res.status(401).json({
      message:
        "You are not logged in! Your token has expired. Please login again!",
    });
    return;
  }

  // const userSession = await prisma.userSession.findFirst({
  //   where: {
  //     session_id: token,
  //   },
  //   include: {
  //     user: true,
  //   },
  // });
  // if (!userSession) {
  //   res.status(401).json({
  //     message: "your session not found! please login again.",
  //   });
  //   return;
  // }

  const userPayload = verifyToken(token);
  if (!userPayload) {
    res.status(401).json({
      message: "Error verifying token! please login again.",
    });
    return;
  }

  req.user = userPayload;

  next();
}
