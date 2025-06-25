/* ─────────────────────────────────────────────────────────────
   DAO for quiz questions  – now adjusts quiz.points on update
────────────────────────────────────────────────────────────── */
import QQ   from "./model.js";
import Quiz from "../model.js";
import { v4 as uuidv4 } from "uuid";

export const listForQuiz = (qid) => QQ.find({ quizId: qid });

export const createQ = async (q) => {
  const doc = await QQ.create({ ...q, _id: uuidv4() });
  await Quiz.updateOne(
    { _id: q.quizId },
    {
      $inc: {
        questionsCount: 1,
        points: q.points,
      },
    }
  );
  return doc;
};

export const updateQ = async (id, update) => {
  /* need to know old points to compute delta */
  const prev = await QQ.findById(id);
  await QQ.updateOne({ _id: id }, { $set: update });

  /* if points changed, adjust quiz */
  if (update.points !== undefined && update.points !== prev.points) {
    const diff = update.points - prev.points;
    await Quiz.updateOne(
      { _id: prev.quizId },
      { $inc: { points: diff } }
    );
  }
};

export const deleteQ = async (id) => {
  const q = await QQ.findById(id);
  await QQ.deleteOne({ _id: id });
  await Quiz.updateOne(
    { _id: q.quizId },
    {
      $inc: {
        questionsCount: -1,
        points: -q.points,
      },
    }
  );
};
