import * as dao from "./dao.js";
export default function ModuleRoutes(app){
  app.delete("/api/modules/:moduleId", async (req,res)=>
    res.json(await dao.deleteModule(req.params.moduleId)));

  app.put   ("/api/modules/:moduleId", async (req,res)=>
    res.json(await dao.updateModule(req.params.moduleId, req.body)));
}
