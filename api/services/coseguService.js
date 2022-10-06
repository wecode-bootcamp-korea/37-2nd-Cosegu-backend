const { coseguDao } = require('../models');

const getRecruit = async (limit, offset) => {
    
    if (limit > 20) {
        const error = new Error('INVALID_REQUEST');
        error.statusCode = 400;
        throw error;
    }

    return await coseguDao.getRecruitList(limit, offset);
}

const getByCategory = async (categoryId, limit, offset) => {
    const check = await coseguDao.checkCategory(categoryId)

    if (check === '0') {
        const error = new Error('INVALID_CATEGORY');
        error.statusCode = 404;
        throw error;
    }

    return await coseguDao.getByCategoryId(categoryId, limit, offset);
}

module.exports = {
    getRecruit,
    getByCategory
}   