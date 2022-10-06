const {likesDao} = require('../models');

const getLikes = async(userId) => {
    return await likesDao.getLikesList(userId);
}

const addLikes = async (userId, recruitId) => {
    const checkRecruit = await likesDao.checkRecruitById(recruitId);
    const checkLikes = await likesDao.checkLikesById(userId, recruitId);

    if (checkRecruit === '0') {
        const error = new Error('INVALID_RECRUIT');
        error.statusCode = 404;
        throw error;
    }

    if (checkLikes !== '0') {
        const error = new Error('INVALID_LIKES');
        error.statusCode = 400;
        throw error;
    }

    return await likesDao.likeRecruit(userId, recruitId);
}

const deleteLikes = async(userId, recruitId) => {
    const check = await likesDao.checkLikesById(userId, recruitId);

    if (check === '0') {
        const error = new Error('INVALID_LIKES');
        error.statusCode = 404;
        throw error;
    }

    return await likesDao.deleteOneLike(userId, recruitId);
}

const deleteAll = async(userId) => {
    return await likesDao.deleteAllLIkes(userId);
}

module.exports = {
    getLikes,
    addLikes,
    deleteLikes,
    deleteAll
}