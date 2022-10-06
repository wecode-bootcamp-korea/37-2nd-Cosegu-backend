const userRouter = require('express').Router();
const { userController } = require('../controllers');

userRouter.get('/signin', userController.signIn);

module.exports = userRouter;
