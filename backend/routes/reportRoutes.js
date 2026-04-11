const express = require('express');
const { createReport, getReports } = require('../controllers/reportController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const router = express.Router();

router.route('/')
    .post(protect, upload.array('evidence', 5), createReport)
    .get(protect, getReports);

module.exports = router;
