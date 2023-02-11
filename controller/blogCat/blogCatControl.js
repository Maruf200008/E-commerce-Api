// external import 


// internal import 
const BlogCat = require('../../model/BlogCat');


const createBlogCat = async(req, res) => {
    try{
        const createBlogCat = await BlogCat.create(req.body)
        res.status(200).json({
            message : "Sucessfully create Blog Category",
            result : createBlogCat
        })
    }catch(err) {
        console.log(err.message);
        res.status(500).json({
            error : err.message
        })

    }
}

const updateBlogCat = async(req, res) => {
    const {id} = req.params;
    try{
        const updateBlogCat = await BlogCat.findByIdAndUpdate(id, req.body, {new : true})
        res.status(200).json({
            message : "Sucessfully Updated Blog Category",
            result : updateBlogCat
        })

    }catch(err){
        console.log(err.message)
        res.status(500).json({
            error : err.message
        })
        
    }
}

const getBlogCat = async(req, res) => {
    const {id} = req.params;
    try{
        const getBlogCat = await BlogCat.findById(id);
        res.status(200).json({
            message : "Blog Category Find Sucessfully",
            result : getBlogCat
        })
    }catch(err) {
        console.log(err.message)
        res.status(500).json({
            error : err.message
        })
    }
}

const getAllBlogCat = async(req, res) => {
    try{
        const getAllBlogCat = await BlogCat.find();
        res.status(200).json({
            message : "All Blog Category Find Sucessfully",
            result : getAllBlogCat
        })

    }catch(err){
        console.log(err.message)
        res.status(200).json({
            error : err.message
        })
    }
}

const deleteBlogCat = async(req, res) => {
    const {id} = req.params;
    try{
        const deleteBlogCat = await BlogCat.findByIdAndDelete(id);
        res.status(200).json({
            message : "Blog Category Deleted Sucessfully",
            result : deleteBlogCat
        })
        
    }catch(err){
        console.log(err.message)
        res.status(500).json({
            error : err.message
        })

    }
}
module.exports = {
    createBlogCat,
    updateBlogCat,
    getBlogCat,
    getAllBlogCat,
    deleteBlogCat
}