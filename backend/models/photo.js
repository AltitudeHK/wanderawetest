var mongoose = require('mongoose');

var schema =  new mongoose.Schema(
  {
    author : String,
    title  : String,
    month : String,
    year : String,
    country : String,
    description : String,
    people : Boolean,
    nature : Boolean,
    culture : Boolean,
    likes : Number,
    likedUser : {
        String: Boolean
    },
    fileType : String,
    height : String,
    width : String,
    vote : {type: Number}
  }
);
      
module.exports = mongoose.model('Photo', schema);
