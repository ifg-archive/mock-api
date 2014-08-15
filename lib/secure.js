// -----------------------------------------------------------------
//  secure.js
//
//  Copyright 2014. Colin Milhench. All rights reserved.
//
//  Colin Milhench <colin@infectiousgrin.com>
//

'use strict';

// -----------------------------------------------------------------
// Dependencies

var config  = require('./config').secure()
  , jwt     = require('jsonwebtoken')
  , auth    = require('basic-auth-connect');

// -----------------------------------------------------------------
//  Configuration

var expires = config.expires || (60 * 20); //(secs) i.e. 20 minutes.

// -----------------------------------------------------------------
//  Private methods

var basic = auth(function (username, password, callback) {
  if (config.users[username] && password === config.users[username]) {
    var user = { username: username.toLowerCase() };
    callback(null, user);
  } else {
    callback(null, false);
  }
});

var verifyToken = function (req, res, next) {
  var token = (req.query||{}).access_token || (req.headers||{})['x-access-token'];
  if (!token && (req.headers||{}).authorization) {
    var match = req.headers.authorization.match(/^Bearer (.*)$/i);
    if (match) {
      token = match[1];
    }
  }
  if (!token) {
    return res.send(403, 'Token missing');
  }
  jwt.verify(token, config.secret, function (err, decoded) {
    if (err) return res.send(403, err.message.replace('jwt', 'Token'));
    req.user = { username: decoded.usr };
    next();
  });
};

function authorise(type) {
  switch (type) {
  case 'basic':
    return basic;
  case 'token':
    return verifyToken;
  }
}

var issueToken = function (req) {
  var issued = (+new Date() / 1000) >> 0;
  var payload = {
    usr: req.user.username,
    exp: (issued + expires)
  };
  return jwt.sign(payload, config.secret);
};

// -----------------------------------------------------------------
//  Exports

module.exports.auth = authorise;
module.exports.token = issueToken;
