require('dotenv').config()
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/api/v1/users/index')
var sessionRouter = require('./routes/api/v1/sessions/index')
var forecastRouter = require('./routes/api/v1/forecasts/index')
var favoriteRouter = require('./routes/api/v1/favorites/index')

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
app.use('/api/v1/favorites', favoriteRouter);

module.exports = app;
