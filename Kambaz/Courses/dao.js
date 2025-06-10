import db from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

/* ---------- READ ---------------------------------------- */
export const findAllCourses             = ()      => db.courses;

export const findCoursesForEnrolledUser = (uid) =>
  db.courses.filter(c =>
    db.enrollments.some(e => e.user === uid && e.course === c._id)
  );

/* ---------- CREATE -------------------------------------- */
export const createCourse = (course) => {
  const c = { ...course, _id: uuidv4() };
  db.courses = [...db.courses, c];
  return c;
};

/* ---------- DELETE -------------------------------------- */
export const deleteCourse = (cid) => {
  db.courses      = db.courses.filter(c => c._id !== cid);
  db.enrollments  = db.enrollments.filter(e => e.course !== cid);
  return 204;
};

/* ---------- UPDATE (fixed) ------------------------------- */
export const updateCourse = (cid, updates) => {
  // search the live array (no destructuring snapshot)
  const course = db.courses.find(c => c._id === cid);
  if (!course) return 404;         // id not found → graceful 404
  Object.assign(course, updates);  // mutate in place
  return 204;
};
