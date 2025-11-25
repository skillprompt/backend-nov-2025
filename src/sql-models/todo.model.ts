import { appDbConnection } from "../lib/mysql";

export type StatusType = "PENDING" | "IN_PROGRESS" | "COMPLETED";

export interface Todo {
  id: number;
  title: string;
  status: StatusType;
  description: string;
  completed_at: string;
  created_at: string;
  updated_at: string;
  user_id: number;
}

export async function createTodo(todoData: Todo) {
  // todos.push(todoData);
  const db = await appDbConnection();

  const result = await db.query(
    `INSERT INTO tasks (title, status, description, completed_at, created_at, updated_at, user_id) VALUES ("${todoData.title}", "${todoData.status}", "${todoData.description}", "${todoData.completed_at}", "${todoData.created_at}", "${todoData.updated_at}", ${todoData.user_id});`
  );

  console.log("created todo result", result);

  return todoData;
}

// export function updateTodo(todoId: number, body: Partial<Todo>) {
//   const todo = getTodoById(todoId);
//   if (!todo.data) {
//     throw new Error(`Todo not found by id - ${todoId}`);
//   }

//   const updatedTodos = todos.map((todo) => {
//     if (todo.id === todoId) {
//       // element found to update
//       return {
//         ...todo,
//         ...body,
//       };
//     } else {
//       // don't update
//       return todo;
//     }
//   });

//   todos = updatedTodos;

//   return todos;
// }

// export function deleteTodo(todoId: number) {
//   const todo = getTodoById(todoId);
//   if (!todo.data) {
//     throw new Error(`Todo not found by id - ${todoId}`);
//   }

//   const splicedTodos = todos.splice(todo.idx, 1);

//   return splicedTodos;
// }

// export function getTodoById(todoId: number) {
//   const todoIdx = todos.findIndex((todo) => {
//     if (todo.id === todoId) return true;
//     else return false;
//   });

//   if (todoIdx === -1) {
//     throw new Error(`Todo not found by id - ${todoId}`);
//   }

//   return {
//     idx: todoIdx,
//     data: todos[todoIdx],
//   };
// }

// export function getAllTodos(query: { status?: StatusType }) {
//   if (!query.status) {
//     return todos;
//   }

//   const filteredTodos = todos.filter((todo) => {
//     if (todo.status === query.status) return true;
//     else return false;
//   });

//   return filteredTodos;
// }
