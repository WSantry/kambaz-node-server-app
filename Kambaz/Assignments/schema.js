import mongoose from "mongoose";

/* Shape of an assignment document */
const schema = new mongoose.Schema(
  {
    _id:             String,
    title:           String,
    course:          { type:String, ref:"CourseModel" },
    description:     String,
    points:          Number,
    assignmentGroup: String,
    submissionType:  String,           // "online" | "onpaper"
    onlineEntryOption: String,         // csv list
    assignTo:        String,
    availableDate:   String,
    untilDate:       String,
    dueDate:         String
  },
  { collection: "assignments", versionKey: false }
);

export default schema;
