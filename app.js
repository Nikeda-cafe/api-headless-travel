require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// views router
var indexRouter = require('./routes/views/index');
var usersRouter = require('./routes/views/users');
var informationViewsRouter = require('./routes/views/information/index');

// api router
var samplesApiRouter = require('./routes/api/samples');  
var informationApiRouter = require('./routes/api/information'); 
var sendmailApiRouter = require('./routes/api/sendmail');  
var authApiRouter = require('./routes/api/auth');  

var app = express();

// プロキシ設定のsession有効
app.set("trust proxy", 1);

// cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// session
const session = require('express-session');

var sessionOptions = {
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 60*60*1000}
}
app.use(session(sessionOptions));

// session保持チェック middleware
app.use(function(req, res, next){
    if(req.session.login !== undefined){
        req.isLogin = true;
    }else{
        req,isLogin = false
    }
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// views route
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/information', informationViewsRouter);

// api route
app.use('/api/v1/samples', samplesApiRouter);
app.use('/api/v1/information', informationApiRouter);
app.use('/api/v1/sendmail', sendmailApiRouter);
app.use('/api/v1/auth', authApiRouter);

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
