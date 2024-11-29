const express = require('express');
const router = express.Router();
const evaluationController = require('../controllers/evaluationController');
const { authenticate, authorize } = require('../middleware/auth');

router.post('/', 
  authenticate, 
  authorize(['supervisor']), 
  evaluationController.createEvaluation
);

router.get('/internee/:interneeId', 
  authenticate, 
  authorize(['supervisor', 'admin', 'internee']), 
  evaluationController.getInterneeEvaluations
);

router.get('/supervisor', 
  authenticate, 
  authorize(['supervisor']), 
  evaluationController.getSupervisorEvaluations
);

module.exports = router;