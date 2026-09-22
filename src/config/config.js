module.exports = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'sw2026-dev-secret-change-me',
  jwtExpiresIn: '1h',
};
