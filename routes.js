const express = require('express');
const router = express.Router();

// Import route modules
const authRoutes = require('./routes/authRoutes');
const superAdminRoutes = require('./routes/superAdminRoutes');  // Correct path for super admin routes

// Delegate routes
router.use('/auth', authRoutes);            // All auth routes go to /api/auth
router.use('/superadmin', superAdminRoutes); // All super admin routes go to /api/superadmin

// Optionally, you can add more routes here if needed.

module.exports = router;