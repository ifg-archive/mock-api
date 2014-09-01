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

app.get('/api/GetAuthToken', secure.auth('basic'), function (req, res) {
  res.json({ user: req.user, Content: secure.token(req), Success: true });
});

// -----------------------------------------------------------------
//  Exports

exports = module.exports = app;
