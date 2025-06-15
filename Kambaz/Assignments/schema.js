import mongoose from "mongoose";

/* Shape of an assignment document */
const schema = new mongoose.Schema(
  {
    _id:             String,
    title:           String,
    description:     String,
    points:          Number,
    assignmentGroup: String,
    submissionType:  String,           // "online" | "onpaper"
    onlineEntryOption: String,         // csv list
    assignTo:        String,
    availableDate:   String,
    untilDate:       String,
    dueDate:         String,
    course:          { type:String, ref:"CourseModel" }
  },
  { collection: "assignments" }
);

export default schema;
