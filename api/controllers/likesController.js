const {asyncWrap} = require('../utils/error');
const {likesService} = require('../services');

const getLikes = asyncWrap(async (req, res) => {
    const userId = req.user.id;

    const likeList = await likesService.getLikes(userId);
    res.status(200).json({ likeList })
})

const addLikes = asyncWrap(async (req, res) => {
    const userId = req.user.id;
    const {recruitId} = req.body;

    if (!recruitId) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;
        throw error;
    }

    await likesService.addLikes(+userId, +recruitId);
    res.status(201).json({ mesaage:'Likes added successfully' });
})

const deleteLikes = asyncWrap(async (req, res) => {
    const userId = req.user.id;
    const {recruitId} = req.query;
    
    if (!recruitId) {
        await likesService.deleteAll(+userId);
        res.status(204).send();
    }

    await likesService.deleteLikes(+userId, +recruitId);
    res.status(204).send();
})

module.exports = {
    getLikes,
    addLikes,
    deleteLikes
}