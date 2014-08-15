// -----------------------------------------------------------------
//  account.js
//
//  Copyright 2014. Colin Milhench. All rights reserved.
//
//  Colin Milhench <colin@infectiousgrin.com>
//

'use strict';

// -----------------------------------------------------------------
//  Dependencies

var express = require('express')
  , secure  = require('../secure')
  , app     = express();

// -----------------------------------------------------------------

app.get('/account/token', secure.auth('basic'), function (req, res) {
  res.json({ user: req.user, token: secure.token(req) });
});

// -----------------------------------------------------------------
//  Exports

exports = module.exports = app;
