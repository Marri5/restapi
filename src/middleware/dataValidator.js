const Joi = require('joi');
const logger = require('../utils/logger');

const createSchema = Joi.object({
  date: Joi.date().iso().required().messages({
    'date.base': 'Date must be a valid date',
    'date.format': 'Date must be in ISO 8601 format',
    'any.required': 'Date is required',
  }),
  data: Joi.object().required().messages({
    'object.base': 'Data must be a valid object',
    'any.required': 'Data is required',
  }),
});

const updateSchema = Joi.object({
  date: Joi.date().iso().messages({
    'date.base': 'Date must be a valid date',
    'date.format': 'Date must be in ISO 8601 format',
  }),
  data: Joi.object().required().messages({
    'object.base': 'Data must be a valid object',
    'any.required': 'Data is required',
  }),
});

const querySchema = Joi.object({
  startDate: Joi.date().iso().messages({
    'date.base': 'Start date must be a valid date',
    'date.format': 'Start date must be in ISO 8601 format',
  }),
  endDate: Joi.date().iso().messages({
    'date.base': 'End date must be a valid date',
    'date.format': 'End date must be in ISO 8601 format',
  }),
  page: Joi.number().integer().min(1).default(1).messages({
    'number.base': 'Page must be a number',
    'number.integer': 'Page must be an integer',
    'number.min': 'Page must be at least 1',
  }),
  limit: Joi.number().integer().min(1).max(100).default(10).messages({
    'number.base': 'Limit must be a number',
    'number.integer': 'Limit must be an integer',
    'number.min': 'Limit must be at least 1',
    'number.max': 'Limit must be at most 100',
  }),
});

/**
 * Middleware factory for validating request data against a schema
 * @param {Object} schema - Joi schema to validate against
 * @param {string} source - Request property to validate ('body', 'query', etc.)
 */
const validate = (schema, source = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[source], { 
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errorMessages = error.details.map(detail => detail.message);
      logger.warn(`Validation error: ${errorMessages.join(', ')}`);
      
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_DATA',
          message: 'Validation failed',
          details: errorMessages,
        },
      });
    }

    req[source] = value;
    next();
  };
};

module.exports = {
  validateCreate: validate(createSchema),
  validateUpdate: validate(updateSchema),
  validateQuery: validate(querySchema, 'query'),
}; 