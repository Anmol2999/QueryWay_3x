import express from 'express'
import { Create, deletePost, getposts, update } from '../controllers/Blog.js'
import { isAdmin } from '../middleware/isAdmin.js'
import upload from "../middleware/Multer.js";


const BlogsRoutes=express.Router()
BlogsRoutes.post('/create',isAdmin,upload.single('postimage'), (req, res) => {
    console.log(req.file); // This should log the uploaded file
    console.log(req.body); // This should log title and desc
  
    // Now call your Create function with req and res
    Create(req, res)})
BlogsRoutes.delete('/delete/:id',isAdmin ,deletePost)
BlogsRoutes.get('/getposts',getposts)
BlogsRoutes.patch('/update/:id',isAdmin,upload.single('postimage'),update)

export default BlogsRoutes