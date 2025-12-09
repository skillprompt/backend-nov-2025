import { Request, Response } from "express";
import { loggedInUsers, removeUser } from "./loginUser.controller";

export async function logoutUserController(req: Request, res: Response) {
  const token = req.query.token as string;

  if (!token) {
    throw new Error(`You are not logged in!`);
  }

  const userFound = loggedInUsers.find((userToken) => userToken === token);

  if (!userFound) {
    throw new Error(`You are not logged in!`);
  }

  removeUser(token);

  res.json({
    message: "You are logged out!",
  });
}
