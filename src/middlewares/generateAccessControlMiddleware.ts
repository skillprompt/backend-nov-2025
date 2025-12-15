import { Request, Response, NextFunction } from "express";

type Role = "SUPER_ADMIN" | "USER" | "ADMIN";

export function generateAccessControlMiddleware(roles: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

    if (!userRole) {
      res.status(401).json({
        message: `Your user role not found`,
      });
      return;
    }

    if (!roles.includes(userRole)) {
      res.status(403).json({
        message: `Unauthorized! you cannot access this resource. Expected Roles: ${roles.join(
          ", "
        )} but Got Role: ${userRole}`,
      });
      return;
    }

    next();
  };
}
