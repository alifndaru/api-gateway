require('dotenv').config();

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const users = require('./routes/users');
const courseRouter = require('./routes/courses');
const mediaRouter = require('./routes/media');
const orderRouter = require('./routes/orders');
const paymentRouter = require('./routes/payments');
const refreshTokensRouter = require('./routes/refreshTokens');


const verifyToken = require('./middlewares/verifyToken');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false , limit : '50mb'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/courses', verifyToken, courseRouter);
app.use('/media', mediaRouter);
app.use('/orders', orderRouter);
app.use('/payments', paymentRouter);
app.use('/refresh-tokens', refreshTokensRouter);




module.exports = app;
