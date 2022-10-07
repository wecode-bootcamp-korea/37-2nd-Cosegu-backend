const { asyncWrap } = require('../utils/error');
const { recruitService } = require('../services');

const getRecruit = asyncWrap(async(req, res) => {
    const {categoryId, limit, offset} = req.query;

    if (!limit || !offset) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;
        throw error;
    }

    if (!categoryId) {
        const recruits = await recruitService.getRecruit(+limit, +offset);
        res.status(200).json({ recruits });
    }

    const recruits = await recruitService.getByCategory(+categoryId, +limit, +offset);
    res.status(200).json({ recruits })
})

const getCoseguRecruit = asyncWrap(async(req, res) => {
    const {categoryId, limit, offset} = req.query;

    if (!limit || !offset) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;
        throw error;
    }

    if (!categoryId) {
        const recruits = await recruitService.getCoseguRecruit(+limit, +offset);
        res.status(200).json({ recruits });
    }

    const recruits = await recruitService.getCoseguByCategory(+categoryId, +limit, +offset);
    res.status(200).json({ recruits });
})

module.exports = {
    getRecruit,
    getCoseguRecruit
}