const mongoose = require("mongoose")
const {BASE_URL} = require("../../config/env")
const PostSchema = new mongoose.Schema({
    author:{
        type : mongoose.Schema.Types.ObjectId, ref:'User',
        required:true,
    },
    place:{
        type:String,
    },
    description:{
        type:String,
    },
    hashtags:{
        type:String,
    },
    image:{
        type:String,
        required:true,
    },
    likes:{
        type:Number,
        default:0
    },
},{
    timestamps:true,
    toObject:{ virtuals:true },
    toJSON:{ virtuals:true }
})
PostSchema.virtual('url_img').get(function(){
    return `${BASE_URL}/files/${this.image}`
})
module.exports = mongoose.model("Post",PostSchema)