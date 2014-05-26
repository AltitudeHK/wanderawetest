var mongoose = require('mongoose');

var schema =  new mongoose.Schema(
  {
    userName: String,
    password: String,
    email   : String,
    first_name: String,
    last_name: String,
    token: String,
    facebook: {
      id: String,
      token: String,
      name: String,
      email: String
    },
    twitter: {
      id: String,
      token: String,
      name: String,
      email: String
    },
  }
);

module.exports = mongoose.model('User', schema);
