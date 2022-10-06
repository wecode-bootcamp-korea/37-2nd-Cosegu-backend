const { faqDao } = require('../models');
const getFaq = (keyword) => {
  return faqDao.getFaq(keyword);
};

const sendQuestion = (fileUrl, title, content, userId) => {
  faqDao.sendQuestion(fileUrl, title, content, userId);
};

module.exports = {
  getFaq,
  sendQuestion,
};
