import db from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export const findAllCourses               = ()       => db.courses;
export const findCoursesForEnrolledUser   = (uid)    => db.courses.filter(c => db.enrollments.some(e => e.user === uid && e.course === c._id));
export const createCourse                 = (course) => { const c={...course,_id:uuidv4()}; db.courses=[...db.courses,c]; return c; };
export const deleteCourse                 = (cid)    => { db.courses = db.courses.filter(c=>c._id!==cid); db.enrollments = db.enrollments.filter(e=>e.course!==cid); return 204; };
export const updateCourse                 = (cid,u)  => { const c=db.courses.find(c=>c._id===cid); Object.assign(c,u); return 204; };