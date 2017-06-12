var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var User = new Schema({});

User.plugin(passportLocalMongoose);
User.plugin(uniqueValidator);

module.exports = mongoose.model('User', User);