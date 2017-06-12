var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var router = express.Router();


router.post('/register', function(req, res) {

  if (req.body.password !== req.body.passwordConfirmation) {
    return res.status(400).send('Passwords do not match');
  }

  User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
    if (err) {
      return res.status(400).send(err);
    }

    passport.authenticate('local')(req, res, function () {
      return res.status(200).send(req.user.username);
    });
  });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  return res.status(200).send({
      success: true,
      user: req.user.username,
    });
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;