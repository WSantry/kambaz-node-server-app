import * as dao from "./dao.js";
export default function ModuleRoutes(app) {
  app.delete("/api/modules/:moduleId", (req,res)=>res.send(dao.deleteModule(req.params.moduleId)));
  app.put   ("/api/modules/:moduleId", (req,res)=>res.send(dao.updateModule(req.params.moduleId, req.body)));
}