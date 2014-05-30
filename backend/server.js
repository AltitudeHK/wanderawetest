'use strict';

var express  = require('express'),
    path     = require('path'),
    handler  = require ('./requestHandler.js'),
    cors     = require('cors'),
    passport = require('passport'),
    app      = express();


app.configure(function() {

  app.use(express.static(path.join(__dirname, '../app')));
  app.use(express.cookieParser());
  app.use(express.bodyParser({ uploadDir: '../app/photos' }));
  app.use(cors());
  app.use(express.session({ secret: 'keyboard cat' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);

  // app.use(express.cookieSession({
  //   secret: ''
  // }));
  console.log(process.env.FACEBOOK_KEY);

  app.post('/login', handler.login);
  app.post('/logout', handler.logout);
  app.post('/signup', handler.signup);
  app.post('/upload', handler.isLoggedIn, handler.upload);
  app.post('/getPhotos', handler.getPhotos);
  app.post('/getOnePhoto', handler.getOnePhoto);
  app.post('/vote', handler.isLoggedIn, handler.voteUp);
  
  app.listen(8080);
  console.log('Listening on port 8080');
});


// require('./OAuthRoutes')(app, passport);
require('./facebookPassport')(app, passport);
require('./twitterPassport')(app, passport);
