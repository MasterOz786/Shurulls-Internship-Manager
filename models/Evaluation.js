const mongoose = require('mongoose');

const evaluationSchema = new mongoose.Schema({
  internee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Internee',
    required: true
  },
  supervisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supervisor',
    required: true
  },
  period: {
    type: String,
    required: true
  },
  criteria: [{
    name: {
      type: String,
      required: true
    },
    score: {
      type: Number,
      required: true,
      min: 0,
      max: 10
    },
    comments: String
  }],
  overallScore: {
    type: Number,
    required: true
  },
  feedback: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Evaluation', evaluationSchema);