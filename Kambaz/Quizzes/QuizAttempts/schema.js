import mongoose from "mongoose";
const schema = new mongoose.Schema({
  _id:       String,                  // uuid
  quizId:    { type:String, ref:"QuizModel" },
  userId:    { type:String, ref:"UserModel" },
  startedAt: { type:Date, default:Date.now },
  finishedAt:{ type:Date },
  score:     Number,
  answers: [{
    questionId:String,
    value:     mongoose.Schema.Types.Mixed   // bool | string | [string]
  }]
},{ collection:"quiz_attempts", versionKey:false });
export default schema;
