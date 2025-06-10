import db from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export const enrollUserInCourse = (uid, cid) =>
  db.enrollments.push({ _id: uuidv4(), user: uid, course: cid });

export const unenrollUserFromCourse = (uid, cid) => {
  db.enrollments = db.enrollments.filter(e => !(e.user === uid && e.course === cid));
  return 204;
};

export const findEnrollmentsForUser = (uid) =>
  db.enrollments.filter(e => e.user === uid);
