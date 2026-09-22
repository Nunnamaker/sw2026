const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const config = require('../config/config');

function register({ username, password, name }) {
  if (!username || !password || !name) {
    const error = new Error('username, password and name are required');
    error.status = 400;
    throw error;
  }

  if (userModel.findByUsername(username)) {
    const error = new Error('username already exists');
    error.status = 409;
    throw error;
  }

  const user = userModel.create({ username, password, name });
  return { id: user.id, username: user.username, name: user.name };
}

function login({ username, password }) {
  const user = userModel.findByUsername(username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    const error = new Error('invalid credentials');
    error.status = 401;
    throw error;
  }

  const token = jwt.sign({ sub: user.id, username: user.username }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });

  return { token };
}

module.exports = { register, login };
