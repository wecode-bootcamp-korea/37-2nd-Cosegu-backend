const { loginRequired } = require('../utils/auth');
const { mypageController } = require('../controllers');
const mypageRouter = require('express').Router();

mypageRouter.get('', loginRequired, mypageController.getMyPage);

module.exports = mypageRouter;
