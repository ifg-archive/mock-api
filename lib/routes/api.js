// -----------------------------------------------------------------
//  api.js
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
  , util    = require('util')
  , path    = require('path')
  , fs      = require('fs')
  , app     = express();

// -----------------------------------------------------------------

app.get('/api/*', secure.auth('token'), function (req, res) {
  var name = req.params[0] + '.json';
  var base = path.join(__dirname, '../data/');
  var file = path.join(base, req.user.username || '', name);
  if (!fs.existsSync(file)) {
    file = path.join(base, name);
  }
  if (!fs.existsSync(file)) {
    return res.status(404).json({
      'error': 'route_not_found',
      'reason': 'missing',
      'statusCode': 404
    });
  }
  return res.sendfile(file);
});

// -----------------------------------------------------------------
//  Exports

exports = module.exports = app;
