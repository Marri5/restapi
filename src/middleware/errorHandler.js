const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  logger.error(`Error: ${err.message}`, { 
    error: err,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
  });

  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Validation Error',
        details: messages,
      },
    });
  }

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(404).json({
      success: false,
      error: {
        code: 'NOT_FOUND',
        message: 'Resource not found',
      },
    });
  }

  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'DUPLICATE_ERROR',
        message: 'Duplicate field value entered',
      },
    });
  }

  const statusCode = err.statusCode || 500;
  
  return res.status(statusCode).json({
    success: false,
    error: {
      code: err.code || 'INTERNAL_ERROR',
      message: err.message || 'Server Error',
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    },
  });
};

module.exports = errorHandler; 