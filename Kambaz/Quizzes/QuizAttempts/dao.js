import Attempt from "./model.js";
import { v4 as uuidv4 } from "uuid";
export const listForUserQuiz = (uid,qid)=>Attempt.find({ userId:uid, quizId:qid });
export const createAttempt   = (a)=>Attempt.create({ ...a,_id:uuidv4() });
