const jwt = require('jsonwebtoken');

const { SECRET } = require('./config');

const errorHandler = (error, request, response, next) => {
  const errorTitles = {
    SequelizeDatabaseError: 'database error',
    SequelizeValidationError: 'validation error',
    JsonWebTokenError: 'authorization error',
  };

  const errorStatus = {
    SequelizeDatabaseError: 500,
    SequelizeValidationError: 400,
    JsonWebTokenError: 401,
  };

  if (error.name) {
    const title = errorTitles[error.name] || error.name || 'error';
    const status = errorStatus[error.name] || error.status || 400;
    const message = error.message.replace(new RegExp('"', 'g'), "'");

    return response.status(status).json({ [title]: message });
  }
  return next(error);
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
  } else {
    res.status(401).json({ error: 'token missing' });
  }
  next();
};

module.exports = { errorHandler, tokenExtractor };
