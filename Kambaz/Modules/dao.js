import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export const findModulesForCourse = (cid) => model.find({ course: cid });

export const createModule = (m) =>
  model.create({ ...m, _id: uuidv4(), lessons: m.lessons ?? [] });

export const deleteModule = (mid) =>
  model.deleteOne({ _id: mid });

export const updateModule = (mid, u) =>
  model.updateOne({ _id: mid }, { $set: u });

/* NEW → cascade helper: nuke every module that belongs to a course */
export const deleteModulesForCourse = (cid) =>
  model.deleteMany({ course: cid });
