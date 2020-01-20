const Post = require("../models/Post")
const sharp = require("sharp")
const fs = require("fs")
const path = require("path")

class PostController{
    async index(req,res){
        try{
            const posts = await Post.find().sort("-createdAt").populate({
                path:"author",
                select:"name"
            })

            return res.status(200).json(posts)
        }
        catch(err){
            console.log(err)
            return res.status(500).json(err)
        }
    }
    async store(req,res){
        const {description,hashtags,place} = req.body;
        const {filename:image} = req.file;
        try{
            await sharp(req.file.path)
                .resize(500)
                .jpeg({quality:70})
                .toFile(
                    path.resolve(req.file.destination,'resized',image)
                )
            fs.unlinkSync(req.file.path)
            let post = await Post.create({author:req.userId,description,hashtags,place,image})
            post = JSON.parse(JSON.stringify(post))
            post.author = {
                _id:req.userId,
                name:req.userName
            }
            req.io.emit('post',post)
            return res.status(200).json(post)
        }
        catch(err){
            console.log(err)
            return res.status(500).json(err)
        }
    }
}
module.exports = new PostController()