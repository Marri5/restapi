require('dotenv').config();

const config = {
  server: {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development',
  },
  database: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/data-api',
  },
  auth: {
    emailPattern: process.env.EMAIL_PATTERN || '@afk.no',
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
  },
};

module.exports = config; 