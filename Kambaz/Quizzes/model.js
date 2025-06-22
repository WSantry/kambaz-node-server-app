import mongoose from "mongoose";
import schema from "./schema.js";
export default mongoose.model("QuizModel",           schema);   // adjust path for each model
