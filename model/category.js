const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
        index : true
    },
}, {
    timestamps : true
}
)
const Category = mongoose.model("Category", categorySchema);
module.exports = Category;