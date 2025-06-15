import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

/* ─────────── R E A D ─────────────────── */
export const findAllCourses = () => model.find();

/* ─────────── C R E A T E ─────────────── */
export const createCourse = (course) => {
  const doc = { ...course };
  delete doc._id;
  doc._id = doc._id ?? uuidv4();
  return model.create(doc);
};

/* ─────────── U P D A T E / D E L E T E ─ */
export const deleteCourse = (cid)            => model.deleteOne({ _id:cid });
export const updateCourse = (cid,updates)    => model.updateOne({ _id:cid },{ $set:updates });
