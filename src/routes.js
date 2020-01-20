const routes = require("express").Router()
const PostController = require("../src/app/controllers/PostController")
const LikeController = require("../src/app/controllers/LikeController")
const AuthController = require("./app/controllers/AuthController")
const AuthMiddleware = require("./app/middlewares/AuthMiddleware")
const uploadsConfig = require("./config/upload")
const multer = require("multer")
const upload = multer(uploadsConfig)

routes.post("/auth/login",AuthController.login)
routes.post("/auth/register",AuthController.register)

routes.use("/post",AuthMiddleware)
routes.get("/post/index",PostController.index)
routes.post("/post/store",upload.single('image'),PostController.store)
routes.post("/post/:id/like",LikeController.store)
module.exports = routes