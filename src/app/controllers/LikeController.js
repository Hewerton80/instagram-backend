const Post = require("../models/Post")
class LikeController{
    async store(req,res){
        const {id} = req.params
        try{
            let post = await Post.findById(id)
            
            post.likes += 1
            await post.save()
            post = JSON.parse(JSON.stringify(post))
            post.author = {
                _id:req.userId,
                name:req.userName
            }
            req.io.emit('like',post)
            return res.status(200).json(post)            
        }
        catch(err){
            console.log(err)
            return res.status(500).json(err)
        }
    }
    
}
module.exports = new LikeController()