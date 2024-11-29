const Attendance = require('../models/Attendance');

exports.markAttendance = async (req, res) => {
  try {
    const { interneeId, status, notes } = req.body;
    
    const attendance = new Attendance({
      internee: interneeId,
      status,
      checkInTime: status === 'present' ? new Date() : null,
      notes
    });

    await attendance.save();
    res.status(201).json({ success: true, data: attendance });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateCheckOut = async (req, res) => {
  try {
    const { attendanceId } = req.params;
    
    const attendance = await Attendance.findById(attendanceId);
    if (!attendance) {
      return res.status(404).json({ success: false, error: 'Attendance record not found' });
    }

    attendance.checkOutTime = new Date();
    await attendance.save();

    res.status(200).json({ success: true, data: attendance });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getInterneeAttendance = async (req, res) => {
  try {
    const { interneeId } = req.params;
    const { startDate, endDate } = req.query;

    const query = { internee: interneeId };
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const attendance = await Attendance.find(query).sort({ date: -1 });
    res.status(200).json({ success: true, data: attendance });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};