'use strict';

var express  = require('express'),
    path     = require('path'),
    handler  = require ('./requestHandler.js'),
    cors     = require('cors'),
    passport = require('passport'),
    app      = express();

require('./passport')(passport);

app.configure(function() {
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    if ('OPTIONS' == req.method) {
      res.send(200);
    } else {
      next();
    }
  });

  app.use(express.bodyParser({ uploadDir: '../app/photos' }));
  app.use(cors());
  app.use(app.router);
  app.use(passport.initialize());
  // app.use(allowCrossDomain())
  app.use(passport.session());
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


require('./OAuthRoutes')(app, passport);

