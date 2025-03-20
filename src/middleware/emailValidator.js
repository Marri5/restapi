const config = require('../config/config');
const logger = require('../utils/logger');


const emailValidator = (req, res, next) => {
  const email = req.headers['x-user-email'];

  if (!email) {
    logger.warn('Email validation failed: No email provided');
    return res.status(401).json({
      success: false,
      error: {
        code: 'INVALID_EMAIL',
        message: 'Email header is required',
      },
    });
  }

  if (!email.endsWith(config.auth.emailPattern)) {
    logger.warn(`Email validation failed: Invalid email domain - ${email}`);
    return res.status(401).json({
      success: false,
      error: {
        code: 'INVALID_EMAIL',
        message: `Email must belong to the ${config.auth.emailPattern} domain`,
      },
    });
  }

  req.userEmail = email;
  logger.debug(`Email validated successfully: ${email}`);
  
  next();
};

module.exports = emailValidator; 