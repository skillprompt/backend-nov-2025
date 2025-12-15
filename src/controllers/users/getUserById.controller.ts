import { Request, Response } from "express";
import { getUserById } from "../../prisma-models/user.model";

export async function getUserByIdController(req: Request, res: Response) {
  const paramsUserId = Number(req.params.userId);
  const userId = req.user?.id;
  if (!userId) {
    res.status(401).json({
      message: "You are not authorized!",
    });
    return;
  }

  if (paramsUserId !== userId) {
    res.status(401).json({
      message: "You can only view your user details.",
    });
    return;
  }

  const user = await getUserById(userId);

  res.json({
    data: user,
    message: "User fetched!",
  });
}
