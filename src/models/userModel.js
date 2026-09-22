const bcrypt = require('bcryptjs');

// In-memory user store, seeded with 3 users. Password for all seed users is "Password123!"
const passwordHash = bcrypt.hashSync('Password123!', 8);

const users = [
  { id: 1, username: 'jdoe', password: passwordHash, name: 'John Doe' },
  { id: 2, username: 'asmith', password: passwordHash, name: 'Anna Smith' },
  { id: 3, username: 'mjones', password: passwordHash, name: 'Mary Jones' },
];

let nextId = users.length + 1;

function findByUsername(username) {
  return users.find((u) => u.username === username);
}

function findById(id) {
  return users.find((u) => u.id === id);
}

function create({ username, password, name }) {
  const user = {
    id: nextId++,
    username,
    password: bcrypt.hashSync(password, 8),
    name,
  };
  users.push(user);
  return user;
}

module.exports = { users, findByUsername, findById, create };
