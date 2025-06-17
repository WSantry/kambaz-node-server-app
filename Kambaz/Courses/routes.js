import * as dao            from "./dao.js";
import * as modulesDao     from "../Modules/dao.js";
import * as assignmentsDao from "../Assignments/dao.js";
import * as enrollDao      from "../Enrollments/dao.js";

export default function CourseRoutes(app) {
  /* ────────────────────────────  COURSES  ─────────────────────────── */

  app.get("/api/courses", async (_req, res) =>
    res.json(await dao.findAllCourses())
  );

  app.post("/api/courses", async (req, res) => {
    const course   = await dao.createCourse(req.body);
    const current  = req.session.currentUser;
    if (current) await enrollDao.enrollUserInCourse(current._id, course._id);
    res.json(course);
  });

  /* DELETE course ➜ cascade-delete enrollments, modules, assignments */
  app.delete("/api/courses/:courseId", async (req, res) => {
    const { courseId } = req.params;

    await Promise.all([
      enrollDao.deleteEnrollmentsForCourse(courseId),
      modulesDao.deleteModulesForCourse(courseId),
      assignmentsDao.deleteAssignmentsForCourse(courseId),
    ]);

    const status = await dao.deleteCourse(courseId);
    res.json(status);            // keep same payload shape
  });

  /* UPDATE course */
  app.put("/api/courses/:courseId", async (req, res) =>
    res.json(await dao.updateCourse(req.params.courseId, req.body))
  );

  /* ────────────────────────  MODULES in a course  ─────────────────── */

  app.get("/api/courses/:courseId/modules", async (req, res) =>
    res.json(await modulesDao.findModulesForCourse(req.params.courseId))
  );

  app.post("/api/courses/:courseId/modules", async (req, res) => {
    const mod = await modulesDao.createModule({
      ...req.body,
      course: req.params.courseId,
    });
    res.json(mod);
  });

  /* ─────────────────────────  USERS in a course  ──────────────────── */

  app.get("/api/courses/:courseId/users", async (req, res) =>
    res.json(await enrollDao.findUsersForCourse(req.params.courseId))
  );
}
