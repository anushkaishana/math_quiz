// routes/main.js
const express = require('express');
const router = express.Router();
const questions = require('../data/questions');


const data = { quizName: "Educational Quiz App" };

router.get('/', (req, res) => {
  res.render('index', data);
});

router.get('/quiz', (req, res) => {
  
  const quizName = "Educational math quiz";

  //querying databse to fetch questions
  const query = "SELECT * FROM questions";
  
  db.query(query, (err, data) => {
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
      res.render('quiz', { quizName, questions });
    }
  });
});

router.post('/quiz/submit', (req, res) => {
  //answers by the user
  const userAnswers = req.body.answers;
  //initializing the score counter
  let score = 0;

  //querying databse to fetch appropriate answers
  const sql = "SELECT id, answer FROM questions";
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error calculating score.");
    } else {
      results.forEach((question, index) => {
        if (parseInt(userAnswers[index]) === question.answer) {
          score++;
        }
      });

      res.render('score', { score, total: results.length });
    }
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
