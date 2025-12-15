import { Request, Response } from "express";
import { z } from "zod";
import { loginUser } from "../../prisma-models/user.model";
import { comparePassword } from "../../lib/hash";
import { prisma } from "../../lib/prisma";
import { generateToken } from "../../lib/token";
import { ENV } from "../../lib/env";

const LoginUserSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(6).max(15),
});

export type TLoginUserSchema = z.infer<typeof LoginUserSchema>;

export async function loginUserController(req: Request, res: Response) {
  const body = req.body;

  const parsedData = LoginUserSchema.safeParse(body);

  if (!parsedData.success) {
    res.status(400).json({
      message: "Invalid data",
      errors: parsedData.error,
    });
    return;
  }

  // data valid
  const user = await loginUser(parsedData.data);

  // const randomNumberOfLength6 = Math.floor(Math.random() * 1000000);
  // const randomString = randomNumberOfLength6.toString();

  const token = generateToken({
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
  });

  // await prisma.userSession.create({
  //   data: {
  //     user_id: user.id,
  //     session_id: randomString,
  //   },
  // });

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: ENV.JWT_TOKEN_COOKIE_AGE_IN_SECONDS * 1000,
    domain: "localhost", // skillprompt.ccom, backend.skillprompt.com
    secure: false, // in  production keep it always true
    sameSite: "lax",
    path: "/", // /v1/tasks, /v1/users
  });

  res.json({
    message: "Logged in!",
    data: { ...user, token: token },
  });
}
