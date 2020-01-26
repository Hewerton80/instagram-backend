const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mongoose = require("mongoose")
const path = require('path')
const {PORT}= require("./config/env")
const routes = require("./routes")
const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server)

mongoose.connect("mongodb+srv://adao:adao@cluster0-qct1z.mongodb.net/test?retryWrites=true&w=majority",{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
})

//middlewares globais
app.use((req,res,next)=>{
    req.io = io
    return next()
})
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use('/files',express.static(path.resolve(__dirname,'uploads')))

//rotas
app.use(routes)

server.listen(PORT,()=>{
    console.log(`app listen on port ${PORT}`)
})