const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const { authenticate, authorize } = require('../middleware/auth');

router.post('/project-suggestions',
  authenticate,
  authorize(['supervisor']),
  aiController.getProjectSuggestions
);

router.get('/performance-analysis/:interneeId',
  authenticate,
  authorize(['supervisor']),
  aiController.getPerformanceAnalysis
);

router.post('/meeting-summary',
  authenticate,
  authorize(['supervisor', 'internee']),
  aiController.getMeetingSummary
);

module.exports = router;