import db from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export const findAssignmentsForCourse = (cid) => db.assignments.filter(a => a.course === cid);

export const createAssignment = (a) => {
  const assignment = { ...a, _id: uuidv4() };
  db.assignments = [...db.assignments, assignment];
  return assignment;
};

export const updateAssignment = (aid, updates) => {
  const a = db.assignments.find(x => x._id === aid);
  Object.assign(a, updates);
  return 204;
};

export const deleteAssignment = (aid) => {
  db.assignments = db.assignments.filter(a => a._id !== aid);
  return 204;
};