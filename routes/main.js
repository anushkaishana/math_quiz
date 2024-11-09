// routes/main.js
const express = require('express');
const router = express.Router();
const questions = require('../data/questions');


const data = { quizName: "Educational Quiz App" };

router.get('/', (req, res) => {
  res.render('index', data);
});

router.get('/quiz', (req, res) => {
  res.render('quiz', { quizName: "Educational Quiz App", questions });
});

router.get('/register', (req, res) => {
  res.render('register', { shopName: "Educational Quiz App" });
});


router.post('/registered', (req, res) => {
  const { first, last, email } = req.body;
  res.send(`Hello ${first} ${last}, you are now registered! Confirmation sent to ${email}.`);
});

module.exports = router;
