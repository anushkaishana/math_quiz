// routes/main.js
const express = require('express');
const router = express.Router();

const data = { quizName: "Educational Quiz App" };

router.get('/', (req, res) => {
  //checking whether user is logged in or not
  const isLoggedIn = req.session.userId ? true : false; 
  res.render('index', { quizName: data.quizName, isLoggedIn });
});


router.get('/about', (req, res) => {
  res.render('about', { quizName: "Educational Quiz App" }); // Pass `quizName` dynamically
});


router.get('/quiz-list', (req, res) => {
  const query = "SELECT level FROM user_progress WHERE user_id = ?";
  db.query(query, [req.session.userId], (err, results) => {
    if (err) {
      console.error("Error fetching quiz progress", err);
      return res.status(500).send("Unable to load quiz progress");
    }

    //default progress level is 1
    const progress = results[0]?.level || 1;

    //saving progress to the session and render the quiz list
    req.session.progress = { level: progress };
    res.render('quiz_list', { progress: req.session.progress });
  });
});

router.get('/quiz', (req, res) => {
  
  const quizId = req.query.quizId; 
    const quizNameMap = {
      1: "Addition",
      2: "Subtraction",
      3: "Multiplication",
      4: "Division",
      5: "Geometry",
      6: "Time",
      7: "Algebra Level 1",
      8: "Algebra Level 2"
    };
    const quizName = quizNameMap[quizId];

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
        //query to get current progress level
        const progressQuery = "SELECT level FROM user_progress WHERE user_id = ?";
        db.query(progressQuery, [req.session.userId], (err, progressResults) => {
          if (err) {
            console.error("Error fetching progress:", err);
            return res.status(500).send("Error updating progress.");
          }
      
          //default set to 1 if no progress is found
          const currentLevel = progressResults[0]?.level || 1;
      
          //progress updated only if it matches/exceeds current level
          if (quizId >= currentLevel) {
            const updateQuery = "UPDATE user_progress SET level = ? WHERE user_id = ?";
            db.query(updateQuery, [quizId + 1, req.session.userId], (err) => {
              if (err) {
                console.error("Error updating progress:", err);
                return res.status(500).send("Error updating progress.");
              }
              //render score after updating progress
              return res.render('score', {
                score,
                total: totalQuestions,
                mainMessage: `🎉 Congratulations, ${req.session.userName}!`,
                subMessage: `You passed the ${req.body.quizName} quiz !`,
                additionalMessage: `You've unlocked the next level!`,
              });
            });
          } else {
            // Render the score page without progress update
            return res.render('score', {
              score,
              total: totalQuestions,
              mainMessage: `🎉 Congratulations, ${req.session.userName}!`,
              subMessage: `You passed the ${req.body.quizName} quiz !!`,
              additionalMessage: ``,
            });
          }
        });
      } else {
        // Render the score page for a failed attempt
        res.render('score', {
          score,
          total: totalQuestions,
          mainMessage: `Oops, bad luck ${req.session.userName}!`,
          subMessage: `You scored ${score}/${totalQuestions}.`,
          additionalMessage: `Try again to unlock the next level!`,
      });
    }
  });
});

router.get('/register', (req, res) => {
  const isLoggedIn = req.session.userId ? true : false;
  res.render('register', { shopName: "Educational Quiz App", isLoggedIn });
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
      
      res.render('registered', { first, last });

      });
    });   
  });
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error("Database query error:", err);
      res.status(500).send("An error occurred.");
      return;
    }

    if (results.length === 0) {
      res.status(401).send("Invalid email or password.");
      return;
    }

    req.session.userId = results[0].id;
    req.session.userName = `${results[0].first_name} ${results[0].last_name}`;
    
    res.render('login', { isLoggedIn: true });
  });
});

//logging out of session
router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      res.status(500).send("Error logging out.");
    } else {
      res.redirect('/login');
    }
  });
});

router.get('/profile', (req, res) => {
    const userQuery = "SELECT first_name, last_name, email FROM users WHERE id = ?";
    const progressQuery = "SELECT level FROM user_progress WHERE user_id = ?";

    db.query(userQuery, [req.session.userId], (err, userResults) => {

      if (userResults.length === 0) {
        //for if user cannot be found
        res.status(404).send("User not found.");
        return;
      }
  
      const user = userResults[0];
  
      //exctracting user data
      db.query(progressQuery, [req.session.userId], (err, progressResults) => {
        const progress = progressResults.length > 0 ? progressResults[0].level : 1;

        //rendering profile page with user and progress info
        res.render('profile', {
        userName: `${user.first_name} ${user.last_name}`,
        level: progress,
        email: user.email,
      });
    });
  });
});

module.exports = router;

//references:
//https://stackoverflow.com/questions/5573256/how-to-end-a-session-in-expressjs: logging out
