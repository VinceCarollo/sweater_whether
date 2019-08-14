var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/api/v1/users/index.js')
var sessionRouter = require('./routes/api/v1/sessions/index.js')
var forecastRouter = require('./routes/api/v1/forecasts/index.js')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/sessions', sessionRouter);
app.use('/api/v1/forecast', forecastRouter);

module.exports = app;
