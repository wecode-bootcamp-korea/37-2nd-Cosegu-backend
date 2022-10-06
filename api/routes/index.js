const express = require('express');
const coseguRouter = require('./coseguRouter');

const router = express.Router();

router.use('/cosegu', coseguRouter);

module.exports = router;
