declare global {
  namespace Express {
    export interface Request {
      user?: {
        id: number;
        username: string;
        email: string;
        role: "SUPER_ADMIN" | "ADMIN" | "USER";
      };
    }
  }
}
