const express = require('express');
const coseguRouter = require('./coseguRouter');
const userRouter = require('./userRouter');

const router = express.Router();

router.use('/cosegu', coseguRouter);
router.use('/user', userRouter);

module.exports = router;
