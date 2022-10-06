const { faqService } = require('../services');
const { asyncWrap } = require('../utils/error');

const getFaq = asyncWrap(async (req, res) => {
  let { keyword } = req.query;
  const result = await faqService.getFaq(keyword);
  res.status(200).send(result);
});

const sendQuestion = asyncWrap(async (req, res) => {
  const fileUrl = req.file === undefined ? null : req.file.location;
  const { title, content } = req.body;
  const userId = req.user.id;

  await faqService.sendQuestion(fileUrl, title, content, userId);
  res.status(201).send({ message: 'question created' });
});

module.exports = {
  getFaq,
  sendQuestion,
};
