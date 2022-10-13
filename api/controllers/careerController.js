const {asyncWrap} = require('../utils/error');
const {careerService} = require('../services');

const getCareer = asyncWrap(async(req, res) => {
    const userId = req.user.id;

    const career = await careerService.getCareer(userId);
    res.status(200).json({ career });
})

const addCareer = asyncWrap(async(req, res) => {
    const userId = req.user.id;
    const {careers} = req.body;
    console.log(careers)
    if (!careers) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;
        throw error;
    }

    await careerService.addCareer(+userId, careers);
    res.status(201).json({ message:'Career added successfully' });
})

const updateCareer = asyncWrap(async(req, res) => {
    const userId = req.user.id;
    const {contents} = req.body;

    if (!contents) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;
        throw error;
    }

    await careerService.updateCareer(+userId, contents);
    res.status(204).send();
})

const deleteCareer = asyncWrap(async(req, res) => {
    const {careerId} = req.query;
    
    await careerService.deleteCareer(+careerId);
    res.status(204).send();
})

module.exports = {
    getCareer,
    addCareer,
    updateCareer,
    deleteCareer
}