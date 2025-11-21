import express from "express";

const app = express();

interface Todo {
  id: number;
  title: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
}

let todos: Todo[] = [];

app.use(express.json());

// routes
app.get("/", (req, res) => {
  // res.send("hello from express!")
  res.json({
    message: "hello from express updated!",
  });
});

app.get("/contact-us", (req, res) => {
  res.send(`<h1>Contact us</h1>`);
});

// create todo route
app.post("/todos", (req, res) => {
  console.log("body", req.body);

  const body: Todo = req.body;

  todos.push(body);

  res.json({
    message: "create todo",
    data: body,
  });
});

// get all todos
app.get("/todos", (req, res) => {
  const query = req.query;
  console.log("query recceived", query); // {status: "IN_PROGRESS"}

  if (!query.status) {
    res.json({
      message: "Fetched todos",
      data: todos,
    });
    return;
  }

  /**
   * 
   * {
  "message": "Todos fetched",
  "data": [
    {
      "id": 1,
      "title": "create a update todo route.",
      "author": "Baijan",
      "status": "COMPLETED"
    },
    {
      "id": 2,
      "title": "create a update todo route.",
      "author": "Baijan",
      "status": "COMPLETED"
    },
    {
      "id": 3,
      "title": "create a update todo route.",
      "author": "Baijan",
      "status": "IN_PROGRESS"
    },
    {
      "id": 4,
      "title": "create a update todo route.",
      "author": "Baijan",
      "status": "IN_PROGRESS"
    },
    {
      "id": 5,
      "title": "create a update todo route.",
      "author": "Baijan",
      "status": "COMPLETED"
    }
  ]
}
   * 
   */

  const filteredTodos = todos.filter((todo) => {
    if (todo.status === query.status) return true;
    else return false;
  });

  res.json({
    message: "Todos fetched",
    data: filteredTodos,
  });
});

// delete a todo
app.delete("/todos/:todoId", (req, res) => {
  const params = req.params;
  console.log("params", params); // { todoId: '1' }

  const todoId = parseInt(params.todoId);

  const todoIdx = todos.findIndex((todo) => {
    if (todoId === todo.id) return true;
    else return false;
  });

  if (todoIdx === -1) {
    // todo is not found
    res.status(404).json({
      message: `todo not found by id - ${todoId}`,
    });
    return;
  }

  // todo is found, so delete it
  const splicedTodos = todos.splice(todoIdx, 1);
  console.log("spliced todos", splicedTodos);

  res.json({
    message: "Todo deleted successfully",
    data: splicedTodos,
  });
});

// get by id
app.get("/todos/:todoId", (req, res) => {
  const params = req.params;

  const todoId = parseInt(params.todoId);

  const todoIdx = todos.findIndex((todo) => {
    if (todo.id === todoId) return true;
    else return false;
  });

  if (todoIdx === -1) {
    res.status(404).json({
      message: `Todo not found by id - ${todoId}`,
    });
    return;
  }

  res.json({
    message: "Todo fetched",
    data: todos[todoIdx],
  });
});

// update by id
app.put("/todos/:todoId", (req, res) => {
  const body: Todo = req.body;

  const params = req.params;

  const todoId = parseInt(params.todoId);

  const todoIdx = todos.findIndex((todo) => {
    if (todo.id === todoId) return true;
    else return false;
  });

  if (todoIdx === -1) {
    res.status(404).json({
      message: `Todo not found by id - ${todoId}`,
    });
    return;
  }

  // update here
  const updatedTodos = todos.map((todo) => {
    if (todo.id === todoId) {
      // element found to update
      return {
        ...todo,
        ...body,
      };
    } else {
      // don't update
      return todo;
    }
  });

  todos = updatedTodos;

  res.json({
    message: "Todo updated!",
    data: body,
  });
});

app.listen(4000, () => {
  console.log("Listening on http://localhost:4000");
});
