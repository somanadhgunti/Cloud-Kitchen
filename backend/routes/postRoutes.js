// backend/routes/postRoutes.js
const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Post = require('../models/PostModel');

// @desc    Fetch all blog posts
// @route   GET /api/posts
// @access  Public
router.get('/', asyncHandler(async (req, res) => {
    const posts = await Post.find({}).sort({ date: -1 });
    res.json(posts);
}));

// @desc    Fetch single blog post by slug or ID
// @route   GET /api/posts/:id
// @access  Public
router.get('/:id', asyncHandler(async (req, res) => {
    const post = await Post.findOne({ $or: [{ _id: req.params.id }, { slug: req.params.id }] });
    
    if (post) {
        res.json(post);
    } else {
        res.status(404);
        throw new Error('Post not found');
    }
}));

module.exports = router;