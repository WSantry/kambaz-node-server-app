import PathParameters       from "./PathParameters.js";
import QueryParameters      from "./QueryParameters.js";
import WorkingWithObjects   from "./WorkingWithObjects.js";
import WorkingWithArrays    from "./WorkingWithArrays.js";

export default function Lab5(app) {
  /* simple sanity-check endpoint */
  app.get("/lab5/welcome", (_, res) => res.send("Welcome to Lab 5"));

  /* sub-modules */
  PathParameters(app);
  QueryParameters(app);
  WorkingWithObjects(app);
  WorkingWithArrays(app);
}
