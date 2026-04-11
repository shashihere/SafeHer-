const mongoose = require('mongoose');

const forumPostSchema = mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    title: { 
        type: String, 
        required: true 
    },
    content: { 
        type: String, 
        required: true 
    },
    tag: { 
        type: String, 
        default: 'Survival Story' 
    },
    upvotes: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('ForumPost', forumPostSchema);
