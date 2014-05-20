'use strict';

var express  = require('express'),
    path     = require('path'),
    handler  = require ('./requestHandler.js'),
    cors     = require('cors'),
    passport = require('passport'),
    app      = express();

require('./passport')(passport);

app.configure(function() {
  app.use(express.bodyParser({ uploadDir: '../app/photos' }));
  app.use(cors());
  app.use(express.static(path.join(__dirname, '../app')));

  // app.use(express.cookieParser());
  // app.use(express.cookieSession({
  //   secret: ''
  // }));
  app.post('/login', handler.login);
  app.post('/signup', handler.signup);
  app.post('/upload', handler.upload);
  app.post('/getPhotos', handler.getPhotos);
  app.post('/getOnePhoto', handler.getOnePhoto);
  app.listen(8080);
  console.log('Listening on port 8080');
});
