// external import 
const bcrypt = require('bcrypt');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');

// internal import 
const User = require('../../model/People')

const logdin = async (req, res, next) => {
    try {
        const user = await User.findOne({
            $or : [{email : req.body.username}, {mobile : req.body.username}, ]
        })
        if(user && user._id) {
            const isvalidPassword =  await bcrypt.compare(req.body.password, user.password);
            if(isvalidPassword) {
                const userObject = {
                    firstname : user.firstname,
                    lastname : user.lastname,
                    mobile : user.mobile,
                    email : user.email
                }
                const token =  jwt.sign(userObject, process.env.JWT_SECRICT, {expiresIn : process.env.JWT_EXPIRE});
                res.cookie(process.env.COOKIE_NAME, token, {
                    maxAge : process.env.JWT_EXPIRESE,
                    httpOnly : true,
                    signed : true,
                } )

                const updateUser = await User.findByIdAndUpdate({_id : user._id}, {
                    refreshToken : token
                }, { new : true

                })
        
                res.status(200).json({
                    message : "User Logdin Sucessfully",
                    updateUser
                })

            }else {
                throw createError("Password did not match!!")
            }
        }else {
            throw createError("User not found!!")
        }

    }catch(err) {
        console.log(err.message)
        res.status(500).json({
            error : err.message
        })
    }



}

module.exports = {
    logdin
}