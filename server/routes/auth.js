var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var xss = require('xss');
var router = express.Router();

let SECRET = process.env.JWT_SECRET_KEY;

router.post('/register', function(req, res) {

  // Sanitize user input
  var userName = xss(req.body.username);
  var userEmail = xss(req.body.email);
  var userPassword = xss(req.body.password);
  var userPasswordConfirmation = xss(req.body.passwordConfirmation);

  if (userPassword !== userPasswordConfirmation) {
    return res.status(400).send('Passwords do not match');
  }

  var userOptions = {
    username: userName,
    email: userEmail,
  };

  User.register(new User(userOptions), userPassword, function(err, user) {
    if (err) {
      return res.status(400).send(err);
    }

    var tokenData = jwt.sign({ 
      sub: userName,
    }, SECRET, {
      expiresIn: '1h',
      algorithm: 'HS256',
    });

    return res.status(200).send({
      success: true,
      token: tokenData
    });
  });
});

router.post('/login', passport.authenticate('local', {session: false}), function(req, res) {

  var userName = xss(req.user._id);

  var tokenData = jwt.sign({ 
    sub: userName,
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