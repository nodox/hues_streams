var express = require('express');
var router = express.Router();
var Video = require('../models/video');

// FIXME: This will become a database model later on
// FIXME: Sources can be tags as well; whatever works for queries
var streams = {
  'be-inspired-get-motivated': {
    id: 'be-inspired-get-motivated',
    name: 'Be Inspired, Get Motivated',
    description: 'Motivational videos on the internet streaming all day.',
    tags: ['inspirational'],
    videos: []
  },
  '2-min-meals': {
    id: '2-min-meals',
    name: '2-Min Meals',
    description: 'No time to cook? Get the latest internet cooking recipes in quick 2-min videos.',
    tags: ['cooking'],
    videos: []
  },
  'ball-is-life': {
    id: 'ball-is-life',
    name: '#BallisLife',
    description: 'Ball is life? Watch NBA updates all day long with these videos from the web.',
    tags: ['sports'],
    videos: []
  }, 
  'cute-animals': {
    id: 'cute-animals',
    name: 'Cute animals',
    description: 'Watch the cutest animals on the web!',
    tags: ['cute_animals'],
    videos: []
  },
  'the-young-turks': {
    id: 'the-young-turks',
    name: 'The Young Turks',
    description: 'A new form of internet journalism. Watch latest videos by The Young Turks',
    tags: ['tyt'],
    videos: []
  },

  'buzzfeed-videos-for-days': {
    id: 'buzzfeed-videos-for-days',
    name: 'Buzzfeed Videos For Days',
    description: 'Trending Buzzfeed videos streaming to your device',
    tags: ['entertainment'],
    videos: []
  },  


  'news-for-the-black-millennial': {
    id: 'news-for-the-black-millennial',
    name: 'News for the Black Millennial',
    description: 'Get the latest internet news updates for the Black community.',
    tags: ['news'],
    videos: []
  },

  'memes-memes-memes': {
    id: 'memes-memes-memes',
    name: 'Memes Memes Memes',
    description: 'The Memes never stop. Watch all the trending memes on the internet. Facts B.',
    tags: ['meme', 'funny'],
    videos: []
  },
  // 'natural-and-curly-haircare': {
  //   id: 'natural-and-curly-haircare',
  //   name: 'Natural and Curly Haircare',
  //   description: 'The latest videos on the web for dealing with curly hair.',
  //   tags: ['haircare'],
  //   videos: []
  // }, 
  // 'health-and-fitness-gurus': {
  //   id: 'health-and-fitness-gurus',
  //   name: 'Health and Fitness Gurus',
  //   description: 'Learn from the best on how to get lean by working out.',
  //   tags: ['workout'],
  //   videos: []
  // },
};


router.get('/', function(req, res, next) {
  res.status(200).send(streams);
});

router.get('/:id', function(req, res, next) {

  const stream = streams[req.params.id];
  var videos = [];
  var cursor = Video.find({ tags: { $in: stream['tags'] } }).cursor();
  cursor.on('data', (doc) => {
    stream.videos.push(doc);
  });

  cursor.on('close', (doc) => { 
    res.status(200).send(streams[req.params.id]);
  });

  cursor.on('error', (err) => {
    res.status(400).send('Sorry there is an error: ', err);
  })

});

module.exports = router;
