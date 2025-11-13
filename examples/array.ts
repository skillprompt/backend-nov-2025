const todos = [
  {
    id: 1,
    title: "create update api",
    status: "in_progress",
  },
  {
    id: 2,
    title: "create delete api",
    status: "done",
  },
  {
    id: 5,
    title: "create update api",
    status: "in_progress",
  },
  {
    id: 3,
    title: "create delete api",
    status: "done",
  },
  {
    id: 4,
    title: "create update api",
    status: "in_progress",
  },
];

const idx = todos.findIndex((todo) => {
  if (todo.id === 7) return true;
  else return false;
});

if (idx === -1) {
  throw new Error("Eleement not foudnd!");
}

todos[idx] = {
  id: 1,
  title: "create a update api with db integration",
  status: "done",
};
console.log("todos", todos);
