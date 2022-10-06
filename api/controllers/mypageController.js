const { mypageService } = require('../services');
const { asyncWrap } = require('../utils/error');

const getMyPage = asyncWrap(async (req, res) => {
  const { id } = req.user;

  const result = await mypageService.getMyPageById(id);
  res.status(200).send({ result });
});

module.exports = {
  getMyPage,
};
