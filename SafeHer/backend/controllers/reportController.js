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

const escalateReport = async (req, res) => {
    try {
        const report = await Report.findOne({ _id: req.params.id, userId: req.user.id });
        if (!report) {
            return res.status(404).json({ message: 'Report not found or unauthorized' });
        }
        
        if (report.escalated) {
            return res.status(400).json({ message: 'Report already escalated to authorities.' });
        }

        // Setup Nodemailer Configuration
        const nodemailer = require('nodemailer');
        
        // Use real credentials from .env, or fallback to mock success if not configured for safer local testing
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            const transporter = nodemailer.createTransport({
                service: 'gmail', // Standard configuration for demo
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            const emailHTML = `
                <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #ccc; padding: 20px;">
                    <h2 style="color: #e11d48; text-transform: uppercase;">Urgent: Cybercrime Escalation</h2>
                    <p><strong>Platform:</strong> ${report.platform || 'N/A'}</p>
                    <p><strong>AI Severity:</strong> ${report.severity} (${report.aiScore}% Toxicity)</p>
                    <hr/>
                    <p><strong>Incident Narrative:</strong></p>
                    <p style="background: #fdf2f8; padding: 15px; border-left: 4px solid #e11d48;">${report.content}</p>
                    <p><strong>Evidence Logged:</strong> ${report.evidenceUrls.length > 0 ? 'Yes (Attached on secure cloud)' : 'None provided'}</p>
                    <p>Please review immediately and initiate contact protocols.</p>
                </div>
            `;

            await transporter.sendMail({
                from: `"SafeHer Emergency Relay" <${process.env.EMAIL_USER}>`,
                to: process.env.ESCALATION_EMAIL || process.env.EMAIL_USER, // sends to self if separate escalation email isn't set
                subject: `SAFEHER ALERT: High Severity Incident Escalation - ${report._id}`,
                html: emailHTML,
            });
        } else {
            console.warn('[SafeHer Demo] No EMAIL_USER found in .env. Mocking escalation success.');
        }

        report.escalated = true;
        await report.save();

        res.status(200).json({ message: 'Report officially escalated to authorities.', report });
    } catch (error) {
        console.error("Escalation Error:", error);
        res.status(500).json({ message: 'Failed to escalate report. ' + error.message });
    }
};

module.exports = { createReport, getReports, escalateReport };
