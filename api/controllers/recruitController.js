const { asyncWrap } = require('../utils/error');
const { recruitService } = require('../services');

const getCount = asyncWrap(async(req, res) => {
    const count = await recruitService.getCount();
    res.status(200).json({ count })
})

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

const getRecruitDetail = asyncWrap(async(req, res) => {
    const {recruitId} = req.params;

    if (!recruitId) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;
        throw error;
    }

    const recruitDetail = await recruitService.getRecruitDetail(+recruitId);
    res.status(200).json({ recruitDetail })
})

const searchRecruit = asyncWrap(async(req, res) => {
    const {input, limit, offset} = req.query;
    console.log(input)
    if (!input) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;
        throw error;
    }

    const recruitList = await recruitService.searchRecruit(input, +limit, +offset);
    res.status(200).json({ recruitList });
})

module.exports = {
    getCount,
    getRecruit,
    getRecruitDetail,
    searchRecruit
}