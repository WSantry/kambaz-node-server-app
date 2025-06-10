import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
  // list & create (scoped to course)
  app.get ("/api/courses/:courseId/assignments",
           (req,res)=>res.json(dao.findAssignmentsForCourse(req.params.courseId)));

  app.post("/api/courses/:courseId/assignments",
           (req,res)=>{
             const a = dao.createAssignment({ ...req.body, course: req.params.courseId });
             res.json(a);
           });

  // update & delete (by id)
  app.put   ("/api/assignments/:aid",  (req,res)=>res.send(dao.updateAssignment(req.params.aid, req.body)));
  app.delete("/api/assignments/:aid",  (req,res)=>res.send(dao.deleteAssignment(req.params.aid)));
}
