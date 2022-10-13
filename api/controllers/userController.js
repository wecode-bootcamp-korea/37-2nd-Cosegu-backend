const { userService } = require('../services');
const { asyncWrap } = require('../utils/error');

const signIn = asyncWrap(async (req, res) => {
  const { code } = req.query;
  const result = await userService.signIn(code);
  res.status(200).json({ token: result });
});

module.exports = {
  signIn,
};
