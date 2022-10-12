const { asyncWrap } = require('../utils/error');
const { recruitService } = require('../services');

const getRecruit = asyncWrap(async(req, res) => {
    const {categoryId, tagName, limit, offset} = req.query;

    if (!limit || !offset) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;
        throw error;
    }

    if (!categoryId && !tagName) {
        const recruits = await recruitService.getRecruit(+limit, +offset);
        res.status(200).json({ recruits });
    } else if (!tagName) {
        const recruits = await recruitService.getRecruitByCategory(categoryId, +limit, +offset);
        res.status(200).json({ recruits });
    } else {
        const recruits = await recruitService.getRecruitByTag(categoryId, tagName, +limit, +offset);
        res.status(200).json({ recruits })
    }
})

module.exports = {
    getRecruit
}