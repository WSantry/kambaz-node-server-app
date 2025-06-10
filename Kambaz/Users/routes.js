import * as dao       from "./dao.js";
import * as courseDao from "../Courses/dao.js";
import * as enrollDao from "../Enrollments/dao.js";

export default function UserRoutes(app) {
  /* ── basic CRUD ───────────────────────────── */
  const createUser = (req, res) => res.json(dao.createUser(req.body));
  const findAll    = (_ , res)  => res.json(dao.findAllUsers());
  const findById   = (req, res) => res.json(dao.findUserById(req.params.userId));
  const update     = (req, res) => {
    dao.updateUser(req.params.userId, req.body);
    const currentUser = dao.findUserById(req.params.userId);
    req.session.currentUser = currentUser;
    res.json(currentUser);
  };
  const remove     = (req, res) => res.send(dao.deleteUser(req.params.userId));

  /* ── auth / session ───────────────────────── */
  const signup = (req, res) => {
    if (dao.findUserByUsername(req.body.username)) {
      return res.status(400).json({ message: "Username already taken" });
    }
    const currentUser       = dao.createUser(req.body);
    req.session.currentUser = currentUser;
    res.json(currentUser);
  };

  const signin = (req, res) => {
    const { username, password } = req.body;
    const currentUser = dao.findUserByCredentials(username, password);
    if (!currentUser) {
      return res.status(401).json({ message: "Unable to login. Try again later." });
    }
    req.session.currentUser = currentUser;
    res.json(currentUser);
  };

  const profile = (_req, res) => {
    const currentUser = res.req.session.currentUser;
    if (!currentUser) return res.sendStatus(401);
    res.json(currentUser);
  };

  const signout = (req, res) => { req.session.destroy(); res.sendStatus(200); };

  /* ── courses for user ─────────────────────── */
  const findMyCourses = (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      if (!req.session.currentUser) return res.sendStatus(401);
      userId = req.session.currentUser._id;
    }
    res.json(courseDao.findCoursesForEnrolledUser(userId));
  };

  const createCourse = (req, res) => {
    const currentUser = req.session.currentUser;
    if (!currentUser) return res.sendStatus(401);
    const newCourse = courseDao.createCourse(req.body);
    enrollDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };

  /* ── NEW: enrollments for user ────────────── */
  const findMyEnrollments = (req, res) => {
    let { uid } = req.params;
    if (uid === "current") {
      if (!req.session.currentUser) return res.sendStatus(401);
      uid = req.session.currentUser._id;
    }
    res.json(enrollDao.findEnrollmentsForUser(uid));
  };

  /* ── route mapping ────────────────────────── */
  app.post ("/api/users",                createUser);
  app.get  ("/api/users",                findAll);
  app.get  ("/api/users/:userId",        findById);
  app.put  ("/api/users/:userId",        update);
  app.delete("/api/users/:userId",       remove);

  app.post ("/api/users/signup",         signup);
  app.post ("/api/users/signin",         signin);
  app.post ("/api/users/profile",        profile);
  app.post ("/api/users/signout",        signout);

  app.get  ("/api/users/:userId/courses",            findMyCourses);
  app.post ("/api/users/current/courses",            createCourse);

  /* NEW endpoint */
  app.get  ("/api/users/:uid/enrollments",           findMyEnrollments);
}
