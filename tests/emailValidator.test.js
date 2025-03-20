const emailValidator = require('../src/middleware/emailValidator');

jest.mock('../src/config/config', () => ({
  auth: {
    emailPattern: '@afk.no',
  },
}));

jest.mock('../src/utils/logger', () => ({
  debug: jest.fn(),
  warn: jest.fn(),
}));

describe('Email Validator Middleware', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      headers: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it('should reject requests with no email header', () => {
    emailValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: {
        code: 'INVALID_EMAIL',
        message: 'Email header is required',
      },
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should reject requests with invalid email domain', () => {
    req.headers['x-user-email'] = 'user@example.com';

    emailValidator(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: {
        code: 'INVALID_EMAIL',
        message: 'Email must belong to the @afk.no domain',
      },
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should allow requests with valid email domain', () => {
    req.headers['x-user-email'] = 'user@afk.no';

    emailValidator(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.userEmail).toBe('user@afk.no');
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
}); 