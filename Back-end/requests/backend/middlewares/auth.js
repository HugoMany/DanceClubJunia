const jwt = require('jsonwebtoken');
const config = require('../config/config');

const verifyToken = (req, res, next) => {
  let token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
  if (!token) {
    token = req.cookies.token;
  }
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }
  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to authenticate token' });
    }
    req.userId = decoded.id;
    req.userType = decoded.userType;
    next();
  });
};

const authorize = (roles = []) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }
  return [
    verifyToken,
    (req, res, next) => {
      if (roles.length && !roles.includes(req.userType)) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      next();
    }
  ];
};

module.exports = {
  verifyToken,
  authorize
};
