const createError = require('http-errors');


const notFoundHandlar = (req, res, next) => {
    next(createError(404, "Your requested content was not found 😥😥"));
}

const errorHandlar = (err, req, res, next ) => {
    res.status(err.status).json({
        message : err.message
    })
}

module.exports = {
    notFoundHandlar,
    errorHandlar
}


