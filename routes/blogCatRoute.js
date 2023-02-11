// external import 
const express = require('express');


// internal import 
const {isAdminHandlar} = require('../middlewares/common/isAdmin');
const {loginCheck} = require('../middlewares/common/loginCheck');
const {createBlogCat, getAllBlogCat, getBlogCat, updateBlogCat, deleteBlogCat} = require('../controller/blogCat/blogCatControl')


const route = express.Router();

route.post('/', loginCheck,  createBlogCat);
route.get('/', loginCheck, isAdminHandlar, getAllBlogCat);
route.get('/:id', loginCheck, isAdminHandlar, getBlogCat);
route.put('/:id', loginCheck, isAdminHandlar, updateBlogCat);
route.delete('/:id', loginCheck, isAdminHandlar, deleteBlogCat);

module.exports = route


