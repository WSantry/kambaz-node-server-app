import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {
  app.post  ("/api/users/:uid/enroll/:cid",
             (req,res)=>{ dao.enrollUserInCourse(req.params.uid, req.params.cid); res.sendStatus(200); });

  app.delete("/api/users/:uid/enroll/:cid",
             (req,res)=>{ res.send(dao.unenrollUserFromCourse(req.params.uid, req.params.cid)); });

  app.get   ("/api/users/:uid/enrollments",
             (req,res)=>res.json(dao.findEnrollmentsForUser(req.params.uid)));
}
