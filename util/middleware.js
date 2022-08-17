const jwt = require('jsonwebtoken');

const { SECRET } = require('./config');

const errorHandler = (error, request, response, next) => {
  const errors = {
    SequelizeDatabaseError: { title: 'database error', status: 500 },
    SequelizeValidationError: { title: 'validation error', status: 400 },
    JsonWebTokenError: { title: 'authorization error', status: 401 },
  };

  if (error.name) {
    const title = errors[error.name].title || error.name || 'error';
    const status = errors[error.name].status || error.status || 400;
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
