// Centralized error handler, converts thrown errors into JSON responses.
function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'internal server error' });
}

module.exports = errorHandler;
