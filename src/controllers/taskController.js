const Task = require('../models/task');
const { sendNotification } = require('../utils/notifications');

exports.createTask = async (req, res) => {
  try {
    const { title, description, assignedTo, dueDate, priority } = req.body;
    
    const task = new Task({
      title,
      description,
      assignedTo,
      assignedBy: req.user._id,
      dueDate,
      priority
    });

    await task.save();

    // Send notification to internee
    await sendNotification({
      to: assignedTo,
      type: 'NEW_TASK',
      message: `You have been assigned a new task: ${title}`
    });

    res.status(201).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }

    task.status = status;
    await task.save();

    // Notify supervisor when task is completed
    if (status === 'completed') {
      await sendNotification({
        to: task.assignedBy,
        type: 'TASK_COMPLETED',
        message: `Task "${task.title}" has been marked as completed`
      });
    }

    res.status(200).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getInterneeTasks = async (req, res) => {
  try {
    const { interneeId } = req.params;
    const { status } = req.query;

    const query = { assignedTo: interneeId };
    if (status) {
      query.status = status;
    }

    const tasks = await Task.find(query)
      .sort({ dueDate: 1 })
      .populate('assignedBy', 'name email');

    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};