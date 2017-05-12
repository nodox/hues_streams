var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VideoSchema = new Schema({
	sourceName: String,
	mediaSrc: String,
	s3_url: String,
	tags: [String],
});

module.exports = mongoose.model('Video', VideoSchema);