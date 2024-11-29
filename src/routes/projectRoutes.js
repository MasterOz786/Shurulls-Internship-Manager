const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { authenticate, authorize } = require('../middleware/auth');

router.post('/',
  authenticate,
  authorize(['supervisor']),
  projectController.createProject
);

router.put('/:projectId/status',
  authenticate,
  authorize(['supervisor']),
  projectController.updateProjectStatus
);

router.post('/:projectId/documents',
  authenticate,
  authorize(['supervisor', 'internee']),
  projectController.uploadProjectDocument
);

module.exports = router;