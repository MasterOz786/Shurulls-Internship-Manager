const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

router.post('/', 
  authenticate, 
  authorize(['supervisor']), 
  taskController.createTask
);

router.put('/:taskId/status', 
  authenticate, 
  authorize(['internee']), 
  taskController.updateTaskStatus
);

router.get('/internee/:interneeId', 
  authenticate, 
  authorize(['supervisor', 'admin', 'internee']), 
  taskController.getInterneeTasks
);

module.exports = router;