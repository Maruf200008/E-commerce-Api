// external import 
const express = require('express');

// internal import 
const {createCategory, updateCategory, getAllCategory, getCategory, deleteCategory} = require('../controller/Category/categoryControl');
const {loginCheck} = require('../middlewares/common/loginCheck')
const {isAdminHandlar} = require('../middlewares/common/isAdmin')

const route = express.Router();

route.post('/', loginCheck, isAdminHandlar, createCategory);
route.get('/', loginCheck, isAdminHandlar, getAllCategory);
route.put('/:id', loginCheck, isAdminHandlar, updateCategory);
route.get('/:id', loginCheck, isAdminHandlar, getCategory);
route.delete('/:id', loginCheck, isAdminHandlar, deleteCategory);

module.exports = route;
