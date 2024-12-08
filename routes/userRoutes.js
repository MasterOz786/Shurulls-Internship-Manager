
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const CONSTANTS = require('../config/constants');
const { checkRole } = require('../middleware/adminMiddleware');
const { authenticateToken } = require('../middleware/authMiddleware');

// Protected routes
router.get('/profile', authenticateToken, userController.getProfile);
router.put('/profile', authenticateToken, checkRole([CONSTANTS.ROLES.ADMIN]), userController.updateProfile);

module.exports = router;
