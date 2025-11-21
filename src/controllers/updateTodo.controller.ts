import { Request, Response } from "express";
import { updateTodo } from "../models/todo.model";

export const updateTodoController = (req: Request, res: Response) => {
  const params = req.params;
  const todoId = parseInt(params.todoId as string);

  const body = req.body;

  const updatedTodo = updateTodo(todoId, body);

  res.json({
    message: "Todo updated!",
    data: updatedTodo,
  });
};
