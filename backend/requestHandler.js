'use strict';

var express       = require('express'),
    fs            = require('fs'),
    http          = require('http'),
    path          = require('path'),
    querystring   = require('querystring'),
    request       = require('request'),
    url           = require('url');

var MongoClient = require('mongodb').MongoClient,
    Server      = require('mongodb').Server,
    ObjectId    = require('mongodb').ObjectID,
    mongoclient = new MongoClient(new Server('localhost', 27017)),
    db          = mongoclient.db('wanderawe');

var headers = {

};


/////////////////////////////////////////////////////////////////////////
//////////////////////////AUTHENTICATION/////////////////////////////////
/////////////////////////////////////////////////////////////////////////
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
/////////////////////////////UPLOAD//////////////////////////////////////
/////////////////////////////////////////////////////////////////////////



exports.upload = function(req, res) {

	var title       = req.body.title,
			author      = req.body.author,
			country    	= req.body.country,
			month       = req.body.month,
			year        = req.body.year,
			description = req.body.description,
			people 			= req.body.people,
			nature 			= req.body.nature,
			culture 		= req.body.culture;

	var photoInfo = {
		author         : author,
		title          : title,
		country	       : country,
		month          : month,
		year		   		 : year,
		description    : description,
		people		     : people,
		nature         : nature,
		culture        : culture,
		likes          : 0,
		likedUser      : []
	};

  db.collection('photo').insert(photoInfo, function(err, insertedPhotoInfo){
    if(err) throw err;
    var photoId = insertedPhotoInfo[0]._id;
    var __directory = path.join(__dirname, '../photos');

    //create directory if it does not exist already
    fs.exists(__directory, function(exists){
      if(!exists){
        fs.mkdir(__directory, function(err, data){
          if(err) throw err;
        });
      }
    })

    //create the file with the unique id created by mongo as its name
   
		// http://www.hacksparrow.com/handle-file-uploads-in-express-node-js.html 
		// get the temporary location of the file
		var tmpPath = req.files.file.path;
		var type = req.files.file.type.slice(6);
		// set where the file should actually exists - in this case it is in the "images" directory
		// var targetPath = './uploads/' + req.files.file.name;
		// move the file from the temporary location to the intended location
    fs.rename(tmpPath, __directory + '/' + photoId + '.' + type, function(err){
      if(err) throw err;
      // var reader = new FileReader();
		  // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
		  fs.unlink(tmpPath, function() {
		    if (err) throw err;
		      res.send('File uploaded to: ' + __directory + '/' + photoId + ' - ' + req.files.file.size + ' bytes');
	    });
    });
  })
};

// 	db.collection('photo').insert(photoInfo, function(err, insertedPhotoInfo){
// 		if(err) throw err;
// 		var photoId = insertedPhotoInfo[0]._id;

// 		fs.writeFile('/public/photos/' + photoId, 'abc', function (err,data) {
// 		  if (err) {
// 		    return console.log('error: ', err);
// 		  }
// 		  console.log(data);
// 		});

// 		res.send(200, photoId)
// 	})
// 		// save the file into '__dir/public/photos/' + photoId
// }

exports.getPhotos = function(req, res){
	console.log('finding by', req.body);

	var category = req.body.category;

	db.collection('photo').find(category).toArray(function(err, foundPhotos){
		if(err) throw err;
		console.log('found!', foundPhotos);
	});

	res.send(200);

};

exports.getOnePhoto = function(req, res){
	var photoId = req.body.photoId;
	// db.collection('photos').findOne({_id: photoID}, function(err, photoFound){
	// 	//retrieve the actual photo from __dir/public.phots
	// }

};

mongoclient.open(function (error, mongoclient) {
	if (error) throw error;
});
