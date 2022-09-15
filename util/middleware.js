const _ = require('lodash');
const jwt = require('jsonwebtoken');

const { SECRET } = require('./config');
const { customErrors } = require('./constants');
const User = require('../models/user');

const errorHandler = (error, request, response, next) => {
  console.log('ERROR:', error);
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

  const customError = _.find(customErrors, err =>
    _.includes(error.message, err.message)
  );

  if (error.name) {
    const title = errorTitles[error.name] || error.name || 'error';
    const status = errorStatus[error.name] || error.status || 400;
    let errorMessage = error.message.replace(new RegExp('"', 'g'), "'");
    if (customError && customError.customMessage)
      errorMessage = customError.customMessage;

    return response.status(status).json({ [title]: errorMessage });
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

const checkAccess = async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id);

  if (user.disabled) {
    return res
      .status(401)
      .json({ error: 'account disabled, please contact admin' });
  }

  next();
};

module.exports = { errorHandler, checkAccess, tokenExtractor };
