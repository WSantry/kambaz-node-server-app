import * as dao from "./dao.js";

export default function EnrollmentRoutes(app){
  app.post  ("/api/users/:uid/enroll/:cid",  async (req,res)=>{
    await dao.enrollUserInCourse(req.params.uid, req.params.cid);
    res.sendStatus(200);
  });

  app.delete("/api/users/:uid/enroll/:cid", async (req,res)=>{
    res.json(await dao.unenrollUserFromCourse(req.params.uid, req.params.cid));
  });

  app.get   ("/api/users/:uid/enrollments",  async (req,res)=>
    res.json(await dao.findEnrollmentsForUser(req.params.uid)));
}
