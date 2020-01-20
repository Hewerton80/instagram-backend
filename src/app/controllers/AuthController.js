const User = require("../models/User")
const bcrypt = require("bcryptjs")

class AuthController{
    async register(req,res){
        const {name,password} = req.body
        try {
            if(await User.findOne({name})){
                return res.status(400).json({msg:"Já existe um usuário cadstrado com esse nome/email/número"})
            }
            const user = await User.create({
                name,
                password:await bcrypt.hash(password,6)
            })
            user.password = null
            return res.status(200).json(user)
        } 
        catch (err) {
            console.log(err)
            return res.status(400).json(err)
        }
    }
    async login(req,res){
        const {name,password} = req.body
        const user = await User.findOne({name})
        try{
            if(!user){
                return res.status(400).json({msg:"Nome/email/número de usuário não existe"})
            }
            if(!await bcrypt.compare(password,user.password)){
                return res.status(400).json({msg:"Senha incorreta"})
            }
            user.password = null
            return res.status(200).json(user)
        }
        catch(err){
            console.log(err)
            return res.status(400).json(err)
        }
    }
}
module.exports = new AuthController()