import express from "express";
import cors    from "cors";
import Hello   from "./Hello.js";
import Lab5    from "./Lab5/index.js";

const app = express();

/* ── global middleware ──────────────────────────────── */
app.use(cors());          // allow UI at :5173 to call :4000
app.use(express.json());  // parse JSON in request bodies

/* ── routes ─────────────────────────────────────────── */
Hello(app);               // existing hello routes
Lab5(app);                // ALL lab-5 routes live here

/* ── start server ───────────────────────────────────── */
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`HTTP server on *:${PORT}`));
