const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
        trim : true
    },
    slug : {
        type : String,
        required : true,
        unique : true,
        lowercase : true
    },
    description : {
        type : String,
        required : true,
    },
    price : {
        type : Number,
        required : true,
    },
    category : {
        type : String,
        required : true
    },
    brand : {
        type : String,
        required : true
    },
    quantity : {
        type : Number,
        required : true,
        select : true
    },
    sold : {
        type : Number,
        default : 0,
        select : true
    },
    images : {
        type : Array
    },
    color : {
        type : String,
        required : true
    },
    ratings : [{
        star : Number,
        postedby : {type : mongoose.Types.ObjectId}
    }]
}, {
    timestamps : true
}
)


const Product = mongoose.model("Product", productSchema );
module.exports = Product