// external import 
const slugify = require('slugify')
const createError = require('http-errors');


// internal import 
const Product = require('../../model/Product')


const createProduct = async(req, res) => {
    try{
        if(req.body?.title) {
            req.body.slug = slugify(req.body.title)
        }
        const newProduct =  Product(req.body)
        const result = await newProduct.save();


    res.status(200).json({
        message : "Product crate sucessfully",
        Product : result
    })

    }catch(err) {
        console.log(err.message)
        res.status(500).json({
            message : "Product not crate  sucessfully!!"
        })
    }

}

const getProduct = async (req, res) => {
    const {id} = req.params;
    try{
        const findProduct = await Product.findById({_id : id})
        res.status(200).json({
            message : "Product find sucessfully",
            Product : findProduct

        })
    }catch(err) {
        console.log(err.message)
        res.status(500).json({
            message : "Product not find sucessfully"
        })


    }
}

const getAllProduct = async (req, res) => {
    try{
        // filtering 
        const queryObj = {...req.query}
        const excludeFields = ["page", "sort", "limit", "fields"];
        excludeFields.forEach((el) => delete queryObj[el])
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace( /\b(gte|gt|lte|lt)\b/ig, match => `$${match}`);

        let query =  Product.find(JSON.parse(queryStr))
       
       

        // sorting 
        if(req.query.sort) { 
            const querySort = req.query.sort.split(",").join(" ")       
            query = query.sort(querySort);  
        }else{
            query = query.sort("-createdAt");  

        }

        // limiting the filed
        if(req.query.fields) {
            const fields = req.query.fields.split(",").join(" ");
            query = query.select(fields);
        }else {
            query = query.select("-__v")
        }

        // pagination
        const page = req.query.page;
        const limit = req.query.limit;
        const skip = (page - 1) * limit;
        console.log(page, limit, skip)
        query = query.skip(skip).limit(limit)
        if(req.query.page) {
            const productCount = await Product.countDocuments()
            if(skip >= productCount) {
               throw createError("This page does not exist")
            }
        }

        const product = await query;

        res.status(200).json({
            message : "Find  Product Sucessfully!!",
            Products : product
        })

    }catch(err) {
        console.log(err.message)
        res.status(500).json({
            message : err.message
        })


    }
}

const updateProduct = async (req, res) => {
    const {id} = req.params
    try{
        const Productupdate = await Product.findByIdAndUpdate({ _id : id }, req.body, {
            new : true
        })
        console.log(Productupdate)
        res.status(200).json({
            message : "Product Update Sucessfully",
            Product : Productupdate
        })

    }catch(err) {
        console.log(err.message)
        res.status(500).json({
            message : "Product Not Update Sucessfully",
            error : err.message
        })

    }
}

const deleteProduct = async (req, res) => {
    const {id} = req.params
    try {
        const deleteProduct = await Product.findByIdAndDelete({_id : id});
        if(deleteProduct !== null) {
            res.status(200).json({
                message : "Product Deleted Sucessfully!!",
                deleteProduct : deleteProduct
            })
        }else{
            res.status(500).json({
                message : "User  not find sucessfully!!",
            })
        }

    }catch(err){
        console.log(err.message)
        res.status(500).json({
            message : "Product Not Deleted Sucessfully!!",
        })
    }
}
module.exports = {
    createProduct,
    getProduct,
    getAllProduct,
    updateProduct,
    deleteProduct
}