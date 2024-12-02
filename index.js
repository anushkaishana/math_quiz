//index.js
const express = require('express');
const app = express();
const port = 8000;
var mysql = require('mysql');
const session = require('express-session');

const baseURL = "/usr/206";

app.use((req, res, next) => {
  res.locals.baseURL = baseURL;
  next();
});

app.use(
  session({
      secret: 'session_key', 
      resave: false,
      saveUninitialized: true,
  })
);

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

//to handle static files like css
app.use(express.static('public')); 


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


//references
//https://www.npmjs.com/package/express-session
//https://medium.com/@jrudlong/what-are-express-user-sessions-and-how-can-i-utilize-them-with-javascript-for-controlling-routes-6d6feb943b40