import mongoose from "mongoose";

const schema = new mongoose.Schema({
  _id:             String,                  // uuid
  course:          { type:String, ref:"CourseModel" },
  title:           { type:String, default:"New Quiz" },
  description:     String,
  published:       { type:Boolean, default:false },
  points:          { type:Number,  default:0 },      // autocalc
  quizType:        { type:String,  default:"GRADED" }, // GRADED|PRACTICE|G_SURVEY|U_SURVEY
  assignmentGroup: { type:String,  default:"Quizzes"},
  shuffleAnswers:  { type:Boolean, default:true },
  timeLimit:       { type:Number,  default:20 },     // minutes, 0 = none
  multipleAttempts:{ type:Boolean, default:false },
  maxAttempts:     { type:Number,  default:1 },
  showCorrect:     { type:String,  default:"IMMEDIATE"}, // IMMEDIATE|AFTER_DUE|NEVER
  accessCode:      String,
  oneQPerTime:     { type:Boolean, default:true },
  webcamRequired:  { type:Boolean, default:false },
  lockAfterAnswer: { type:Boolean, default:false },
  dueDate:         String,
  availableDate:   String,
  untilDate:       String,
  questionsCount:  { type:Number,  default:0 },      // denormalised for list
  updatedAt:       { type:Date,    default:Date.now }
},{ collection:"quizzes", versionKey:false });

export default schema;
