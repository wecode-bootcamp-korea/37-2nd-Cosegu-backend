const {careerDao} = require('../models');

const getCareer = async(userId) => {
    return await careerDao.getCareerByUser(userId)
}

const addCareer = async(userId, careers) => {
    return await careerDao.addCareers(userId, careers)
}

const updateCareer = async(userId, contents) => {
    return await careerDao.updateCareer(userId, contents)
}

const deleteCareer = async(careerId) => {
    return await careerDao.deleteCareerById(careerId)
}

module.exports = {
    getCareer,
    addCareer,
    updateCareer,
    deleteCareer
}