import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import multer from 'multer';
import dotenv from 'dotenv'

dotenv.config();

import indexRouter from './routes/index.js';
import usersRouter from './routes/user.js';
import dealershipRouter from './routes/dealership.js';
import carsRouter from './routes/cars.js';

var app = express();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const upload = multer();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(upload.any()) // for parsing multipart/form-data

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/dealership', dealershipRouter);
app.use('/cars', carsRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

export default app;
