const express = require('express');
const { recruitController } = require('../controllers');

const recruitRouter = express.Router();

recruitRouter.get('', recruitController.getRecruit);
recruitRouter.get('/:recruitId', recruitController.getRecruitDetail);
recruitRouter.get('/category', recruitController.getCount);
recruitRouter.get('/search', recruitController.searchRecruit);

module.exports = recruitRouter;