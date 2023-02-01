// external import 
const express = require('express');


// internal import 
const {createProduct, getProduct, getAllProduct, updateProduct, deleteProduct} = require('../controller/product/productController')
const {loginCheck} = require('../middlewares/common/loginCheck')
const {isAdminHandlar} = require('../middlewares/common/isAdmin')


const route = express.Router();

route.post('/', loginCheck, isAdminHandlar, createProduct)
route.get('/:id', loginCheck,  getProduct)
route.get('/', loginCheck,  getAllProduct)
route.put('/:id', loginCheck,  updateProduct)
route.delete('/:id', loginCheck,  deleteProduct)

module.exports = route



