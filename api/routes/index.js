const express = require('express');
const recruitRouter = require('./recruitRouter');

const router = express.Router();

router.use('/recruit', recruitRouter);

module.exports = router;
