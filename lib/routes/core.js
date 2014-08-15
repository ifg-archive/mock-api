// -----------------------------------------------------------------
//  core.js
//
//  Copyright 2014. Colin Milhench. All rights reserved.
//
//  Colin Milhench <colin@infectiousgrin.com>
//

'use strict';

// -----------------------------------------------------------------
//  Dependencies

var express = require('express')
  , pkg     = require('../../package')
  , app     = express();

// -----------------------------------------------------------------
// Routes

app.get('/', function (req, res) {
  res.status(200).json({
    name: 'Colin Milhench. Mock API Service',
    copyright: 'Copyright (c) Colin Milhench ' + new Date().getFullYear() + '. All rights reserved.',
    version: 'v' + pkg.version
  });
});

// -----------------------------------------------------------------
//  Exports

exports = module.exports = app;
