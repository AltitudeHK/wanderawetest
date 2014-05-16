var express       = require('express'),
    fs            = require("fs"),
    http          = require("http"),
    path          = require("path"),
    querystring   = require("querystring"),
    request       = require('request'),
    url           = require("url");

var MongoClient = require('mongodb').MongoClient,
    Server      = require('mongodb').Server,
    ObjectId    = require('mongodb').ObjectID,
    mongoclient = new MongoClient(new Server('localhost', 27017)),
    db          = mongoclient.db('wanderawe');

var headers = {

};

exports.upload = function(req, res){
	var photoId = req.body.photoId,
		author  = req.body.author,
		sdlk

	var photoInfo = {
		photoId        : photoId,
		author         : author,

	}

	db.collection('photo').insert(photoInfo, function(err, insertedPhotoInfo){
		if(err) throw err;
		var photoId = photoInfo._id;

		// save the file into '__dir/public/photos/' + photoId
		res.send(200, photoId)

	})
}

exports.geOtnePhoto = function(req, res){
	var photoId = req.body.photoId

	// db.collection('photos').findOne({_id: photoID}, function(err, photoFound){
	// 	//retrieve the actual photo from __dir/public.phots
	// }

}

mongoclient.open(function (error, mongoclient) {
    if (error) throw error;
});
