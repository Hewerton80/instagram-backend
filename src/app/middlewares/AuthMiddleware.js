const User = require("../models/User")

module.exports = (req,res,next)=>{
    const id = req.headers.id
    const name = req.headers.name
    console.log(id,name)
    if(!id){
        return res.status(401).json({msg:"usuário não autenticado"})
    }
    req.userId = id
    req.userName = name
    return next()
}