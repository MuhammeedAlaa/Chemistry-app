//jshint esversion:6

require('dotenv').config();
const createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerAssist = require('./routes/registerAssist');
var registerStud = require('./routes/registerStud');
var studentProfile = require('./routes/studentProfile');
var login = require('./routes/login');
var logout = require('./routes/logout');
var firstlog = require('./routes/firstlog');
var admin = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/registerassist', registerAssist);
app.use('/registerStud', registerStud);
app.use('/studentProfile', studentProfile);
app.use('/login', login);
app.use('/logout', logout);
app.use('/firstlog', firstlog);
app.use('/admin', admin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;