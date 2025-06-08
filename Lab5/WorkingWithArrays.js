let todos = [
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: true  },
  { id: 3, title: "Task 3", completed: false },
  { id: 4, title: "Task 4", completed: true  },
];

export default function WorkingWithArrays(app) {
  /* -------- CREATE (legacy GET and proper POST) ---------------- */
  app.get("/lab5/todos/create", (_, res) => {
    const newTodo = { id: Date.now(), title: "New Task", completed: false };
    todos.push(newTodo);
    res.json(todos);                // legacy lab wants full array back
  });

  app.post("/lab5/todos", (req, res) => {
    const newTodo = { ...req.body, id: Date.now() };
    todos.push(newTodo);
    res.json(newTodo);              // real-world POST returns the new item
  });

  /* -------- READ ----------------------------------------------- */
  app.get("/lab5/todos", (req, res) => {
    const { completed } = req.query;
    if (completed !== undefined) {
      const flag = completed === "true";
      return res.json(todos.filter(t => t.completed === flag));
    }
    res.json(todos);
  });

  app.get("/lab5/todos/:id", (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    res.json(todo);
  });

  /* -------- UPDATE (legacy GET and proper PUT) ----------------- */
  app.get("/lab5/todos/:id/title/:title",       (req, res) => updateLegacy(req, res, { title: req.params.title }));
  app.get("/lab5/todos/:id/description/:desc",  (req, res) => updateLegacy(req, res, { description: req.params.desc }));
  app.get("/lab5/todos/:id/completed/:done",    (req, res) => updateLegacy(req, res, { completed: req.params.done === "true" }));

  app.put("/lab5/todos/:id", (req, res) => {
    const idx = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (idx === -1) return res.status(404).json({ message: `Unable to update Todo with ID: ${req.params.id}` });
    todos[idx] = { ...todos[idx], ...req.body };
    res.sendStatus(200);
  });

  /* -------- DELETE (legacy GET and proper DELETE) -------------- */
  app.get("/lab5/todos/:id/delete", (req, res) => {
    todos = todos.filter(t => t.id !== parseInt(req.params.id));
    res.json(todos);
  });

  app.delete("/lab5/todos/:id", (req, res) => {
    const idx = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (idx === -1) return res.status(404).json({ message: `Unable to delete Todo with ID: ${req.params.id}` });
    todos.splice(idx, 1);
    res.sendStatus(200);
  });

  /* -------- helper for legacy update routes -------------------- */
  function updateLegacy(req, res, changes) {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (todo) Object.assign(todo, changes);
    res.json(todos);
  }
}
