const express = require('express');
const {loginRequired} = require('../utils/auth');
const { likesController } = require('../controllers');

const likesRouter = express.Router();

likesRouter.get('', loginRequired, likesController.getLikes);
likesRouter.post('', loginRequired, likesController.addLikes);
likesRouter.delete('', loginRequired, likesController.deleteLikes);

module.exports = likesRouter;