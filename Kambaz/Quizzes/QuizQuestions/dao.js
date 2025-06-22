import QQ from "./model.js";
import Quiz from "../model.js";
import { v4 as uuidv4 } from "uuid";

export const listForQuiz   = (qid)=> QQ.find({ quizId:qid });
export const createQ       = async(q)=>{
  const doc = await QQ.create({ ...q,_id:uuidv4() });
  await Quiz.updateOne({ _id:q.quizId },{ $inc:{ questionsCount:1, points:q.points }});
  return doc;
};
export const updateQ       = (id,u)=> QQ.updateOne({ _id:id },{ $set:u });
export const deleteQ       = async(id)=>{
  const q = await QQ.findById(id);
  await QQ.deleteOne({ _id:id });
  await Quiz.updateOne({ _id:q.quizId },{ $inc:{ questionsCount:-1, points:-q.points }});
};
