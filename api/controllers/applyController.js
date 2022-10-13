const {asyncWrap} = require('../utils/error');
const {applyService} = require('../services');

const getApplyment = asyncWrap(async(req, res) => {
    const userId = req.user.id;

    const applyment = await applyService.getApplyment(userId);
    res.status(200).json({ applyment });
})

const addApplyment = asyncWrap(async(req, res) => {
    const userId = req.user.id;
    const {recruitId, careerId, forms} = req.body;

    if (!recruitId) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;
        throw error;
    }

    if (!careerId) {
        await applyService.addApplymentWithoutCareer(userId, recruitId, forms)
        res.status(201).json({ messasge:'Applyment added successfully' });

    } else {
        await applyService.addApplyment(userId, recruitId, careerId, forms);
        res.status(201).json({ messasge:'Applyment added successfully' });
    }
})

const updateApplyment = asyncWrap(async(req, res) => {
    const {applymentId, forms} = req.body;

    if (!applymentId || !forms) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;
        throw error;
    }

    await applyService.updateApplyment(applymentId, forms);
    res.status(204).send();
})

const deleteApplyment = asyncWrap(async(req, res) => {
    const {applymentId} = req.query;
    
    if (!applymentId) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;
        throw error;
    }

    await applyService.deleteApplyment(applymentId);
    res.status(204).send();
})

module.exports = {
    getApplyment,
    addApplyment,
    updateApplyment,
    deleteApplyment
}