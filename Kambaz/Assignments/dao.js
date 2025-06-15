import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

/* ────────────── R E A D ────────────── */
export const findAssignmentsForCourse = (cid) =>
  model.find({ course: cid });

/* ───────────── C R E A T E ─────────── */
export const createAssignment = (a) => {
  const doc = { ...a };
  delete doc._id;
  doc._id = uuidv4();
  doc.points = Number(doc.points ?? 0);
  return model.create(doc);
};

/* ───────────── U P D A T E ─────────── */
export const updateAssignment = (aid, updates) =>
  model.updateOne({ _id: aid }, { $set: updates });

/* ───────────── D E L E T E ─────────── */
export const deleteAssignment = (aid) =>
  model.deleteOne({ _id: aid });
