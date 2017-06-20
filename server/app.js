require('dotenv').config()


var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var helmet = require('helmet');

var index = require('./routes/index');
var stream = require('./routes/stream');
var auth = require('./routes/auth');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var User = require('./models/user');
var bluebird = require('bluebird');
var mongoose = require('mongoose');




// use helmet npm module

mongoose.Promise = bluebird;
mongoose.connect('mongodb://localhost:27017/hues-stream'); // connect to our database

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(helmet())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(passport.initialize());
// app.use(passport.session());

// passport config
var jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: 'MfOeztReRBp93olho7Yb',
  algorithms: "HS256",
  // issuer: "accounts.examplesoft.com",
  // audience: "yoursite.net",
}
// Check issued JWT token against these parameters

passport.use(new LocalStrategy(User.authenticate()));

passport.use(new JwtStrategy(jwtOptions, (jwt_payload, done) => {

  // check that its not expired
  // check ...

  User.findOne({id: jwt_payload.sub}, function(err, user) {
    if (err) {
        return done(err, false);
    }
    if (user) {
        return done(null, user);
    } else {
        return done(null, false);
        // or you could create a new account
    }
  });
}));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api', auth);
app.use('/api/stream', stream);

// Always return the main index.html, so react-router render the route in the client
app.use('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
