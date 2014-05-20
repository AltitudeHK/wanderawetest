'use strict';

var express     = require('express'),
    path        = require('path'),
    app         = express(),
    cors        = require('cors'),
    passport    = require('passport'),
    handler     = require('./requestHandler.js');

// passport.use(new FacebookStrategy({
//     clientID: '1448671645374053',
//     clientSecret: '240d5a532e41edab837fd66a8845ae27',
//     callbackURL: "http://localhost:8080/auth/facebook/callback" 
//   },
//   function(accessToken, refreshToken, profile, done) {
//     db.collection('users').insert({'':''}, function(err, user) {
//       if (err) { return done(err); }
//       done(null, user);
//     });
//   }
// ));

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
  app.get('/auth/facebook', passport.authenticate('facebook'));
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect : '/',
      failureRedirect : '/login'
    })
  );



  app.listen(8080);
  console.log('Listening on port 8080');
});
