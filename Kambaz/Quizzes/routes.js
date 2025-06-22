import * as quizDao  from "./dao.js";
import * as qDao     from "./QuizQuestions/dao.js";
import * as attDao   from "./QuizAttempts/dao.js";

export default function QuizRoutes(app){

  /* ───── QUIZ LIST / CRUD ───── */
  app.get ("/api/courses/:cid/quizzes",    (req,res)=>
    quizDao.listForCourse(req.params.cid).then(res.json.bind(res))
  );

  app.post("/api/courses/:cid/quizzes",    async(req,res)=>{
    const q = await quizDao.createQuiz({ ...req.body, course:req.params.cid });
    res.json(q);
  });

  app.get ("/api/quizzes/:qid",            (req,res)=>
    quizDao.findById(req.params.qid).then(res.json.bind(res))
  );

  app.put ("/api/quizzes/:qid",            (req,res)=>
    quizDao.updateQuiz(req.params.qid, req.body).then(res.json.bind(res))
  );

  app.delete("/api/quizzes/:qid",          (req,res)=>
    quizDao.deleteQuiz(req.params.qid).then(res.json.bind(res))
  );


  /* ───── QUESTIONS ───── */
  // list & create stay the same:
  app.get ("/api/quizzes/:qid/questions",  (req,res)=>
    qDao.listForQuiz(req.params.qid).then(res.json.bind(res))
  );

  app.post("/api/quizzes/:qid/questions",  (req,res)=>
    qDao.createQ({ ...req.body, quizId:req.params.qid })
        .then(res.json.bind(res))
  );

  // **RE-NESTED** update & delete under the quiz:
  app.put (
    "/api/quizzes/:qid/questions/:questionId",
    (req, res) =>
      qDao
        .updateQ(req.params.questionId, req.body)
        .then(res.json.bind(res))
  );

  app.delete(
    "/api/quizzes/:qid/questions/:questionId",
    (req, res) =>
      qDao
        .deleteQ(req.params.questionId)
        .then(res.json.bind(res))
  );


  /* ───── STUDENT ATTEMPTS ───── */
  app.get ("/api/quizzes/:qid/attempts/current", async(req,res)=>{
    if (!req.session.currentUser) return res.sendStatus(401);
    const list = await attDao.listForUserQuiz(
      req.session.currentUser._id,
      req.params.qid
    );
    res.json(list);
  });

  app.post("/api/quizzes/:qid/attempts", async(req,res)=>{
    if (!req.session.currentUser) return res.sendStatus(401);
    const attempt = await attDao.createAttempt({
      ...req.body,
      quizId: req.params.qid,
      userId: req.session.currentUser._id
    });
    res.json(attempt);
  });
}
