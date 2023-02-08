const mongoose = require('mongoose');

const peoleSchema = mongoose.Schema({
    firstname : {
        type : String,
        required : true,
        index : true,
        trime : true

    },
    lastname : {
        type : String,
        required : true,
        index : true,
        trime : true

    },
    mobile : {
        type : String,
        required : true,
        trime : true,
    },
    email : {
        type : String,
        required : true,
        lowercase : true, 
        trime : true
    },
    role : {
        type : String,
        enum : ["admin", "user"],
        default : "user"
    },
    isBlocked : {
        type : Boolean,
        default : false
    },
    password : {
        type : String,
        required : true,
    },
    cart : {
        type : Array,
        default : []
    },
    address : [{
        type : mongoose.Types.ObjectId,
        ref : "Address"
    }],
    wishlist : [{
        type : mongoose.Types.ObjectId,
        ref : "Product"
    }],
    refreshToken : {
        type : String
    },
    passwordChangeAt: Date,
    passwordResetToken : String,
    passwordResetExpires : Date
}, 
{
    timestamps : true
}
);

const People = mongoose.model('People', peoleSchema)
module.exports = People;
