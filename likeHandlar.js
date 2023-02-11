const likeHandlar = async(req, res) => {
    const {blogId} = req.body;
try{
    const blog = await Blog.findById(blogId)
    // find the logdin user
    const loginUserId = req?.user?.id
    // find the user like this blog
    const isLike = blog?.isLiked 
    // find the user dislike this blog
    const alreadyDislike = blog?.dislikes?.find((userId) => userId.toString() === loginUserId.toString())
    // unnessasary function   
    if(alreadyDislike) {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull : {dislikes : loginUserId},
            isDislike : false
        }, {new : true})
        res.json(blog)
    }
    if(isLike) {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull : {likes : loginUserId},
            isLiked : false
        }, {new : true})
        res.json(blog)
        console.log("Bangladesh")
    }else{
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $push : {likes : loginUserId},
            isLiked : true    
        }, {new : true})
        res.json(blog)  
    }

}