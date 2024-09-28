import PostModel from "../models/Blog.js"

const GetSinglepost=async(req,res)=>{
    try {
        const postID=req.params.id
        const FindPost=await PostModel.findById(postID)
        .populate({
            path:'comments',
            populate:{
                path:"userId"
            }
        })
        if(!FindPost){
            return res.status(404).json({success:false,message:'Blog post not found'})
        }
        res.status(200).json({success:true,Post:FindPost})
    } catch (error) {
        console.error( error)
        return res.status(500).json({ success:false,message: 'Internal server error' })
    }
}


export {GetSinglepost}