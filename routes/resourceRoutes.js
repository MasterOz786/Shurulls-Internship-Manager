
const express = require("express");
const router = express.Router();
const CONSTANTS = require("../config/constants");

const { checkRole } = require("../middleware/adminMiddleware");
const { authenticateToken } = require("../middleware/authMiddleware");
const { 
    createResource,
    getResources,
    updateResource,
    deleteResource,
    assignResource,
    unassignResource,
    getAssignedResources
} = require("../controllers/resourceController");

// Resource Management
router.post('/resources', authenticateToken, checkRole(['admin']), createResource);
router.get('/resources', authenticateToken, checkRole(['admin']), getResources);
router.put('/resources/:id', authenticateToken, checkRole(['admin']), updateResource);
router.delete('/resources/:id', authenticateToken, checkRole(['admin']), deleteResource);

// Assign/Unassign Resource
router.post('/assign', authenticateToken, checkRole(['admin']), assignResource);  // Assign resource to a user
router.post('/unassign', authenticateToken, checkRole(['admin']), unassignResource);  // Unassign resource from a user

// Get assigned resources of a user
router.get('/assigned/:userId', authenticateToken,checkRole(['admin']), getAssignedResources);

module.exports = router;
