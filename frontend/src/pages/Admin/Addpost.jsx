import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
  // State to manage form inputs
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState(null); // For file upload
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('desc', desc);
    if (image) {
      formData.append('postimage', image);
    }
  
    try {
      const token = localStorage.getItem('token'); // Get token from local storage
  
      const response = await axios.post('http://localhost:8000/blog/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,  // Add token to Authorization header
        },
        withCredentials: true,  // If you're using cookies for authentication
      });
  
      setMessage('Post created successfully!');
      setTitle('');
      setDesc('');
      setImage(null);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        console.log('Error response:', error.response.data);
        console.log('Error status:', error.response.status);
        setMessage('Error creating post: ' + error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        console.log('Error request:', error.request);
        setMessage('Error creating post: No response received from server');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error message:', error.message);
        setMessage('Error creating post: ' + error.message);
      }
      setLoading(false);
    }
     finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2  style={{color:"white"}}>Create New Post</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label htmlFor="title" style={{color:"white"}}>Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="desc" style={{color:"white"}}>Description</label>
          <textarea
            className="form-control"
            id="desc"
            rows="4"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="image" style={{color:"white"}}>Image</label>
          <input
            type="file"
            className="form-control"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
          {loading ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost