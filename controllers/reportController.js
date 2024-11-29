const Report = require('../models/Report');
const { sendNotification } = require('../utils/notifications');

exports.createReport = async (req, res) => {
  try {
    const { type, activities, learnings, nextDayPlan } = req.body;
    
    const report = new Report({
      internee: req.user._id,
      type,
      date: new Date(),
      activities,
      learnings,
      nextDayPlan
    });

    await report.save();

    res.status(201).json({ success: true, data: report });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.submitReport = async (req, res) => {
  try {
    const { reportId } = req.params;
    
    const report = await Report.findById(reportId);
    if (!report) {
      return res.status(404).json({ success: false, error: 'Report not found' });
    }

    report.status = 'submitted';
    await report.save();

    // Notify supervisor
    await sendNotification({
      to: report.supervisor,
      type: 'REPORT_SUBMITTED',
      message: `A new ${report.type} report has been submitted for review`
    });

    res.status(200).json({ success: true, data: report });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.reviewReport = async (req, res) => {
  try {
    const { reportId } = req.params;
    const { supervisorComments } = req.body;

    const report = await Report.findById(reportId);
    if (!report) {
      return res.status(404).json({ success: false, error: 'Report not found' });
    }

    report.status = 'reviewed';
    report.supervisorComments = supervisorComments;
    await report.save();

    // Notify internee
    await sendNotification({
      to: report.internee,
      type: 'REPORT_REVIEWED',
      message: 'Your report has been reviewed by your supervisor'
    });

    res.status(200).json({ success: true, data: report });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};