import express from "express";
import { createTodoRouter } from "./routers/todo.router";
import { createCategoryRouter } from "./routers/category.router";
import { createUserRouter } from "./routers/user.router";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "hello from express updated!",
  });
});

createTodoRouter(app);
createCategoryRouter(app);
createUserRouter(app);

app.listen(4000, () => {
  console.log("Listening on http://localhost:4000");
});
