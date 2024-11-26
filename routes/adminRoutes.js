const express = require('express');
const { createAdmin, getUsers, updateUser, deleteUser } = require('../controllers/adminController');
const { checkRole } = require('../middleware/adminMiddleware');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Super Admin routes for creating super admin
router.post('/create-admin', createAdmin);

// Admin/Internee Management
router.get('/users', authenticateToken, checkRole(['admin']), getUsers);
router.put('/users/:id', authenticateToken, checkRole(['admin']), updateUser);
router.delete('/users/:id', authenticateToken, checkRole(['admin']), deleteUser);

module.exports = router;
