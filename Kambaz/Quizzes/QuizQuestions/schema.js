/* ─────────────────────────────────────────────────────────────
   Multi-blank Fill-in-the-Blank support
────────────────────────────────────────────────────────────── */
import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    _id:    String,                         // uuid
    quizId: { type: String, ref: "QuizModel" },

    qType:  {
      type:   String,
      enum:   ["MCQ", "TF", "FIB"],
      default:"MCQ",
    },

    title:  String,
    points: { type: Number, default: 1 },
    body:   String,                         // markdown / text

    /* ── type-specific payloads ───────────────────────────── */
    mcqOptions: [
      {
        _id:     String,
        text:    String,
        correct: Boolean,
      },
    ],

    tfAnswer: { type: Boolean },

    /* NEW: multiple blanks, each with its own answers array */
    fibBlanks: [
      {
        _id:     String,        // e.g. "1", "22"…
        answers: [String],      // accepted answers (case-insensitive)
      },
    ],
  },
  { collection: "quiz_questions", versionKey: false }
);

export default schema;
