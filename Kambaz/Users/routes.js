import * as dao          from "./dao.js";
import * as courseDao    from "../Courses/dao.js";
import * as enrollDao    from "../Enrollments/dao.js";

export default function UserRoutes(app) {
  /* ────────────────────── helpers ────────────────────── */

  /** Resolve “current” → actual userId (or 401) */
  const resolveUid = (req, res) => {
    let { uid } = req.params;
    if (uid === "current") {
      if (!req.session.currentUser) {
        res.sendStatus(401);
        return null;
      }
      uid = req.session.currentUser._id;
    }
    return uid;
  };

  /* ─────────────────────── CRUD ──────────────────────── */

  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };

  const findAllUsers = async (req, res) => {
    const { role, name } = req.query;

    if (role) {
      const users = await dao.findUsersByRole(role);
      return res.json(users);
    }
    if (name) {
      const users = await dao.findUsersByPartialName(name);
      return res.json(users);
    }
    res.json(await dao.findAllUsers());
  };

  const findUserById = async (req, res) =>
    res.json(await dao.findUserById(req.params.userId));

  const updateUser = async (req, res) => {
    const { userId } = req.params;
    await dao.updateUser(userId, req.body);

    /* keep session in-sync if the logged user updated own profile */
    if (req.session.currentUser && req.session.currentUser._id === userId) {
      req.session.currentUser = { ...req.session.currentUser, ...req.body };
    }
    res.json(req.session.currentUser ?? (await dao.findUserById(userId)));
  };

  const deleteUser = async (req, res) =>
    res.json(await dao.deleteUser(req.params.userId));

  /* ─────────────────── session / auth ────────────────── */

  const signup = async (req, res) => {
    if (await dao.findUserByUsername(req.body.username)) {
      return res.status(400).json({ message: "Username already taken" });
    }
    const currentUser = await dao.createUser(req.body);
    req.session.currentUser = currentUser;
    res.json(currentUser);
  };

  const signin = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    if (!currentUser) {
      return res.status(401).json({ message: "Unable to login. Try again later." });
    }
    req.session.currentUser = currentUser;
    res.json(currentUser);
  };

  const profile = async (req, res) =>
    req.session.currentUser ? res.json(req.session.currentUser) : res.sendStatus(401);

  const signout = (req, res) => { req.session.destroy(); res.sendStatus(200); };

  /* ───────────── courses / enrollments ───────────── */

  /** all courses (or only admin’s) for a user  */
  const findMyCourses = async (req, res) => {
    const uid = resolveUid(req, res);
    if (!uid) return;

    /* admin gets everything */
    const viewer = req.session.currentUser;
    if (viewer && viewer.role === "ADMIN") {
      return res.json(await courseDao.findAllCourses());
    }

    res.json(await courseDao.findCoursesForEnrolledUser(uid));
  };

  /** author (current user) creates a course and auto-enrolls */
  const createCourse = async (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) return res.sendStatus(401);

    const newCourse = await courseDao.createCourse(req.body);
    await enrollDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };

  /** NEW: return users’ single course (used by dashboard after toggle) */
  const findCourseForUser = async (req, res) => {
    const uid = resolveUid(req, res);
    if (!uid) return;

    const { cid } = req.params;
    const courses = await courseDao.findCoursesForEnrolledUser(uid);
    const course  = courses.find(c => c._id === cid);
    course ? res.json(course) : res.sendStatus(404);
  };

  /** NEW: enroll / unenroll current or specific user */
  const enrollUserInCourse = async (req, res) => {
    const uid = resolveUid(req, res);
    if (!uid) return;
    await enrollDao.enrollUserInCourse(uid, req.params.cid);
    res.sendStatus(200);
  };

  const unenrollUserFromCourse = async (req, res) => {
    const uid = resolveUid(req, res);
    if (!uid) return;
    await enrollDao.unenrollUserFromCourse(uid, req.params.cid);
    res.sendStatus(200);
  };

  /** list enrollments (raw) */
  const findMyEnrollments = async (req, res) => {
    const uid = resolveUid(req, res);
    if (!uid) return;
    res.json(await enrollDao.findEnrollmentsForUser(uid));
  };

  /* ──────────────────── routes map ──────────────────── */

  app.post ("/api/users",                     createUser);
  app.get  ("/api/users",                     findAllUsers);
  app.get  ("/api/users/:userId",             findUserById);
  app.put  ("/api/users/:userId",             updateUser);
  app.delete("/api/users/:userId",            deleteUser);

  app.post ("/api/users/signup",              signup);
  app.post ("/api/users/signin",              signin);
  app.post ("/api/users/profile",             profile);
  app.post ("/api/users/signout",             signout);

  app.get  ("/api/users/:uid/courses/:cid",   findCourseForUser);   // ← NEW
  app.get  ("/api/users/:uid/courses",        findMyCourses);
  app.post ("/api/users/current/courses",     createCourse);

  app.post ("/api/users/:uid/courses/:cid",   enrollUserInCourse);  // ← NEW
  app.delete("/api/users/:uid/courses/:cid",  unenrollUserFromCourse);

  app.get  ("/api/users/:uid/enrollments",    findMyEnrollments);
}
