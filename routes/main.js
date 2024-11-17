// routes/main.js
const express = require('express');
const router = express.Router();
const questions = require('../data/questions');


const data = { quizName: "Educational Quiz App" };

router.get('/', (req, res) => {
  res.render('index', data);
});

router.get('/quiz-list', (req, res) => {
  res.render('quiz_list'); 
});

router.get('/quiz', (req, res) => {
  
  const quizId = req.query.quizId; 
    const quizNameMap = {
        1: "Addition",
        2: "Subtraction",
        3: "Multiplication",
        4: "Division",
    };
    const quizName = quizNameMap[quizId]

  //querying databse to fetch questions
  const query = "SELECT * FROM questions WHERE quiz_id = ?";
  
  db.query(query,[quizId], (err, data) => {
    if (err) {
      console.error("Database fetch error:", err);
      res.status(500).send("Unable to load quiz questions.");
    } else {
      const questions = data.map((row) => ({
        //displaying the question
        question: row.question, 
        //parsing options stored as json in the database
        options: JSON.parse(row.options), 
      }));
      res.render('quiz', { quizName, questions,  quizId});
    }
  });
});

router.post('/quiz/submit', (req, res) => {
  //answers by the user
  const userAnswers = req.body.answers;
  const quizId = req.body.quizId;       
  //initializing the score counter
  let score = 0;

  //querying databse to fetch appropriate answers
  const sql = "SELECT id, answer FROM questions WHERE quiz_id = ?";
  db.query(sql, [quizId], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      res.status(500).send("Error calculating score.");
      return;
  }

  const totalQuestions = results.length;

    //comparing user answers to correct answers
      results.forEach((question, index) => {
          if (parseInt(userAnswers[index]) === question.answer) {
              score++;
          }
      });

      res.render('score', { score, total: totalQuestions });
  });
});

router.get('/register', (req, res) => {
  res.render('register', { shopName: "Educational Quiz App" });
});


router.post('/registered', (req, res) => {
  const { first, last, email } = req.body;
  res.send(`Hello ${first} ${last}, you are now registered! Confirmation sent to ${email}.`);
});

module.exports = router;
