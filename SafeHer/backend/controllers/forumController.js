const ForumPost = require('../models/ForumPost');

const getPosts = async (req, res) => {
    try {
        const posts = await ForumPost.find().sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createPost = async (req, res) => {
    try {
        const { title, content, tag } = req.body;
        
        if (!title || !content) {
            return res.status(400).json({ message: 'Please add a title and content.' });
        }

        const post = await ForumPost.create({
            userId: req.user.id,
            title,
            content,
            tag: tag || 'Support'
        });
        
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getPosts, createPost };
