
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const CONSTANTS = require('../config/constants');
const { checkRole } = require('../middleware/adminMiddleware');
const { authenticate } = require('../middleware/authMiddleware');

// Protected routes
router.get('/profile', authenticate, userController.getProfile);
router.put('/profile', authenticate, checkRole([CONSTANTS.ROLES.ADMIN]), userController.updateProfile);

module.exports = router;
