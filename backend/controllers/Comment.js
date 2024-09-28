import PostModel from "../models/Blog.js";
import CommentModel from "../models/comments.js";

const AddComment = async (req, res) => {
    try {
        const { postId, userId, comment } = req.body;

        // Input validation
        if (!postId || !userId || !comment) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        // Create new comment
        const newComment = new CommentModel({
            postId,
            userId,
            comment
        });

        await newComment.save();

        // Check if post exists
        const existPost = await PostModel.findById(postId);
        if (!existPost) {
            return res.status(404).json({ success: false, message: 'Blog post not found' });
        }

        // Add comment to post
        existPost.comments.push(newComment._id);
        await existPost.save();

        return res.status(200).json({ success: true, message: 'Comment added successfully', comment: newComment });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export { AddComment };
