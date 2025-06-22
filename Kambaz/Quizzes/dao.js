import Quiz from "./model.js";
import { v4 as uuidv4 } from "uuid";

export const listForCourse = (cid) =>
  Quiz
    .find({ course: cid })
    .sort({ availableDate: 1 });
export const findById      = (id)         => Quiz.findById(id);
export const createQuiz    = (q)          => Quiz.create({ ...q,_id:uuidv4() });
export const updateQuiz    = (id,u)       => Quiz.updateOne({ _id:id },{ $set:u });
export const deleteQuiz    = (id)         => Quiz.deleteOne({ _id:id });
