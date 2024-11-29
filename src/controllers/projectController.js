const Project = require('../models/project');
const { sendNotification } = require('../utils/notifications');

exports.createProject = async (req, res) => {
  try {
    const { title, description, startDate, endDate, internees, technologies } = req.body;
    
    const project = new Project({
      title,
      description,
      startDate,
      endDate,
      supervisor: req.user._id,
      internees,
      technologies
    });

    await project.save();

    // Notify assigned internees
    for (const interneeId of internees) {
      await sendNotification({
        to: interneeId,
        type: 'PROJECT_ASSIGNMENT',
        message: `You have been assigned to a new project: ${title}`
      });
    }

    res.status(201).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateProjectStatus = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { status } = req.body;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    project.status = status;
    await project.save();

    res.status(200).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.uploadProjectDocument = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { name, url } = req.body;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    project.documents.push({ name, url });
    await project.save();

    res.status(200).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};