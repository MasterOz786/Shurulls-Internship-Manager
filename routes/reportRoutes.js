const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

router.post('/',
  authenticate,
  authorize(['internee']),
  reportController.createReport
);

router.put('/:reportId/submit',
  authenticate,
  authorize(['internee']),
  reportController.submitReport
);

router.put('/:reportId/review',
  authenticate,
  authorize(['supervisor']),
  reportController.reviewReport
);

module.exports = router;