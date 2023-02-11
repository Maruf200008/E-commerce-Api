// external import 
const express = require('express');
const route = express.Router()


// internal import 
const {addUser, getAllUser, getUser, deleteUser, updateUserHandlar, blockUserHandlar, unBlockUserHandlar, logout, updatePassword, forgetPasswordToken, resetPassword} = require('../controller/user/userController')
const {userValidator, userValidatorHandlar} = require('../middlewares/user/userValidator')
const {logdin} = require('../controller/user/logdinController')
const {loginCheck} = require('../middlewares/common/loginCheck')
const {isAdminHandlar} = require('../middlewares/common/isAdmin')






route.post('/register', userValidator, userValidatorHandlar, addUser)
route.post('/forget-password-token', loginCheck, forgetPasswordToken)
route.put('/reset-password/:token', loginCheck, resetPassword)
route.get('/logdin', logdin)
route.get('/alluser', loginCheck, getAllUser)
route.get('/logout/:id', loginCheck, logout)
route.get('/:id', loginCheck, getUser)
route.put('/block-user/:id', loginCheck, isAdminHandlar, blockUserHandlar)
route.put('/password/:id', loginCheck, updatePassword)
route.put('/unblock-user/:id', loginCheck, isAdminHandlar, unBlockUserHandlar)
route.put('/edit-user/:id', loginCheck, isAdminHandlar, updateUserHandlar)
route.delete('/:id', loginCheck, isAdminHandlar, deleteUser)



module.exports = route