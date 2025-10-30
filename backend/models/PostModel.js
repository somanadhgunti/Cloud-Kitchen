const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
    {
        title: { type: String, required: true },
        excerpt: { type: String, required: true },
        content: { type: String },
        date: { type: Date, default: Date.now },
        slug: { type: String, unique: true },
    },
    { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);
module.exports = Post;