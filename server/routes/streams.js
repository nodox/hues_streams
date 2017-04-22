var express = require('express');
var router = express.Router();


const streams = [
	// {
	// 	name: 'TYT',
	// 	videos: []
	// },
	{
		name: 'Cooking',
		videos: [
			'https://www.facebook.com/buzzfeedtasty/videos/1909250202660953/',
			'https://www.facebook.com/buzzfeedtasty/videos/1909246735994633/',
			'https://www.facebook.com/buzzfeedtasty/videos/1909245015994805/',
			'https://www.facebook.com/buzzfeedtasty/videos/1908192902766683/',
			'https://www.facebook.com/buzzfeedtasty/videos/1908357172750256/'

		]
	},
	{
		name: '#BallIsLife',
		videos: [
			'https://www.facebook.com/nba/videos/10155091692968463/',
			'https://www.facebook.com/nba/videos/10155091689243463/',
			'https://www.facebook.com/nba/videos/10155089990788463/',
			'https://www.facebook.com/nba/videos/10155091685978463/',
			'https://www.facebook.com/nba/videos/10155091681753463/'
		]
	},
	// {
	// 	name: 'You lift Bro?'
	// 	videos: [
	// 		''
	// 	]
	// },
	// {
	// 	name: 'Real Madrid',
	// 	videos: [
	// 		''
	// 	]
	// }
]

router.get('/', function(req, res, next) {
  res.status(200).send(streams);
});

router.get('/:id', function(req, res, next) {

  res.status(200).send(req.params.id);
});

module.exports = router;
