// routes/main.js
const express = require('express');
const router = express.Router();
const questions = require('../data/questions');


const data = { quizName: "Educational Quiz App" };

router.get('/', (req, res) => {
  res.render('index', data);
});

router.get('/quiz-list', (req, res) => {
  if (!req.session.progress) {
      //Default set to level 1
      req.session.progress = { level: 1 }; 
  }

  res.render('quiz_list', { progress: req.session.progress });
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
  const quizId = parseInt(req.body.quizId);       
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

      // Calculate the user's score
      results.forEach((question, index) => {
          if (parseInt(userAnswers[index]) === question.answer) {
              score++;
          }
      });

      const percentage = (score / totalQuestions) * 100;

      //if the user scores 80% or higher then prgoress i supdated and next level can be unlocked
      if (percentage >= 80) {
        if (!req.session.progress) {
            req.session.progress = { level: 1 };
        }
        if (quizId >= req.session.progress.level) {
            //iterate to unlock next level
            req.session.progress.level = quizId + 1; 
        }
      }

      // Render the score page
      res.render('score', { score, total: totalQuestions });
  });
});

router.get('/register', (req, res) => {
  res.render('register', { shopName: "Educational Quiz App" });
});


router.post('/registered', (req, res) => {
  const { first, last, email, password } = req.body;
  
  //checking for duplicate email entries- 1 email 1 account
  const emailQuery = "SELECT * FROM users WHERE email = ?";
  db.query(emailQuery, [email], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send("An error occurred while checking email.");
    }

    //says email already registered if match is identified
    if (result.length > 0) {
      return res.status(400).send("Email is already registered.");
    }
  
  const query = "INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)";
  db.query(query, [first, last, email, password], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      res.status(500).send("An error occurred.");
      return;
    }

    //all users progress with level 1
    const progressQuery = "INSERT INTO user_progress (user_id, level) VALUES (?, ?)";
    db.query(progressQuery, [result.insertId, 1], (err) => {
      if (err) {
        console.error("Progress initialization error:", err);
        res.status(500).send("Error initializing progress.");
        return;
      }  
      
      res.send(`Hello ${first} ${last}, your account has been created!`);

      });
    });   
  });
});

router.get('/login', (req, res) => {
  res.render('login');
});

module.exports = router;