# Mock-API

A Quick Mock API to deliver authenticated JSON using JWT


## Usage

### GET `access token`

    GET /account/token/

Use these routes to get an access token than can be used to access the rest of the API being passed in one of three ways;

* Authorization Header: Using `Authorization: Bearer <token>`
* Custom Header: Using the `x-access-token: <token>` header
* QueryString: Using the `?access_token=<token>` parameter

Example;

    curl localhost:3000/account/token -u user:password

### GET `api data`

    GET /api/<feed>

Example;

    curl localhost:3000/api/<feed>
