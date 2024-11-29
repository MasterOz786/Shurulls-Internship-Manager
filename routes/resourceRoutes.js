
const express = require("express");
const router = express.Router();
const CONSTANTS = require("../config/constants");

const { checkRole } = require("../middleware/adminMiddleware");
const { authenticate } = require("../middleware/authMiddleware");
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
router.post('/resources', authenticate, checkRole(['admin']), createResource);
router.get('/resources', authenticate, checkRole(['admin']), getResources);
router.put('/resources/:id', authenticate, checkRole(['admin']), updateResource);
router.delete('/resources/:id', authenticate, checkRole(['admin']), deleteResource);

// Assign/Unassign Resource
router.post('/assign', authenticate, checkRole(['admin']), assignResource);  // Assign resource to a user
router.post('/unassign', authenticate, checkRole(['admin']), unassignResource);  // Unassign resource from a user

// Get assigned resources of a user
router.get('/assigned/:userId', authenticate,checkRole(['admin']), getAssignedResources);

module.exports = router;
