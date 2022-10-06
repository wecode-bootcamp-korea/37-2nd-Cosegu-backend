const express = require('express');
const recruitRouter = require('./recruitRouter');
const userRouter = require('./userRouter');
const likesRouter = require('./likesRouter');

const router = express.Router();

router.use('/recruit', recruitRouter);
router.use('/user', userRouter);
router.use('/likes', likesRouter);

module.exports = router;