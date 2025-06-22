import mongoose from "mongoose";

const schema = new mongoose.Schema({
  _id:       String,                     // uuid
  quizId:    { type:String, ref:"QuizModel"},
  qType:     { type:String, enum:["MCQ","TF","FIB"], default:"MCQ"},
  title:     String,
  points:    { type:Number, default:1 },
  body:      String,                     // markdown
  // type‑specific payload
  mcqOptions:[{
    _id:String,
    text:String,
    correct:Boolean
  }],
  tfAnswer:  { type:Boolean },
  fibAnswers:[String]                    // accepted answers (case‑insensitive)
},{ collection:"quiz_questions", versionKey:false });

export default schema;
