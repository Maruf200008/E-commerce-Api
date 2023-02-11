// external import 
const express = require('express');

// internal import 
const {createBlog, updateBlog, getBlog, getAllBlog, deleteBlog, likeBlog, dislikeBlog} = require('../controller/blog/blgoController')
const {loginCheck} = require('../middlewares/common/loginCheck')
const {isAdminHandlar} = require('../middlewares/common/isAdmin')

const route = express.Router();

route.post('/', loginCheck, isAdminHandlar, createBlog);
route.put('/like', loginCheck, isAdminHandlar, likeBlog);
route.put('/dislike', loginCheck, isAdminHandlar, dislikeBlog);
route.put('/:id', loginCheck, isAdminHandlar, updateBlog);
route.get('/:id', loginCheck, isAdminHandlar, getBlog);
route.get('/', loginCheck, isAdminHandlar, getAllBlog);
route.delete('/:id', loginCheck, isAdminHandlar, deleteBlog);



module.exports = route