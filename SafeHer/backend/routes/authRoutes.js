const express = require('express');
const { registerUser, loginUser, updatePassword, updatePreferences, deleteAccount } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/update-password', protect, updatePassword);
router.put('/preferences', protect, updatePreferences);
router.delete('/delete', protect, deleteAccount);

module.exports = router;
