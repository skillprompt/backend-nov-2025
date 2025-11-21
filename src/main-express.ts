import express from "express";
import { createTodoRouter } from "./routers/todo.router";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "hello from express updated!",
  });
});

createTodoRouter(app);

app.listen(4000, () => {
  console.log("Listening on http://localhost:4000");
});
