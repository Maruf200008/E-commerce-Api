// external import 
const slugify = require('slugify')


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
        const findProduct = await Product.find()
        res.status(200).json({
            message : "Find All Product Sucessfully!!",
            Products : findProduct
        })

    }catch(err) {
        console.log(err.message)
        res.status(500).json({
            message : "Faild!! Find All Product Sucessfully!!"
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