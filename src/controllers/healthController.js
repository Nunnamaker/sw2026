function healthcheck(req, res) {
  res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
}

module.exports = { healthcheck };
