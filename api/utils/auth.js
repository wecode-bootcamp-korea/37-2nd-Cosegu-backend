const jwt = require('jsonwebtoken');
const { userService } = require('../services');

const loginRequired = async (req, res, next) => {
  let accessToken = req.headers.authorization;

  if (!accessToken) {
    const error = new Error('NEED_ACCESSTOKEN');
    error.statusCode = 401;

    throw error;
  }

  const veryfiedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
  console.log(veryfiedToken);
  const user = await userService.getUserById(veryfiedToken.id);

  if (!user) {
    const error = new Error('INVALID_USER');
    error.statusCode = 400;

    throw error;
  }

  req.user = user;
  console.log(req.user);
  next();
};

module.exports = {
  loginRequired,
};
