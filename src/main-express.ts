import express from "express";

const app = express();

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

  res.json({
    message: "create todo",
  });
});

app.listen(4000, () => {
  console.log("Listening on http://localhost:4000");
});
