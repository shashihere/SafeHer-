const Report = require('../models/Report');

const createReport = async (req, res) => {
    try {
        const { content, platform, aiScore, severity } = req.body;
        
        let evidenceUrls = [];
        if (req.files && req.files.length > 0) {
            evidenceUrls = req.files.map(file => file.path); // file.path securely injected by cloudinary
        }

        const report = await Report.create({
            userId: req.user.id,
            content,
            platform,
            aiScore: parseFloat(aiScore) || 0,
            severity: severity || 'Pending',
            evidenceUrls
        });
        res.status(201).json(report);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getReports = async (req, res) => {
    try {
        const reports = await Report.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createReport, getReports };
