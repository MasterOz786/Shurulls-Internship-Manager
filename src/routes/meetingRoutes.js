const express = require('express');
const router = express.Router();
const meetingController = require('../controllers/meetingController');
const { authenticate, authorize } = require('../middleware/auth');

router.post('/',
  authenticate,
  authorize(['supervisor']),
  meetingController.scheduleMeeting
);

router.put('/:meetingId/response',
  authenticate,
  authorize(['supervisor', 'internee']),
  meetingController.updateMeetingResponse
);

module.exports = router;