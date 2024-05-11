const jwt = require('jsonwebtoken');
const key = process.env.JWTtoken || "test"

module.exports.generateToken = (userId) => {
  return jwt.sign({ userId }, key, { expiresIn: '2h' });
};

module.exports.decodeToken = (token) => {
    return jwt.verify(token, key)
  };
