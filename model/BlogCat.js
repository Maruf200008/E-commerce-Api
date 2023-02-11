const mongoose = require('mongoose');

const blogCatSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
        index : true
    }
}, {
    timestamps : true
}
)

const BlogCat = mongoose.model("BlogCat", blogCatSchema);
module.exports = BlogCat;