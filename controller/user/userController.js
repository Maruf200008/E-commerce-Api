// external import 
const bcrypt = require('bcrypt');
const createError = require('http-errors');
const crypto = require('crypto');

// internal import 
const User = require('../../model/People')
const validateIdHandlar = require('../../utils/validateMongobdId')
const passwordResetToken = require('../../utils/passwordResetToken')
const sendMail = require('../../utils/emailControl')

const addUser = async (req, res, next) => {
    try {
        let newUser;
        const hashPassword =  await bcrypt.hash(req.body.password, 10)
        newUser = User({
            ...req.body,
            password : hashPassword
        })
        const result = await newUser.save();
        res.status(200).json({
            message : "User create sucessfully!!",
            result : result
        })

        
    }catch(err) {
        console.log(err)
        res.status(500).json({
            error : err.message
        })
    }




}

const updatePassword = async (req, res,) => {
    const {id} = req.params;
    const {password} = req.body;
 
    try {
        const user = await User.findById({_id : id});
    if(password){
        const hashPassword =  await bcrypt.hash(req.body.password, 10)
        user.password = hashPassword;
        const updatePassword = await user.save()
        res.status(200).json({
            message : "Password update sucessfully!!",
            password : updatePassword
        })
    }
    }catch(err) {
        console.log(err.message)
        res.status(500).json({
            message : "Password not update",
        
        })

        
    }

}

const getAllUser = async (req, res, next) => {
    try {
        const getUser = await User.find({});
        res.status(200).json({
            message : "Read All users sucessfully!!",
            resulte : getUser
        })
    }catch(err) {
        console.log(err.message)
        res.status(500).json({
            error : "Users  not read sucessfully!"
        })
    }

}

const getUser = async (req, res) => {
    try {
        const {id} = req.params
        validateIdHandlar(id)
        const user = await User.findById({_id : id})
        res.status(200).json({
            message : "User find sucessfully",
            user 
        })
    }catch(err) {
        console.log(err.message)
        res.status(500).json({
            error : "User not find sucessfully!"
        })
    }

}

const deleteUser = async (req, res) => {
    try {
        const {id} = req.params
        validateIdHandlar(id)
        const user = await User.findByIdAndDelete({_id : id})
            res.status(200).json({
                message : "User delete sucessfully",
                user})
            
    }catch(err) {
        res.status(500).json({
            error : err.message
        })
    }
}

const updateUserHandlar = async (req, res) => {
    try {
        const {id} = req.params
        validateIdHandlar(id)
        const updateUser = await User.findByIdAndUpdate({_id : id}, {
            $set : {
                firstname : req.body.firstname,
                lastname : req.body.lastname,
                email : req.body.email
            }
        })

       if(updateUser) {
        res.status(200).json({
            message : "User Update sucessfully",
            user : updateUser
        })
       }else {
        throw createError("User not Find!!")

       }
    }catch(err) {
        res.status(500).json({
            message : err.message
        })
    }
}

const blockUserHandlar = async (req, res) => {
    const {id} = req.params;
    validateIdHandlar(id)
    try {
        const blockUser = await User.findByIdAndUpdate({_id : id}, {
            isBlocked : true
        },
        {
            new : true
        })
        res.status(200).json({
            message : "User Blocked Sucessfully!!",
            user : blockUser
        })

    }catch(err) {
        console.log(err)
        res.status(500).json({
            error : "User not blocked uscessfully!!"
        })

    }
    
}

const unBlockUserHandlar = async (req, res) => {
    const {id} = req.params;
    validateIdHandlar(id)
    try {
        const unBlockUser = await User.findByIdAndUpdate({_id : id}, {
            isBlocked : false
        },
        {
            new : true
        })
        res.status(200).json({
            message : "User UnBlocked Sucessfully!!",
            user : unBlockUser
        })

    }catch(err) {
        console.log(err)
        res.status(500).json({
            error : "User not Unblocked uscessfully!!"
        })

    }
    
}

const logout = async (req, res) => {
    const {id} = req.params
    try {
        const updateUser = await User.findByIdAndUpdate({_id : id}, {
            refreshToken : ""
        })   
            
        res.clearCookie(process.env.COOKIE_NAME);
        res.status(200).json({
            message : "User logdin sucessfully!!",
        })
    }catch(err) {
        res.status(200).json({
            error : err.message
        })
    }


}

const forgetPasswordToken = async(req, res) => {
    const {email} = req.body;
    try{
        const user = await User.findOne({email})
        if(!user) {
            throw createError("User was not found with this email!!")
        }else {
            const token = await passwordResetToken()
            await user.save();
            const resetURL = `Hi, Please follow this link to reset your password. This link is valid till 10 minutes from now. <a href="http://localhost:9000/user/forget-password-token/${token}"> Click Here </a>`
            const data = {
                to : email,
                text :"Hey User",
                subject : "Forget Password Link",
                html : resetURL
            }
            sendMail(data)
            res.json(token)
        }

    }catch(err) {
        console.log(err)

    }


}

const resetPassword = async(req, res) => {
    const {password} = req.body;
    const {token} = req.params;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex")
    try{
        const user = await User.findOne({
            passwordResetToken : hashedToken,
            passwordRestExpries : {$gt: Date.now()}
        })

        console.log(password)
        if(!user) createError("Token Expired, Please try again later")
        user.password = password;
        user.passwordResetToken = undefined;
        user.passwordRestExpries = undefined;
        await user.save();
        res.status(200).json(user)
        

    }catch(err) {
        console.log(err)
        res.status(500).json({
            error : "Somthing is rong!!"
        })

    }
}
module.exports = {
    addUser,
    getAllUser,
    getUser,
    deleteUser,
    updateUserHandlar,
    blockUserHandlar,
    unBlockUserHandlar,
    logout,
    updatePassword,
    forgetPasswordToken,
    resetPassword
}