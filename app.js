const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

let todos = [];

// Home Page
app.get("/", (req, res) => {

  let list = todos.map((todo, index) => {
    return `<li>
      ${todo.task} - ${todo.done ? "✅" : "❌"}
      <a href="/complete/${index}">[Done]</a>
      <a href="/delete/${index}">[Delete]</a>
    </li>`;
  }).join("");

  res.send(`
    <h1>To-Do List ✅</h1>

    <form method="POST" action="/add">
      <input name="task" placeholder="Enter task" required />
      <button type="submit">Add</button>
    </form>

    <h2>Tasks:</h2>
    <ul>${list}</ul>
  `);
});

// Add Task
app.post("/add", (req, res) => {
  todos.push({ task: req.body.task, done: false });
  res.redirect("/");
});

// Mark Complete
app.get("/complete/:id", (req, res) => {
  todos[req.params.id].done = true;
  res.redirect("/");
});

// Delete Task
app.get("/delete/:id", (req, res) => {
  todos.splice(req.params.id, 1);
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});