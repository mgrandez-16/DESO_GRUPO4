const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');

//inizatiazations
const app = express();
require('../config/database');

//settings
app.set('port', 3000);
app.set('views',path.join(__dirname,'../views'));
app.set('view engine', 'ejs');

//middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));

//global variables

//routes
app.use(require('../routes/users'));

//static files

//server is listenning
app.listen(app.get('port'));






