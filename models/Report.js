const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  internee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Internee',
    required: true
  },
  type: {
    type: String,
    enum: ['daily', 'weekly', 'monthly'],
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  activities: [{
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project'
    },
    description: String,
    hoursSpent: Number,
    challenges: String,
    solutions: String
  }],
  learnings: [String],
  nextDayPlan: String,
  status: {
    type: String,
    enum: ['draft', 'submitted', 'reviewed'],
    default: 'draft'
  },
  supervisorComments: String
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);