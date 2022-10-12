const express = require('express');
const {loginRequired} = require('../utils/auth');
const {careerController} = require('../controllers');

const careerRouter = express.Router();

careerRouter.get('', loginRequired, careerController.getCareer);
careerRouter.post('', loginRequired, careerController.addCareer);
careerRouter.patch('', loginRequired, careerController.updateCareer);
careerRouter.delete('', loginRequired, careerController.deleteCareer);

module.exports = careerRouter;