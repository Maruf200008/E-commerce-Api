
// internal import 
const Blog = require('../../model/Blog')


const createBlog = async(req, res) => {
    try{
        const newBlog = Blog(req.body)
        const result = await newBlog.save()
        res.status(200).json({
            message : "Blog create sucessfully",
            result : result
        })
    }catch(err) {
        console.log(err.message)
        res.status(500).json({
            error : err.message
        })

    }
}

const updateBlog = async(req, res) => {
    const {id} = req.params
    try {
        const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {new : true})
        res.status(200).json({
            message : "Blog update sucessfully",
            blog : updateBlog
        })

    }catch(err) {
        console.log(err.message)
        res.status(500).json({
            message : err.message
        })

    }
}

const getBlog = async(req, res) => {
    const {id} = req.params;
    try{
        const getBlog = await Blog.findById(id).populate("likes").populate("dislikes")
        const updateViews = await Blog.findByIdAndUpdate(id, {
            $inc : {numView : 1}
        }, {new : true})
        res.status(200).json({
            message : "Blog find sucefully",
            blog : getBlog
        })
    }catch(err) {
        console.log(err)
        res.status(500).json({
            message : err.message,
        })

    }
}

const getAllBlog = async(req, res) => {
    try{
        const allBlog = await Blog.find()
        res.status(200).json({
            message : "All blogs find sucessfully",
            result : allBlog
        })
    }catch(err) {
        console.log(err.message)
        res.status(500).json({
            error : err.message
        })
    }
}

const deleteBlog = async(req, res) => {
    const {id} = req.params;
    try{
        const deletedBlog = await Blog.findByIdAndDelete(id)
        res.status(200).json({
            message: "Blog deleted sucessfully!!",
            result : deletedBlog
        })
    }catch(err) {
        console.log(err)
        res.status(500).json({
            error : err.message
        })
    }
}

const likeBlog = async(req, res) => {
    const {blogId} = req.body;
    const loginUserId = req?.user?.id
    try{
        const blog = await Blog.findById(blogId);
        const isLiked = blog?.isLiked;
        if(isLiked) {
            const blog = await Blog.findByIdAndUpdate(blogId, {
                $pull : {likes : loginUserId },
                isLiked : false,
            }, {new : true})
            res.json(blog)
        }else {
            const blog = await Blog.findByIdAndUpdate(blogId, {
                $push : {likes : loginUserId},
                isLiked : true
            }, {new : true})
            res.json(blog)
        }

    }catch(err) {
        console.log(err.message)

    }
}

const dislikeBlog = async(req, res) => {
    const {blogId} = req.body;
    const loginUserId = req?.user?.id;
    try{
        const blog = await Blog.findById(blogId);
        const dislike = blog?.isDislike;
        if(dislike) {
            const blog = await Blog.findByIdAndUpdate(blogId, {
                $pull : {dislikes : loginUserId},
                isDislike : false
            }, {new : true})
            res.json(blog)
        }else {
            const blog = await Blog.findByIdAndUpdate(blogId, {
                $push : {dislikes : loginUserId},
                isDislike : true
            }, {new : true})
            console.log("Bangladesh")
            res.json(blog)
        }
    }catch(err) {
        console.log(err.message)
        res.status(500).json({
            error : err.message
        })
    }

}

module.exports = {
    createBlog,
    updateBlog,
    getBlog,
    getAllBlog,
    deleteBlog,
    likeBlog,
    dislikeBlog
}

