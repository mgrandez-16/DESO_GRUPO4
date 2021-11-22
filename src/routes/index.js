const express = require('express');
const app = express();
const path = require('path');

//settings
app.set('port', 3000);
app.set('views',path.join(__dirname,'../views'));
app.set('view engine', 'ejs');

app.listen(app.get('port'));

//middlewares

//routes
app.get('/',(req, res) => {
    res.render('index');
});