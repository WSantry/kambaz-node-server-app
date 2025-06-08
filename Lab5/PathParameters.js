export default function PathParameters(app) {
  const int = (x) => parseInt(x);

  app.get("/lab5/add/:a/:b",      (req, res) => res.send((int(req.params.a) + int(req.params.b)).toString()));
  app.get("/lab5/subtract/:a/:b", (req, res) => res.send((int(req.params.a) - int(req.params.b)).toString()));
  app.get("/lab5/multiply/:a/:b", (req, res) => res.send((int(req.params.a) * int(req.params.b)).toString()));
  app.get("/lab5/divide/:a/:b",   (req, res) => res.send((int(req.params.a) / int(req.params.b)).toString()));
}
