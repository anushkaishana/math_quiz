//index.js
const express = require('express');
const app = express();
const port = 8000;
var mysql = require('mysql');
const session = require('express-session');

//dynamically determining the base path based on the environment
const basePath = process.env.NODE_ENV === 'production' ? '/usr/206' : '';

console.log(`Base path is set to: ${basePath}`);


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
    user: 'quiz_app_user', 
    password: 'localpassword12', 
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