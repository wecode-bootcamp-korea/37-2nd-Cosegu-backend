const express = require('express');
const recruitRouter = require('./recruitRouter');
const userRouter = require('./userRouter');
const likesRouter = require('./likesRouter');
const faqRouter = require('./faqRouter');
const careerRouter = require('./careerRouter');
const applyRouter = require('./applyRouter');
const faqRouter = require('./faqRouter');

const router = express.Router();

router.use('/recruit', recruitRouter);
router.use('/user', userRouter);
router.use('/likes', likesRouter);
router.use('/faq', faqRouter);
router.use('/career', careerRouter);
router.use('/apply', applyRouter);
router.use('/mypage', mypageRouter);

module.exports = router;
