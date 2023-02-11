// internal import 
const Category = require('../../model/category');


const createCategory = async(req, res) => {
    try{
        const newCategory = await Category.create(req.body);
        res.status(200).json({
            message : "Category created sucessfully", 
            result : newCategory
        })
    }catch(err) {
        console.log(err.message)
        res.status(500).json({
            error : err.message
        })
    }
}

const updateCategory = async(req, res) => {
    const {id} = req.params;
    try{
        const updateCategory = await Category.findByIdAndUpdate(id, req.body, {new : true});
        res.status(200).json({
            message : "Category Update Sucessfully!",
            result : updateCategory
        })

    }catch(err) {
        console.log(err.message)
        res.status(500).json({
            error : err.message
        })
    }
}

const getCategory = async(req, res) => {
    const {id} = req.params
    try{
        const getCategory = await Category.findById(id)
        res.status(200).json({
            message : "Category Find Sucessfully",
            Category : getCategory
        })

    }catch(err) {
        console.log(err.message);
        res.status(500).json({
            error : err.message
        })

    }
}

const getAllCategory = async(req, res) => {
    try{
        const getCategory = await Category.find()
        res.status(200).json({
            message : "All Category Find Sucessfully",
            result : getCategory
        })

    }catch(err) {
        console.log(err.message)
        res.status(500).json({
            error : err.message
        })

    }
}

const deleteCategory = async(req, res) => {
    const {id} = req.params;
    try{
        const deletedCategory = await Category.findByIdAndDelete(id);
        res.status(200).json({
            message : "Category Deleted Sucessfully",
            result : deletedCategory
        })

    }catch(err) {
        console.log(err.message)
        res.status(500).json({
            error : err.message
        })
    }
}


module.exports = {
    createCategory,
    updateCategory,
    getCategory,
    getAllCategory,
    deleteCategory
}