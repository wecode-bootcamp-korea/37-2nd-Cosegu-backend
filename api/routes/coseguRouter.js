const express = require('express');
const { coseguController } = require('../controllers');

const coseguRouter = express.Router();

coseguRouter.get('', coseguController.getRecruit);

module.exports = coseguRouter;