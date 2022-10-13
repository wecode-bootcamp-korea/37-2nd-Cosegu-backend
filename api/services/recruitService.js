const { recruitDao } = require('../models');

const getCount = async() => {
    return await recruitDao.countCategory();
}

const getRecruit = async(limit, offset) => {
    
    if (limit > 20) {
        const error = new Error('INVALID_REQUEST');
        error.statusCode = 400;
        throw error;
    }

    return await recruitDao.getRecruit(limit, offset);
}

const getRecruitByCategory = async(categoryId, limit, offset) => {

    if (limit > 20) {
        const error = new Error('INVALID_REQUEST');
        error.statusCode = 400;
        throw error;
    }

    return await recruitDao.getRecruitsByCategoryId(categoryId, limit, offset);
}

const getRecruitByTag = async(categoryId, tagName, limit, offset) => {

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

    return await recruitDao.getRecruitsByTagId(categoryId, tagName, limit, offset);
}

const searchRecruit = async(input, limit, offset) => {

    if (limit > 20) {
        const error = new Error('INVALID_REQUEST');
        error.statusCode = 400;
        throw error;
    }

    return await recruitDao.searchRecruitList(input, limit, offset)
}

module.exports = {
    getCount,
    getRecruit,
    getRecruitByCategory,
    getRecruitByTag,
    searchRecruit
}