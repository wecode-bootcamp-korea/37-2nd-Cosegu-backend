const express = require('express');
const recruitRouter = require('./recruitRouter');
const userRouter = require('./userRouter');

const router = express.Router();

router.use('/recruit', recruitRouter);
router.use('/user', userRouter);

module.exports = router;