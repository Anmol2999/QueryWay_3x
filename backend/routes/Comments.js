import express from 'express'
import { AddComment } from '../controllers/Comment.js'
import { isLogin } from '../middleware/isAdmin.js'
const CommentRoutes=express.Router()


CommentRoutes.post('/addcomment',isLogin,AddComment)

export default CommentRoutes