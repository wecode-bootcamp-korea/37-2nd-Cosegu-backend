const { asyncWrap } = require('../utils/error');
const { coseguService } = require('../services');

const getRecruit = asyncWrap(async (req, res) => {
    const {categoryId, limit, offset} = req.query;

    if (!limit || !offset) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;
        throw error;
    }

    if (!categoryId) {
        const recruits = await coseguService.getRecruit(+limit, +offset);
        res.status(200).json({ recruits });
    }

    const recruits = await coseguService.getByCategory(+categoryId, +limit, +offset);
    res.status(200).json({ recruits });
})

module.exports = {
    getRecruit
}