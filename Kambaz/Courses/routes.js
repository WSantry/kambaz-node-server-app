import * as dao         from "./dao.js";
import * as modulesDao  from "../Modules/dao.js";
import db from "../Database/index.js";

export default function CourseRoutes(app) {
  app.get   ("/api/courses",               (_ ,res)=>res.json(dao.findAllCourses()));
  app.post  ("/api/courses",               (req,res)=>res.json(dao.createCourse(req.body)));
  app.delete("/api/courses/:courseId",     (req,res)=>res.send(dao.deleteCourse(req.params.courseId)));
  app.put   ("/api/courses/:courseId",     (req,res)=>res.send(dao.updateCourse(req.params.courseId, req.body)));

  // modules for a course
  app.get   ("/api/courses/:courseId/modules",            (req,res)=>res.json(modulesDao.findModulesForCourse(req.params.courseId)));
  app.post  ("/api/courses/:courseId/modules",            (req,res)=>{
    const m = modulesDao.createModule({ ...req.body, course:req.params.courseId });
    res.json(m);
  });

   app.get("/api/courses/:courseId/users", (req,res)=>{
    const { users, enrollments } = db;
    const ids = enrollments.filter(e=>e.course===req.params.courseId).map(e=>e.user);
    res.json(users.filter(u=>ids.includes(u._id)));
  });
}