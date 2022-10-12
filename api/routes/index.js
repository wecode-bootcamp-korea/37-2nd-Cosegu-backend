const express = require('express');
const recruitRouter = require('./recruitRouter');
const userRouter = require('./userRouter');
const likesRouter = require('./likesRouter');
const faqRouter = require('./faqRouter');
const careerRouter = require('./careerRouter');

const router = express.Router();

router.use('/recruit', recruitRouter);
router.use('/user', userRouter);
router.use('/likes', likesRouter);
router.use('/faq', faqRouter);
router.use('/career', careerRouter);

module.exports = router;
