const { loginRequired } = require('../utils/auth');
const { faqController } = require('../controllers');
const { upload } = require('../utils/upload');
const faqRouter = require('express').Router();

faqRouter.get('', faqController.getFaq);
faqRouter.post(
  '/question',
  loginRequired,
  upload.single('file'),
  faqController.sendQuestion
);

module.exports = faqRouter;
