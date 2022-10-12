const express = require('express');
const { recruitController } = require('../controllers');

const recruitRouter = express.Router();

recruitRouter.get('', recruitController.getRecruit);

module.exports = recruitRouter;