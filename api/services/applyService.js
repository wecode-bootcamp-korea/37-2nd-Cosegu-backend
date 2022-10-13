const {applyDao} = require('../models');

const getApplyment = async(userId) => {
    return await applyDao.getAppplymentByUserId(userId)
}

const addApplymentWithoutCareer = async(userId, recruitId, forms) => {
    const check = await applyDao.checkRecruitById(recruitId);

    if (check === '0') {
        const error = new Error('INVALID_RECRUITS');
        error.statusCode = 404;
        throw error;
    }

    const checkApplymentByUser = await applyDao.checkApplymentByUser(userId, recruitId)

    if (checkApplymentByUser !== '0') {
        const error = new Error('APPLYMENT_OVERLAPED')
        error.statusCode = 400;
        throw error;
    }

    return await applyDao.applyRecruitsWithoutCareer(userId, recruitId, forms);
}

const addApplyment = async(userId, recruitId, careerId, forms) => {
    const check = await applyDao.checkRecruitById(recruitId);

    if (check === '0') {
        const error = new Error('INVALID_RECRUITS');
        error.statusCode = 404;
        throw error;
    }

    const checkApplymentByUser = await applyDao.checkApplymentByUser(userId, recruitId)

    if (checkApplymentByUser !== '0') {
        const error = new Error('APPLYMENT_OVERLAPED')
        error.statusCode = 400;
        throw error;
    }

    return await applyDao.applyRecruits(userId, recruitId, careerId, forms);
}

const updateApplyment = async(applymentId, forms) => {
    const check = await applyDao.checkApplymentById(applymentId);

    if (check === '0') {
        const error = new Error('INVALID_APPLYMENT');
        error.statusCode = 404;
        throw error;
    }

    return await applyDao.updateApplyment(applymentId, forms);
}

const deleteApplyment = async(applymentId) => {
    const check = await applyDao.checkApplymentById(applymentId);

    if (check === '0') {
        const error = new Error('INVALID_APPLYMENT');
        error.statusCode = 404;
        throw error;
    }

    return await applyDao.deleteApplyment(applymentId);
}

module.exports = {
    getApplyment,
    addApplymentWithoutCareer,
    addApplyment,
    updateApplyment,
    deleteApplyment
}