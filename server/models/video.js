var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VideoSchema = new Schema({
	sourceName: String,
	mediaSrc: String,
	tags: [String],
});

module.exports = mongoose.model('Video', VideoSchema);