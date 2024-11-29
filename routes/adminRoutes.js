const express = require('express');
const { createAdmin, getUsers, updateUser, deleteUser } = require('../controllers/adminController');
const { checkRole } = require('../middleware/adminMiddleware');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// Super Admin routes for creating super admin
router.post('/create-admin', createAdmin);

// Admin/Internee Management
router.get('/users', authenticate, checkRole(['admin']), getUsers);
router.put('/users/:id', authenticate, checkRole(['admin']), updateUser);
router.delete('/users/:id', authenticate, checkRole(['admin']), deleteUser);

module.exports = router;
