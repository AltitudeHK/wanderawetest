var mongoose = require('mongoose');

var schema =  new mongoose.Schema(
  {
    author : String,
    title  : String,
    country : String,
    month : String,
    year : String,
    description : String,
    people : Boolean,
    nature : Boolean,
    culture : Boolean,
    likes : Number,
    likedUser : Array,
    fileType : String
  }
);
      
module.exports = mongoose.model('Photo', schema);
