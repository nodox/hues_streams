var express = require('express');
var router = express.Router();
var Video = require('../models/video');

// FIXME: This will become a database model later on
// FIXME: Sources can be tags as well; whatever works for queries
var streams = [
	{
		id: 0,
		name: 'Health and Fitness Gurus',
		description: 'Learn from the best on how to get lean by working out.',
		tags: ['workout'],
		videos: []
	},
	{
		id: 1,
		name: '2-Min Meals',
		description: 'No time to cook? Get the latest internet cooking recipes in quick 2-min videos.',
		tags: ['cooking'],
		videos: []
	},
	{
		id: 2,
		name: '#BallisLife',
		description: 'Ball is life? Watch NBA updates all day long with these videos from the web.',
		tags: ['sports'],
		videos: []
	},	
	{
		id: 3,
		name: 'Cute animals',
		description: 'Watch the cutest animals on the web!',
		tags: ['cute_animals'],
		videos: []
	},
	{
		id: 4,
		name: 'The Young Turks',
		description: 'A new form of internet journalism. Watch latest videos by The Young Turks',
		tags: ['tyt'],
		videos: []
	},
	{
		id: 5,
		name: 'Buzzfeed Videos For Days',
		description: 'Trending Buzzfeed videos streaming to your device',
		tags: ['entertainment'],
		videos: []
	},
	{
		id: 6,
		name: 'News for the Black Millennial',
		description: 'Get the latest internet news updates for the Black community.',
		tags: ['news'],
		videos: []
	},
	{
		id: 7,
		name: 'Memes Memes Memes',
		description: 'The Memes never stop. Watch all the trending memes on the internet. Facts B.',
		tags: ['meme', 'funny'],
		videos: []
	},
	{
		id: 8,
		name: 'Be Inspired, Get Motivated',
		description: 'Motivational videos on the internet streaming all day.',
		tags: ['inspirational'],
		videos: []
	},
	// {
	// 	id: 9,
	// 	name: 'Natural and Curly Haircare',
	// 	description: 'The latest videos on the web for dealing with curly hair.',
	// 	tags: ['haircare'],
	// 	videos: []
	// },
];



router.get('/', function(req, res, next) {
  res.status(200).send(streams);
});

router.get('/:id', function(req, res, next) {

	const stream = streams[req.params.id];
	var videos = [];
	var cursor = Video.find({ tags: { $in: stream['tags'] } }).cursor();
	cursor.on('data', (doc) => {
		stream.videos.push(doc.s3_url);
	});

	cursor.on('close', (doc) => {
	  res.status(200).send(streams[req.params.id]);
	});

	cursor.on('error', (err) => {
		res.status(400).send('Sorry there is an error: ', err);
	})

});

module.exports = router;
