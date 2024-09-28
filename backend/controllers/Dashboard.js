import PostModel from "../models/Blog.js"
import UserModel from "../models/user.js"
import fs from 'fs'
import path from 'path'
import CommentModel from '../models/comments.js'

const Getalldata=async(req,res)=>{
    try {
        const Users=await UserModel.find()
        const Posts=await PostModel.find()
        const Comments=await CommentModel.find()
        //comment will get here

        if (!Users && !Posts) {
            return res.status(404).json({success:false,message:'Data not found'})
            
        }
        res.status(200).json({success:true,Users,Posts,Comments})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:'Internal server error'})

    }
}

const GetUser=async(req,res)=>{
    try {
        const Users=await UserModel.find()
        
        //comment will get here

        if (!Users ) {
            return res.status(404).json({success:false,message:'Data not found'})
            
        }
        res.status(200).json({success:true,Users})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:'Internal server error'})

    }
}
const Userdelete=async(req,res)=>{
    try {
        const userId=req.params.id
        const ExistUser=await UserModel.findById(userId)
        if (!ExistUser) {
            return res.status(404).json({success:false,message:'User not found'})
            
        }
        if (ExistUser.role=='admin') {
            return res.status(404).json({success:false,message:'Sorry you are admin you cant delete your account'})
            
        }
        if (ExistUser.profile) {
            const profilepath=path.join('public/images',ExistUser.profile)
            fs.promises.unlink(profilepath)
            .then(()=>console.log('post image deleted'))
            .catch(error =>console.log('error deleting post image',error))
        }
        const DeleteUser=await UserModel.findByIdAndDelete(userId)
        res.status(200).json({success:true,message:'user deleted successfully',User:DeleteUser})
        

    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:'Internal server error'})
    }
}
export {Getalldata,GetUser,Userdelete}