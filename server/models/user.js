var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var validator = require('validator');


const toLower = (str) => {
  return str.toLowerCase();
}

var User = new Schema({
  email: {
    type: 'string',
    set: toLower,
    required: true,
    index: { unique: true},
    validate: function(val) {
      return validator.isEmail(val)
    },
    message: 'invalid email',
    default: null,
  },
});

User.plugin(passportLocalMongoose);  // Note: username/password field created by plugin
User.plugin(uniqueValidator);

module.exports = mongoose.model('User', User);