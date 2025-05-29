const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }
  } else {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }
};

module.exports = protect;
//  * Middleware to protect routes by verifying JWT tokens.
//  *
//  * This function checks for a Bearer token in the Authorization header of the request.
//  * If a valid token is found, it decodes the token using the JWT secret, retrieves the user
//  * from the database (excluding the password), and attaches the user object to the request.
//  * If the token is missing or invalid, it responds with a 401 Unauthorized error.