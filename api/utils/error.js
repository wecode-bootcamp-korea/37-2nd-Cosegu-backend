const asyncWrap = (controller) => {
    return (req, res, next) => {
        controller(req, res, next).catch(next)
    }
};

const globalErrorHandler = (err, req, res, next) => {
    res.status(err.status || 500).json({message:err.message})
};

module.exports = {
    asyncWrap,
    globalErrorHandler
}