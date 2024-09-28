import React ,{useState,useEffect}from 'react'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { del,get,BaseUrl, post, patch } from '../../services/Endpoint';
import toast from 'react-hot-toast';

export default function Allpost() {
  const [posts,setPosts]=useState([])
  const [loadedata,setLoadedata]=useState(false)


  const handleDelete = async(postId) => {
 // Display a confirmation dialog
 const confirmed = window.confirm('Are you sure you want to delete this post?');
  
 if (confirmed) {
   try {
     const response = await del(`/blog/delete/${postId}`);
     const data = response.data;

     if (data.success) {
       toast.success('Post deleted successfully');
       setLoadedata(!loadedata); // Trigger reloading the data
     
     } else {
       toast.error('Failed to delete the post.');
     }
   } catch (error) {
     console.error('Error deleting post:', error);

     if (error.response && error.response.data && error.response.data.message) {
         // setError(error.response.data.message); // Set error message from server response
         toast.error(error.response.data.message)
     } else {
         toast.error("An unexpected error occurred. Please try again.");
     }
   }
 }
  };

  const handleUpdate =async (postId) => {
    // Implement the update functionality here
    const confirmed = window.confirm('Are you sure you want to update this post?');
    if (confirmed) {
      try {
        const response = await patch(`/blog/update/${postId}`);
        const data = response.data;
   
        if (data.success) {
          toast.success(data.message);
          setLoadedata(!loadedata); // Trigger reloading the data
        
        } else {
          toast.error('Failed to delete the post.');
        }
      } catch (error) {
        console.error('Error deleting post:', error);
   
        if (error.response && error.response.data && error.response.data.message) {
            // setError(error.response.data.message); // Set error message from server response
            toast.error(error.response.data.message)
        } else {
            toast.error("An unexpected error occurred. Please try again.");
        }
      }
    }
  };

  useEffect(()=>{
    const getposts=async()=>{
      try {
          const resposne= await get("/blog/GetPosts")
          const data= resposne.data
         setPosts(data.posts)
          console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    getposts()
   },[loadedata])
  return (
    <>
    <div className='container'>
      <h1 className='text-center mb-4 text-white'>All Posts</h1>
      {posts && posts.map((post)=>(
        
        
        <div className='row'>
        <div className='col-md-4 mb-4 col-lg-4 col-12'>
          <img src={`${BaseUrl}/images/${post.image}`} 
          className="card-img-top" alt={post.title} />
          <div className='card-body'></div>
          <h5 className='card-title text-white'>{post.title}</h5>
          <p className='card-text text-white'>{post.desc}</p>
        </div>
        <div className='card-footer d-flex justify-content-between'>
          <button className='btn btn-danger' onClick={()=>handleDelete(post._id)}>

            <FaTrashAlt/>Delete
          </button>
          <button className='btn btn-warning' onClick={()=>handleUpdate(post._id)}>

            <FaEdit/>Update
          </button>
        </div>
      </div>))}
    </div>
    
    
    
    
    
    
    </>
  )
}
