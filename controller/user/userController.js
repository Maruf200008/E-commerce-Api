// external import 
const bcrypt = require('bcrypt');
const createError = require('http-errors');

// internal import 
const User = require('../../model/People')
const validateIdHandlar = require('../../utils/validateMongobdId')

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

module.exports = {
    addUser,
    getAllUser,
    getUser,
    deleteUser,
    updateUserHandlar,
    blockUserHandlar,
    unBlockUserHandlar,
    logout,
}