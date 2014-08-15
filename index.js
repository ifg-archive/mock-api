// -----------------------------------------------------------------
//  index.js
//
//  Copyright 2014. Colin Milhench. All rights reserved.
//
//  Colin Milhench <colin@infectiousgrin.com>
//

'use strict';

// -----------------------------------------------------------------
//  Dependencies

var express = require('express')
  , morgan  = require('morgan')
  , app     = express();

// -----------------------------------------------------------------
//  Configuration

app.set('port', process.env.PORT || 3000);
app.use(morgan(process.env.NODE_ENV ? void(0) : 'dev', {
  stream : process.stdout
}));

// -----------------------------------------------------------------
//  Routes

app.use(require('./lib/routes/core'));
app.use(require('./lib/routes/account'));
app.use(require('./lib/routes/api'));

// -----------------------------------------------------------------
//  404 Handling

app.use(function (req, res) {
  res.status(404).json({
    "error": "route_not_found",
    "reason": "missing",
    "statusCode": 404
  });
});

// -----------------------------------------------------------------
//  Server

app.listen(app.get('port'), function () {
  console.log('--server listening [%s]', app.get('port'));
});
