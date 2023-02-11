const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    numView : {
        type : Number,
        default : 0
    },
    isLiked : {
        type : Boolean,
        default : false
    },
    isDislike : {
        type : Boolean,
        default : false
    },
    likes : [{
        type : mongoose.Types.ObjectId,
        ref : "People"
    }],
    dislikes : [{
        type : mongoose.Types.ObjectId,
        ref : "People"
    }],
    image : {
        type : String,
        default : "https://neilpatel.com/wp-content/uploads/2017/08/blog.jpg"
    },
    author : {
        type : String,
        default : 'admin'
    }
}, {
    toJSON : {
        virtuals : true
    },
    toObject : {
        virtuals : true
    },
    timestamps : true
}

)

const Blog = mongoose.model("Blog", blogSchema)
module.exports = Blog

