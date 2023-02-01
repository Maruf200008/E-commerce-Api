// external import 
const createError = require('http-errors');

// internal import 
const User = require('../../model/People');

const isAdminHandlar = async(req, res,next) => {
    const {email} = req.user
    
    try{
        const isAdmin = await User.findOne({email : email})
        if(isAdmin.role !== 'admin') {
            throw createError("You are a not a admin!!")
        }else {
            next();
        }

    }catch(err) {
        console.log(err)
        res.status(500).json({
            error : err.message
        })
    }
}

module.exports = {
    isAdminHandlar
}