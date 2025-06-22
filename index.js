import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";

// NEW routes
import UserRoutes from "./Kambaz/Users/routes.js";
import CourseRoutes from "./Kambaz/Courses/routes.js";
import ModuleRoutes from "./Kambaz/Modules/routes.js";
import AssignmentRoutes from "./Kambaz/Assignments/routes.js";
import EnrollmentRoutes from "./Kambaz/Enrollments/routes.js";
import QuizRoutes       from "./Kambaz/Quizzes/routes.js";

const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kambaz"
mongoose.connect(CONNECTION_STRING);

const app = express();

/* –– CORS ––––––––––––––––––––––––––––––––––––––––––––––––––––– */
app.use(
  cors({
    credentials: true,
    origin: process.env.NETLIFY_URL || "http://localhost:5173",
  })
);

/* –– Server‑side sessions –––––––––––––––––––––––––––––––––––– */
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kambaz",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}
app.use(session(sessionOptions));

/* –– Body parser AFTER cors/session ––––––––––––––––––––––––––– */
app.use(express.json());

/* –– Routes ––––––––––––––––––––––––––––––––––––––––––––––––––– */
Hello(app);
Lab5(app);
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
EnrollmentRoutes(app);
QuizRoutes(app);

/* –– Start listening –––––––––––––––––––––––––––––––––––––––––– */
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`HTTP server running on *:${PORT}`));