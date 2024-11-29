const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/authController');

router.post('/login', login);   // Login for Admin/Internee
router.post('/register', register);   // Register for Admin/Internee

module.exports = router;
