'use strict';

var express       = require('express'),
    fs            = require('fs'),
    http          = require('http'),
    path          = require('path'),
    querystring   = require('querystring'),
    request       = require('request'),
    url           = require('url'),
    __directory 	= path.join(__dirname, '../app/photos');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/wanderful');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {
  console.log('yay')
});

var headers = {

};

exports.authFacebookCallback = function(req, res, next, passport) {
  passport.authenticate('facebook', function (err, user) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/'); }
    req.login(user, function (err) {
      if (err) { return next(err); }
      return res.redirect('/#/dash/loading');
    });
  })(req, res, next);
};

/////////////////////////////////////////////////////////////////////////
//////////////////////////AUTHENTICATION/////////////////////////////////
/////////////////////////////////////////////////////////////////////////

var User = require('./models/user')

////////////////////////////// local ////////////////////////////////////

exports.signup = function(req, res) {
  var userInfo  = req.body,
      isNew     = false;
  db.collection('users').findOne({email: userInfo.email}, function(error, userByEmail){
    if (error) throw error;

    if (userByEmail === null) { // there is no existing user with the email
      isNew = true;
    }
  
    if (isNew) {
      var user = {
        email   : req.body.email,
        password: req.body.password,
        // role    : routingConfig.userRoles.user
      };

      db.collection('users').insert(user, function(error, savedUser) {
        var userInfo = savedUser[0];

        res.cookie('currentUser', JSON.stringify({
          username: userInfo.username,
          role: userInfo.role
        }));
        res.send(200, savedUser);
        currentUserName = savedUser.username;
      });
    } else {
      res.send(200, false);
    }
  });
};

exports.login = function(req, res){
    var userInfo = req.body;
    var isValid = false;

    db.collection('users').findOne({username: userInfo.username}, function(error, found){

      if(found === null){
        res.send(200, false);
      }else if(found.password === userInfo.password){ //FIX LATER need to hash
        res.cookie('currentUser', JSON.stringify({
          username: found.username,
          role: found.role
        }));
        currentUserName = found.username;
        res.send(200, found);
      }
    });
};


/////////////////////////////////////////////////////////////////////////
/////////////////////////////Photos//////////////////////////////////////
/////////////////////////////////////////////////////////////////////////

var Photo = require('./models/photo')

exports.upload = function(req, res) {

  var photoInfo = req.body,
      file      = req.files.file,
      fileType  = file.type.slice(6);

  console.log('the files is', req.files)

  //attaching the fileType to photoInfo because fileType is part of req.files, not part of req.body
  photoInfo.fileType = fileType;
  
  var newPhoto = new Photo(photoInfo);

  console.log(newPhoto)

  Photo.create(newPhoto, function(err, insertedPhotoInfo){
    if(err) throw err;

    var photoId = insertedPhotoInfo._id;

    //create directory if it does not exist already
    fs.exists(__directory, function(exists){
      if(!exists){
        fs.mkdir(__directory, function(err, data){
          if(err) throw err;
        });
      }
    });

    //create the file with the unique id created by mongo as its name
    // http://www.hacksparrow.com/handle-file-uploads-in-express-node-js.html 
    // get the temporary location of the file
    var tmpPath = file.path;
    // set where the file should actually exists - in this case it is in the "images" directory
    // var targetPath = './uploads/' + req.files.file.name;
    // move the file from the temporary location to the intended location
    fs.rename(tmpPath, __directory + '/' + photoId + '.' + fileType, function(err){
      if(err) throw err;
      // var reader = new FileReader();
      // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
      fs.unlink(tmpPath, function() {
        if (err) throw err;
        // console.log("fileType", fileType);
        res.send({'photoId': photoId, 'fileType': fileType, 'height': photoInfo.height, 'width' : photoInfo.width });
      });
    });
  });
};


exports.getPhotos = function(req, res){
  console.log(req.body);
  var category = req.body.category;

  Photo.find(category, function(err, foundPhotos){
    if(err) throw err;

    var urls = [];

    for (var i = 0; i < foundPhotos.length; i++) {
      var currentPhoto = foundPhotos[i];
      console.log('currentphoto is ', currentPhoto)
      var photoUrl = currentPhoto._id + '.' + currentPhoto.fileType;
      console.log(photoUrl);
      urls.push(photoUrl);
    }
    console.log('found!', urls);
    res.send(200, urls);
  });
};

exports.getOnePhoto = function(req, res){
  var photoId = req.body.photoId;
  var query = {_id: new Object(photoId)};

  Photo.findOne(query, function(err, photo){
    if(err) throw err;
    var photoUrl = __directory + '/' + photo;
    res.send(200, photo);
  });
  // db.collection('photos').findOne({_id: photoID}, function(err, photoFound){
  //  //retrieve the actual photo from __dir/public.phots
  // }
};

exports.voteUp = function(req, res) {
  var photoId = req.body.photoId;
  var query = {_id: new ObjectId(photoId)};
  var update = {
    $inc: { vote : 1 }
  };

  Photo.update(query, update, function(err, dontcare){
      if(err) throw err;
      console.log('callback after incrementing vote by 1 : ', dontcare);
  });
};

