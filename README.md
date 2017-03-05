# backend

Based on the [boilerplate](https://github.com/babel/example-node-server) for a babel node.js server. Node.js with express and using babel to allow future ES.

## usage

Before running locally two environment variables must be set. Go to the Heroku dashboard settings, and reveal the environment variables. Set these on your local machine.

Run the hot-reloading server in dev:
```
$ npm run start
```

Run the tests:
```
$ npm test
```

Build and mimic running in production:
```
$ npm run serve
```

## docs

It's all generated into the `/docs` directory, and available at: https://smartfoodtracker.github.io/backend/

## overview of repository

`src/`: all the code for the server

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`config/`: constants used based on the Node environment

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`models/`: data models for MongoDB

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`routes/`: handlers for different API endpoints

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`index.js`: main server and database setup

`test/`: unit tests and integration tests

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`integration/`: testing particular endpoints with a mocked MongoDB running locally

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`unit/`: testing for MongDB models ensuring proper validation

`docs/`: documentation generated with [apidoc](http://apidocjs.com/), and available hosted at [https://smartfoodtracker.github.io/backend/](https://smartfoodtracker.github.io/backend/)

`package.json`: declaring the dependencies and dev-dependencies (dev-deps not installed in prod).
