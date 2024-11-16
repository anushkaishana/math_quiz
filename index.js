//index.js
const express = require('express');
const app = express();
const port = 8000;
var mysql = require('mysql');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

//databse sql connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'Anushka12#', 
    database: 'quiz_app',
  });
  
  db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database.');
  });
  
  global.db = db;

const mainRoutes = require('./routes/main');
app.use('/', mainRoutes);

app.listen(port, () => console.log(`App listening on port ${port}!`));
