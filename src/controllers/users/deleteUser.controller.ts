import { Request, Response } from "express";
import { deleteUser } from "../../prisma-models/user.model";

export async function deleteUserController(req: Request, res: Response) {
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

  const deletedUser = await deleteUser(userId);

  res.json({
    data: deletedUser,
    message: "User deleted!",
  });
}
