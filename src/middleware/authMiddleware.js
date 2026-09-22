const jwt = require('jsonwebtoken');
const config = require('../config/config');

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'missing or invalid Authorization header' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, config.jwtSecret);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'invalid or expired token' });
  }
}

module.exports = authenticate;
