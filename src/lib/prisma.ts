import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";

const adapter = new PrismaMariaDb({
  host: "localhost",
  port: 3307,
  connectionLimit: 5,
  user: "root",
  password: "password",
  database: "todo_app_prisma",
});
export const prisma = new PrismaClient({ adapter });
