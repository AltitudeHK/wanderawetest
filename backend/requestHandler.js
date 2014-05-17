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

	var title       = req.body.title,
		author      = req.body.author,
		country    	= req.body.country,
		time       	= req.body.time,
		year        = req.body.year,
		description = req.body.description,
		people 		= req.body.people,
		nature 		= req.body.nature,
		culture 	= req.body.culture

	var photoInfo = {
		author         : author,
		title          : title,
		country	       : country,
		time           : time,
		description    : description,
		people		   : people,
		nature         : nature,
		culture        : culture,
		likes          : 0,
		likedUser      : []
	}

	
	console.log(req.body)

	db.collection('photo').insert(photoInfo, function(err, insertedPhotoInfo){
		if(err) throw err;
		var photoId = insertedPhotoInfo[0]._id;

		res.send(200, photoId)
	})
		// save the file into '__dir/public/photos/' + photoId

}

exports.getPhotos = function(req, res){
	console.log('finding by', req.body)

	var category = req.body.category;

	db.collection('photo').find(category).toArray(function(err, foundPhotos){
		if(err) throw err;
		console.log('found!', foundPhotos)
	})

	res.send(200);

}

exports.getOnePhoto = function(req, res){
	var photoId = req.body.photoId

	// db.collection('photos').findOne({_id: photoID}, function(err, photoFound){
	// 	//retrieve the actual photo from __dir/public.phots
	// }

}

mongoclient.open(function (error, mongoclient) {
    if (error) throw error;
});
