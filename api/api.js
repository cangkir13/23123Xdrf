/**
 * libraries
 */
const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const http = require('http');
const mapRoutes = require('express-routes-mapper');
const cors = require('cors');
const tokenklink = require('./services/cektoken');
const morgan = require('morgan');

/**
 * use .env for production
 */
require('dotenv').config()

/**
 * server config
 */
const config = require('../config/');
const dbService = require('./services/db.service');

/**
 * Middleware
 */
// const validatePolicy= require('./middleware/validation/validatePolicy');


// environment: development, production
const environment = process.env.NODE_ENV;

/**
 * express application
 */
const app = express();
const server = http.Server(app);

app.use(morgan('dev'));

/**
 * https://www.npmjs.com/package/express-routes-mapper + middleware example
 */
const mappedUserRoutes = mapRoutes(config.userRoutes, 'api/controllers/');
const mappedKlinkRoute = mapRoutes(config.KlinkRoute, 'api/controllers/');//, validatePolicy().requiredHeaders);


/**
 * Database migration
 */
const DB = dbService(environment, config.migrate).start();

// allow cors
app.use(cors());

// protect express 
app.use(helmet({
  dnsPrefetchControl: false,
  frameguard: false,
  ieNoOpen: false,
}));

// parsing body request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.all('/api/*', (req, res, next) => tokenklink(req, res, next));
// url path for each routes
app.use('/api/tracking', mappedUserRoutes);
app.use('/api/tracking', mappedKlinkRoute);

server.listen(config.port, () => {
  if (environment !== 'production' &&
    environment !== 'development' 
  ) {
    console.error(`NODE_ENV is set to ${environment}, but only production and development are valid.`);
    process.exit(1);
  }
  return DB;
});
