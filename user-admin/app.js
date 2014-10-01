var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', function(req, res) {
  res.sendfile('./html/auth.html');
});
//app.use('/users', users);

passport.use(
    new GitHubStrategy({
      clientID: 'c772caf95863255a4612',
        clientSecret: '2704d2d47d52da0f2e009530a75caa8289700c2d',
        callbackURL: 'http://104.131.115.221:3000/auth/github/callback'
    }, function (accessToken, refreshToken, profile, done) {
      console.log(profile);
    })
    );

app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/callback',
    passport.authenticate('github', {
      successRedirect: '/success',
      failureRedirect: '/error'}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
module.exports = app;
