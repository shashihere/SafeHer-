const express = require('express');
const { analyzeText } = require('../controllers/analyzeController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, analyzeText);

module.exports = router;
