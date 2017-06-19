var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var router = express.Router();

let SECRET = process.env.JWT_SECRET_KEY;

router.post('/register', function(req, res) {

  if (req.body.password !== req.body.passwordConfirmation) {
    return res.status(400).send('Passwords do not match');
  }

  User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
    if (err) {
      return res.status(400).send(err);
    }

    passport.authenticate('local', {session: false})(req, res, function () {
      return res.status(200).send(req.user.username);
    });
  });
});

router.post('/login', passport.authenticate('local', {session: false}), function(req, res) {
  // console.log(req.user);

  var tokenData = jwt.sign({ 
    sub: req.user._id,
  }, SECRET, {
    expiresIn: '1h',
    algorithm: 'HS256',
  });

  

  return res.status(200).send({
    success: true,
    token: tokenData
  });
});

// FIXME: Should remove access token from list of issued tokens
// router.get('/logout', function(req, res) {
//   req.logout();
//   console.log(req.user);
//   res.status(200).send({ success: true });
// });


module.exports = router;