//index.js
const express = require('express');
const app = express();
const port = 8000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


const mainRoutes = require('./routes/main');
app.use('/', mainRoutes);

app.listen(port, () => console.log(`App listening on port ${port}!`));
