import { Request, Response } from "express";
import { getAllTodos, StatusType } from "../models/todo.model";

export const getAllTodosController = (req: Request, res: Response) => {
  const query = req.query;

  const todos = getAllTodos({
    status: query.status as StatusType,
  });

  res.json({
    message: "Todos fetched!",
    data: todos,
  });
};
