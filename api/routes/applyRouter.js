const express = require('express');
const {loginRequired} = require('../utils/auth');
const {applyController} = require('../controllers');

const applyRouter = express.Router();

applyRouter.get('', loginRequired, applyController.getApplyment);
applyRouter.post('', loginRequired, applyController.addApplyment);
applyRouter.patch('', loginRequired, applyController.updateApplyment);
applyRouter.delete('', loginRequired, applyController.deleteApplyment);

module.exports = applyRouter;