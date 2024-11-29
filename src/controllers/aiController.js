const { 
    generateProjectSuggestions, 
    analyzePerformance,
    generateMeetingSummary 
  } = require('../services/ai');
  
  exports.getProjectSuggestions = async (req, res) => {
    try {
      const { skills, interests } = req.body;
      const suggestions = await generateProjectSuggestions(skills, interests);
      res.json({ success: true, data: suggestions });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  
  exports.getPerformanceAnalysis = async (req, res) => {
    try {
      const { interneeId } = req.params;
      
      // Fetch internee data
      const evaluations = await Evaluation.find({ internee: interneeId });
      const reports = await Report.find({ internee: interneeId });
      const tasks = await Task.find({ assignedTo: interneeId });
      
      const analysis = await analyzePerformance(evaluations, reports, tasks);
      res.json({ success: true, data: analysis });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
  
  exports.getMeetingSummary = async (req, res) => {
    try {
      const { transcript } = req.body;
      const summary = await generateMeetingSummary(transcript);
      res.json({ success: true, data: summary });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };