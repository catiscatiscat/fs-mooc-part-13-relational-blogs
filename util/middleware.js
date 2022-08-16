const errorHandler = (error, request, response, next) => {
  if (
    error.name === 'SequelizeDatabaseError' ||
    error.name === 'SequelizeValidationError'
  ) {
    const message = error.message.replace(new RegExp('"', 'g'), "'");
    return response.status(400).json({ error: message });
  }
  return next(error);
};

module.exports = { errorHandler };
