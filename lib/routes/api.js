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

app.get('/api/remote', secure.auth('token'), function (req, res) {
  var find = function (items, property, value) {
    return items.filter(function (item) { return item.$[property] === value; });
  };
  var xml2js = require('xml2js');
  var parser = new xml2js.Parser();
  parser.on('end', function (result) {
    var items = result.feed.entry.map(function (entry) {
      var item = {
        'actor': {
          'name': entry.author[0].name[0],
          'email': entry.author[0].email[0],
          'thumbnail': entry.author[0].thumbnail[0].$.url
        },
        'verb': 'reposted',
        'object': {
          'href': ((find(entry.link, 'rel', 'alternate')[0] || {}).$ || {}).href || '',
          'title': entry.title[0]._,
          'thumbnail': ((find(entry.link, 'rel', 'featured-image-thumbnail')[0] || {}).$ ||{}).href || '',
          'content': entry.content[0]._.replace(/(<[^>]+?>|\n)/ig, ''),
          'published': entry.published[0],
          'author': {
            'name': entry.author[0].name[0],
            'email': entry.author[0].email[0],
            'thumbnail': entry.author[0].thumbnail[0].$.url
          },
          'context': {
            'name': 'latest Top Posts'
          }
        }
      };
      return item;
    });
    res.status(200).json(items);
  });
  require('request').get('https://www.passle.net/pluginfeed/2cxn', function (err, res, data) {
    parser.parseString(data);
  });
});

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
