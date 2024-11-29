const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

router.post('/mark', 
  authenticate, 
  authorize(['internee']), 
  attendanceController.markAttendance
);

router.put('/checkout/:attendanceId', 
  authenticate, 
  authorize(['internee']), 
  attendanceController.updateCheckOut
);

router.get('/internee/:interneeId', 
  authenticate, 
  authorize(['supervisor', 'admin', 'internee']), 
  attendanceController.getInterneeAttendance
);

module.exports = router;