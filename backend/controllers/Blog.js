import PostModel from "../models/Blog.js"
import fs from 'fs'
import path from 'path'

const Create=async(req,res)=>{
    try {
        const {title,desc} =req.body;
        const imagePath=req.file.filename
        
        const CreateBlog=new PostModel({
            title,
            desc,
            image:imagePath
        })
        await CreateBlog.save()
        return res.status(200).json({success:true, message: 'Post created successfully',post:CreateBlog})
    } catch (error) {
        console.error( error)
        return res.status(500).json({ success:false,message: 'Internal server error' })
    }
}

const deletePost=async(req,res)=>{
    try {
        const postId=req.params.id

        const FindPost=await PostModel.findById(postId)
        if(!FindPost){
            return res.status(404).json({success:false,messgae:"Post not found"})
        }
        if (FindPost.image) {
            const profilepath=path.join('public/images',FindPost.image)
            fs.promises.unlink(profilepath)
            .then(()=>console.log('post image deleted'))
            .catch(error =>console.log('error deleting post image',error))
        }


        const deletedPost=await PostModel.findByIdAndDelete(postId)
        return res.status(200).json({success:true,messgae:"Post deleted successfully",post:deletedPost}) 

    } catch (error) {
        console.error( error)
        return res.status(500).json({ success:false,message: 'Internal server error' })
        
    }
}
const getposts=async(req,res)=>{
    try {
        const posts=await PostModel.find()
        if(!posts){
            return res.status(404).json({success:false,message:'Post Not Found'})
        }
       
        return res.status(200).json({success:true,posts})
    } catch (error) {
        console.error( error)
        return res.status(500).json({ success:false,message: 'Internal server error' })
    }
}
const update=async(req,res)=>{
    try {
        const {title,desc}=req.body
        const postId=req.params.id;
        const postUpdate=await PostModel.findById(postId)


        if (!postUpdate) {
            return res.status(404).json({success:false,message:'Post Not Found'})
        }
        if (title) {
            postUpdate.title=title
        }
        if(desc){
            postUpdate.desc=desc
        }
        if(req.file){
            postUpdate.image=req.file.filname
        }
        await postUpdate.save()
        return res.status(200).json({success:true,messgae:"Post updated successfully",post:postUpdate}) 
    } catch (error) {
        console.error( error)
        return res.status(500).json({ success:false,message: 'Internal server error' })
    }
}
export {Create,deletePost,getposts,update}