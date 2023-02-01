const mongoose = require('mongoose');
const createError = require('http-errors');
const validateIdHandlar = (id) => {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if(!isValidId) {
        console.log(isValidId)
         createError("Invalid id")
    }
}

module.exports = validateIdHandlar;