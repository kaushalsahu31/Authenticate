
const { HandleRes } = require('../common/helper');
const { decodeToken } = require('../config/jwt');



const authenticate = (req, res, next) => {
  const token = req.header('token');
  if (!token) return HandleRes(res,401,'Authorization token required')
  try {
    const decoded = decodeToken(token)
    req.user = decoded;
    next();
  } catch (error) {
    return HandleRes(res,401,'Invalid token');
}

};

module.exports = { authenticate };