
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');
  
  // Check if no token
  if (!token) {
    console.log('No authentication token provided');
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  
  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultsecret');
    
    req.user = decoded;
    next();
  } catch (error) {
    console.error('JWT Verification error:', error.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};
