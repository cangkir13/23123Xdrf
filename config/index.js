const userRoutes = require('./routes/userRoutes');
const KlinkRoute = require('./routes/KlinkRoute');
const config = {
  migrate: true,
  userRoutes,
  KlinkRoute,
  port: process.env.PORT || '3030',
};

module.exports = config;
