var express  = require('express'),
    path     = require('path'),
    handler  = require ('./requestHandler.js'),
    app      = express(),
    cors     = require('cors'),
    passport = require('passport');


app.configure(function() {
  app.use(express.bodyParser());
  app.use(cors());
  app.use(express.static(path.join(__dirname, '../app')));

  // app.use(express.cookieParser());
  // app.use(express.cookieSession({
  //   secret: ''
  // }));

  app.listen(8080);
  console.log('Listening on port 8080');
});

