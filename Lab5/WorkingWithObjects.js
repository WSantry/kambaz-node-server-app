/* ── in-memory objects (persist until server reboot) ───── */
const assignment = {
  id: 1,
  title:       "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due:         "2021-10-10",
  completed:   false,
  score:       0,
};

let moduleObj = {
  id:          "CS4550-mod-1",
  name:        "Introduction to NodeJS",
  description: "Basics of Node & npm",
  course:      "CS4550",
};

export default function WorkingWithObjects(app) {
  /* assignment --------------------------------------------------- */
  app.get("/lab5/assignment",         (_, res) => res.json(assignment));
  app.get("/lab5/assignment/title",   (_, res) => res.json(assignment.title));

  app.get("/lab5/assignment/title/:new", (req, res) => {
    assignment.title = req.params.new;
    res.json(assignment);
  });

  app.get("/lab5/assignment/score/:score", (req, res) => {
    assignment.score = parseInt(req.params.score);
    res.json(assignment);
  });

  app.get("/lab5/assignment/completed/:done", (req, res) => {
    assignment.completed = req.params.done === "true";
    res.json(assignment);
  });

  /* module ------------------------------------------------------- */
  app.get("/lab5/module",       (_, res) => res.json(moduleObj));
  app.get("/lab5/module/name",  (_, res) => res.json(moduleObj.name));

  app.get("/lab5/module/name/:new", (req, res) => {
    moduleObj.name = req.params.new;
    res.json(moduleObj);
  });

  app.get("/lab5/module/description/:desc", (req, res) => {
    moduleObj.description = req.params.desc;
    res.json(moduleObj);
  });
}
