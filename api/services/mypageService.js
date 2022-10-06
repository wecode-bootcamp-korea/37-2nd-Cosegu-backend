const { mypageDao } = require('../models');

const getMyPageById = async (id) => {
  const info = await mypageDao.getInfo(id);
  const question = await mypageDao.getQuestion(id);
  const result = { info: info, question: question };
  return await result;
};

module.exports = { getMyPageById };
