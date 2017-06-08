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
    tags: ['inspirational', 'motivational'],
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
    tags: ['nba'],
    videos: []
  }, 
  'ted-talks': {
    id: 'ted-talks',
    name: 'Ted Talks',
    description: 'Watch thought provoking videos on the TED stage.',
    tags: ['ted_talks'],
    videos: []
  },
  'news-for-the-black-millennial': {
    id: 'news-for-the-black-millennial',
    name: 'News for the Black Millennial',
    description: 'Get the latest internet news updates for the Black community.',
    tags: ['black_millenial_news'],
    videos: []
  },
  'far-right-news': {
    id: 'far-right-news',
    name: 'Far-Right News',
    description: 'The latest videos from far-right news outlets.',
    tags: ['far_right_news'],
    videos: []
  },

  'black_womens-fitness': {
    id: 'black_womens-fitness',
    name: 'Black Women Fitness',
    description: 'Watch womens fitness videos from the web.',
    tags: ['black_womens_fitness'],
    videos: []
  },
  'political-satire': {
    id: 'political-satire',
    name: 'Political Satire',
    description: 'Political satire: news in the truest form.',
    tags: ['political_satire'],
    videos: []
  },
  'cute-animals': {
    id: 'cute-animals',
    name: 'Cute animals',
    description: 'Watch the cutest animals on the web!',
    tags: ['cute_animals'],
    videos: []
  },
  'buzzfeed-videos-for-days': {
    id: 'buzzfeed-videos-for-days',
    name: 'Buzzfeed Videos For Days',
    description: 'Trending Buzzfeed videos streaming to your device',
    tags: ['buzzfeed'],
    videos: []
  },  
  'natural-haircare': {
    id: 'natural-haircare',
    name: 'Natural & Curly Haircare',
    description: 'Watch the latest videos on how to care for your natural hair.',
    tags: ['black_natural_hair'],
    videos: []
  },
  'memes': {
    id: 'memes',
    name: 'Memes',
    description: 'The Memes never stop. Watch all the trending memes on the internet.',
    tags: ['meme', 'funny'],
    videos: []
  },
  'spoken-word-poetry': {
    id: 'spoken-word-poetry',
    name: 'Spoken Word Poetry',
    description: 'Watch spoken word poetry from around the web.',
    tags: ['spoken_word'],
    videos: []
  },
  'chess': {
    id: 'chess',
    name: 'Chess Videos',
    description: 'Watch chess videos from the web.',
    tags: ['chess'],
    videos: []
  },
  'funny': {
    id: 'funny',
    name: 'Funny',
    description: 'The funniest videos from all over the web.',
    tags: ['funny'],
    videos: []
  },
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
