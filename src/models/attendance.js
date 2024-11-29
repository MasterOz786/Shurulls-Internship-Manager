const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  internee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Internee',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['present', 'absent', 'late', 'leave'],
    required: true
  },
  checkInTime: {
    type: Date
  },
  checkOutTime: {
    type: Date
  },
  notes: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);