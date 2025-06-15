import * as dao          from "./dao.js";
import * as modulesDao   from "../Modules/dao.js";
import * as enrollDao    from "../Enrollments/dao.js";

export default function CourseRoutes(app) {

  /* ───── courses CRUD ───── */
  app.get ("/api/courses", async (_req,res)=> res.json(await dao.findAllCourses()));

  app.post("/api/courses", async (req,res)=>{
    const course = await dao.createCourse(req.body);
    const current = req.session.currentUser;
    if (current) await enrollDao.enrollUserInCourse(current._id, course._id);
    res.json(course);
  });

  app.delete("/api/courses/:courseId", async (req,res)=>
    res.json(await dao.deleteCourse(req.params.courseId)));

  app.put("/api/courses/:courseId", async (req,res)=>
    res.json(await dao.updateCourse(req.params.courseId, req.body)));

  /* ───── modules for a course ───── */
  app.get ("/api/courses/:courseId/modules", async (req,res)=>
    res.json(await modulesDao.findModulesForCourse(req.params.courseId)));

  app.post("/api/courses/:courseId/modules", async (req,res)=>{
    const mod = await modulesDao.createModule({ ...req.body, course:req.params.courseId });
    res.json(mod);
  });

  /* ───── users in a course ───── */
  app.get("/api/courses/:courseId/users", async (req,res)=>
    res.json(await enrollDao.findUsersForCourse(req.params.courseId)));
}
