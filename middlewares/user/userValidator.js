// external import 
const createError = require('http-errors');

// internal import 
const People = require('../../model/People')

const { check, validationResult } = require('express-validator');
const userValidator = [
    check("firstname")
    .isLength({min: 1})
    .withMessage("Name is required")
    .isAlpha("en-US", {ignore : "-"})
    .withMessage("Name containt only Alphabet")
    .trim(),

    check("lastname")
    .isLength({min: 1})
    .withMessage("Name is required")
    .isAlpha("en-US", {ignore : "-"})
    .withMessage("Name containt only Alphabet")
    .trim(),

    check("mobile")
    .isMobilePhone("bn-BD", {strictMode : true})
    .withMessage("Mobile number must be valid bangladeshi mobile number")
    .custom(async (value) => {
        try {
            const mobile = await People.findOne({mobile : value})
            if(mobile) {
                throw createError("Mobile Number Already Exist!!")
            }
        }catch(err) {
           
            throw createError(err.message)
        }
    }),

    check("email")
    .isEmail()
    .withMessage("Invalid Email")
    .trim()
    .custom(async (value) => {
        try {
            const isEmail = await People.findOne({email : value});
            if(isEmail) {
                throw createError("This Email Already Exist")
            }
        }catch(err) {
            throw createError(err.message)
      }
    }),

    check("password")
    .isStrongPassword()
    .withMessage("Password must be content at least 8 cheracter & 1 lowercase, 1 uppercase or 1 symbole")
]

const userValidatorHandlar = (req, res, next) => {
    const error = validationResult(req)
    const mappedError = error.mapped(error);
    if(Object.keys(mappedError).length === 0) {
        next()
    }else {
        res.status(500).json({
            error : mappedError
        })
    }
}

module.exports = {
    userValidator,
    userValidatorHandlar
}