var mongoose = require('mongoose');

var schema =  new mongoose.Schema(
  {
    author : String,
    title  : String,
    month : String,
    year : String,
    country : String,
    description : String,
    category: {
        people : Boolean,
        nature : Boolean,
        culture : Boolean
    },
    likes : Number,
    likedUser : Array,
    fileType : String,
    height : String,
    width : String
  }
);
      
module.exports = mongoose.model('Photo', schema);
