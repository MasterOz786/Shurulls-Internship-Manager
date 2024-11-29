const Evaluation = require('../models/Evaluation');
const { sendNotification } = require('../utils/notifications');

exports.createEvaluation = async (req, res) => {
  try {
    const { interneeId, criteria, feedback } = req.body;
    
    const overallScore = criteria.reduce((acc, curr) => acc + curr.score, 0) / criteria.length;

    const evaluation = new Evaluation({
      internee: interneeId,
      supervisor: req.user._id,
      period: new Date().toISOString().slice(0, 7), // YYYY-MM format
      criteria,
      overallScore,
      feedback
    });

    await evaluation.save();

    // Notify internee about new evaluation
    await sendNotification({
      to: interneeId,
      type: 'NEW_EVALUATION',
      message: 'Your supervisor has submitted a new evaluation'
    });

    res.status(201).json({ success: true, data: evaluation });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getInterneeEvaluations = async (req, res) => {
  try {
    const { interneeId } = req.params;

    const evaluations = await Evaluation.find({ internee: interneeId })
      .sort({ createdAt: -1 })
      .populate('supervisor', 'name email');

    res.status(200).json({ success: true, data: evaluations });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getSupervisorEvaluations = async (req, res) => {
  try {
    const evaluations = await Evaluation.find({ supervisor: req.user._id })
      .sort({ createdAt: -1 })
      .populate('internee', 'name email');

    res.status(200).json({ success: true, data: evaluations });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};