const jwt = require('jsonwebtoken');

// Middleware to check user role
const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    // Check if the user is authenticated and has the correct role
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied. You do not have permission.' });
    }
    next();
  };
};

module.exports = { checkRole };