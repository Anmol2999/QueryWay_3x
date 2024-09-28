import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BaseUrl, get, post } from '../services/Endpoint';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

export default function Blog() {
    const { id } = useParams();
    const user = useSelector((state) => state.auth.user);

    const [singlePost, setSinglePost] = useState(null);
    const [comment, setComment] = useState('');
    const [loaddata, setLoaddata] = useState(false);

    useEffect(() => {
        const fetchSinglePost = async () => {
            try {
                const request = await get(`/public/singlepost/${id}`);
                const response = request.data;
                setSinglePost(response.Post);
            } catch (error) {
                console.log(error);
            }
        };
        fetchSinglePost();
    }, [loaddata, id]);

    const onSubmitComment = async (e) => {
      e.preventDefault();
      if (!user) {
          toast.error('Please Login');
          return;
      }
  
      try {
          const response = await post("/comment/addcomment", {
              comment: comment,
              postId: id, // Make sure 'id' is the post ID you're referencing
              userId: user._id,
          });
  
          if (response.data.success) {
              toast.success(response.data.message);
              setComment(''); // Clear the comment input
              setLoaddata(prevState => !prevState); // Reload data if necessary
          } else {
              toast.error(response.data.message); // Handle any error messages
          }
      } catch (error) {
          console.error(error); // Log any errors for debugging
          toast.error("An unexpected error occurred. Please try again.");
      }
  };

    return (
        <div className="container text-white mt-5 mb-5">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="fw-bold text-white mb-4 display-4">{singlePost && singlePost.title}</h1>
                    <img 
                        src={singlePost && `${BaseUrl}/images/${singlePost.image}`} 
                        alt="Blog" 
                        className="img-fluid mb-4" 
                        style={{ borderRadius: "10px", maxHeight: "500px", objectFit: "cover", width: "100%" }}
                    />
                    <p className="mb-5">{singlePost && singlePost.desc}</p>

                    <hr />

                    <h3 className="mt-5 mb-4">Leave a Comment</h3>
                    <form onSubmit={onSubmitComment}>
                        <div className="mb-3">
                            <label htmlFor="comment" className="form-label">Comment</label>
                            <textarea className="form-control" id="comment" rows="4" placeholder="Write your comment here" required
                                value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit Comment</button>
                    </form>

                    <hr />

                    <h3 className="mt-5 mb-4">Comments</h3>
                    {singlePost && singlePost.comments && singlePost.comments.map((elem) => (
                        <div key={elem._id} className="bg-secondary p-3 rounded mb-3 d-flex">
                            <img 
                                src={`${BaseUrl}/images/${elem.userId.profile}`} 
                                alt="User" 
                                className="rounded-circle me-3" 
                                style={{ width: "50px", height: "50px", objectFit: "cover" }}
                            />
                            <div>
                                <h5 className="mb-1">{elem.userId.FullName}</h5>
                                <p className="mb-0">{elem.comment}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
