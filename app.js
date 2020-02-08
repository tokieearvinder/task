var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var bodyParser = require('body-parser')


var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login/login');
var home1Router = require('./routes/home1/home1');
var home2Router = require('./routes/home2');


var app = express();


const TWO_HOURS = 1000 * 60 * 60 * 2
const SESS_NAME = 'sid'
const NODE_ENV = 'development'
const SESS_LIFE = TWO_HOURS
const SESS_SECRET = 'keyboard cat'
const IN_PROD = NODE_ENV === 'production'



app.use(session({
  name: SESS_NAME,
  secret: SESS_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: IN_PROD,
    sameSite: false,
    maxAge: SESS_LIFE
  }
}))


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/home1', home1Router);
app.use('/home2', home2Router);


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

module.exports = app;
