// -----------------------------------------------------------------
//  config.js
//
//  Copyright 2014. Colin Milhench. All rights reserved.
//
//  Colin Milhench <colin@infectiousgrin.com>
//

'use strict';

// -----------------------------------------------------------------
//  Exports

exports = module.exports = {

  secure: function (env) {
    env = env || process.env.NODE_ENV || 'development';
    switch (env) {
      case 'production':
        return {
          'secret': '1eb5106536c0e309f720cd996baba0e776abc553',
          'users': {
            'user': 'Pa$$w0rd'
          }
        };
      case 'test':
      case 'dev':
      case 'development':
        return {
          'secret': '1eb5106536c0e309f720cd996baba0e776abc553',
          'users': {
            'user': 'Pa$$w0rd',
            'admin': 'Pa$$w0rd',
            'milhench@hotmail.com': 'password;1'
          }
        };
      default:
        throw new Error('Unknown configuration environment');
    }
  }

};
