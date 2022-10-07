const { recruitDao } = require('../models');

const getRecruit = async(limit, offset) => {

    if (limit > 20) {
        const error = new Error('INVALID_REQUEST');
        error.statusCode = 400;
        throw error;
    }

    return await recruitDao.getRecruitList(limit, offset);
}

const getByCategory = async(categoryId, limit, offset) => {
    
    if (limit > 20) {
        const error = new Error('INVALID_REQUEST');
        error.statusCode = 400;
        throw error;
    }

    const check = await recruitDao.checkCategory(categoryId)

    if (check === '0') {
        const error = new Error('INVALID_CATEGORY');
        error.statusCode = 404;
        throw error;
    }

    return await recruitDao.getByCategoryId(categoryId, limit, offset);
}

const getCoseguRecruit = async(limit, offset) => {
    
    if (limit > 20) {
        const error = new Error('INVALID_REQUEST');
        error.statusCode = 400;
        throw error;
    }

    return await recruitDao.getCoseguList(limit, offset);
}

const getCoseguByCategory = async(categoryId, limit, offset) => {
    
    if (limit > 20) {
        const error = new Error('INVALID_REQUEST');
        error.statusCode = 400;
        throw error;
    }
    
    const check = await recruitDao.checkCategory(categoryId)

    if (check === '0') {
        const error = new Error('INVALID_CATEGORY');
        error.statusCode = 404;
        throw error;
    }

    return await recruitDao.getCoseguById(categoryId, limit, offset);
}

module.exports = {
    getRecruit,
    getByCategory,
    getCoseguRecruit,
    getCoseguByCategory
}   