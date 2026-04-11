const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    platform: { type: String }, // e.g., Instagram, Twitter
    aiScore: { type: Number },
    severity: { type: String, enum: ['Low', 'Medium', 'High', 'Pending'], default: 'Pending' },
    evidenceUrls: [{ type: String }] // Store file paths
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);
