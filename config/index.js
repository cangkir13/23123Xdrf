const userRoutes = require('./routes/userRoutes');
const KlinkRoute = require('./routes/KlinkRoute');
require('dotenv').config()
const config = {
  migrate: process.env.MIGRATE,
  userRoutes,
  KlinkRoute,
  port: process.env.PORT || '3030',
};

module.exports = config;
