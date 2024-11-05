// routes/main.js
const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  const data = { quizName: "Educational Quiz App" };
  res.render('index', data);
});


module.exports = router;
