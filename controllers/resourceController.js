const Resource = require('../models/Resource.js');

// Create Resource
exports.createResource = async (req, res) => {
  const { resourceName, type, availability, resourceCount } = req.body;

  if (!resourceName || !type || resourceCount === undefined || availability === undefined) {
    return res.status(400).json({ msg: 'Please fill all fields' });
  }

  try {
    const resource = new Resource({
      resourceName,
      type,
      availability,
      resourceCount,
    });

    await resource.save();
    res.status(201).json({ msg: 'Resource created successfully', resource });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Read Resources
exports.getResources = async (req, res) => {
  try {
    const resources = await Resource.find();
    res.json(resources);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update Resource
exports.updateResource = async (req, res) => {
  const { id } = req.params;
  const { resourceName, type, availability, resourceCount } = req.body;

  try {
    const resource = await Resource.findById(id);

    if (!resource) {
      return res.status(404).json({ msg: 'Resource not found' });
    }

    resource.resourceName = resourceName || resource.resourceName;
    resource.type = type || resource.type;
    resource.availability = availability !== undefined ? availability : resource.availability;
    resource.resourceCount = resourceCount !== undefined ? resourceCount : resource.resourceCount;

    await resource.save();
    res.json({ msg: 'Resource updated successfully', resource });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete Resource
exports.deleteResource = async (req, res) => {
  const { id } = req.params;

  try {
    const resource = await Resource.findById(id);

    if (!resource) {
      return res.status(404).json({ msg: 'Resource not found' });
    }

    await resource.remove();
    res.json({ msg: 'Resource deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};



// Assign Resource to User
exports.assignResource = async (req, res) => {
    const { userId, resourceId } = req.body;  // userId is the ID of the user (Admin or Intern), resourceId is the ID of the resource
  
    if (!userId || !resourceId) {
      return res.status(400).json({ msg: 'User ID and Resource ID are required' });
    }
  
    try {
      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      // Find the resource by ID
      const resource = await Resource.findById(resourceId);
      if (!resource) {
        return res.status(404).json({ msg: 'Resource not found' });
      }
      if (!resource.availability) {
        return res.status(400).json({ msg: 'Resource is not available' });
      }
  
      // Check if the resource is already assigned to the user
      if (user.resourcesAllocated.includes(resourceId)) {
        return res.status(400).json({ msg: 'Resource already assigned to this user' });
      }
  
      // Assign the resource to the user
      user.resourcesAllocated.push(resourceId);
      await user.save();
  
      // Optionally, decrement the availability of the resource (if needed)
      if (resource.resourceCount > 0) {
        resource.resourceCount -= 1;
        if(resource.resourceCount==0)
        {
            resource.availability = false; 
        }
        await resource.save();
      }
  
      res.json({ msg: 'Resource assigned successfully', user });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
  


  // Unassign Resource from User
exports.unassignResource = async (req, res) => {
    const { userId, resourceId } = req.body;
  
    if (!userId || !resourceId) {
      return res.status(400).json({ msg: 'User ID and Resource ID are required' });
    }
  
    try {
      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      // Check if the resource is assigned to the user
      if (!user.resourcesAllocated.includes(resourceId)) {
        return res.status(400).json({ msg: 'Resource is not assigned to this user' });
      }
  
      // Remove the resource from the user's resourcesAllocated array
      user.resourcesAllocated = user.resourcesAllocated.filter(resource => resource.toString() !== resourceId);
      await user.save();
  
      // Find the resource by ID and increment the availability
      const resource = await Resource.findById(resourceId);
      if (resource) {
        resource.availability = true;  // Mark the resource as available again
        resource.resourceCount++;
        await resource.save();
      }
  
      res.json({ msg: 'Resource unassigned successfully', user });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
  
// Get Assigned Resources for a User
exports.getAssignedResources = async (req, res) => {
  const { userId } = req.params;  // Get userId from route parameter

  if (!userId) {
    return res.status(400).json({ msg: 'User ID is required' });
  }

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Check if the user has any resources assigned
    if (user.resourcesAllocated.length === 0) {
      return res.status(404).json({ msg: 'No resources assigned to this user' });
    }

    // Fetch the assigned resources using the resource IDs in user's resourcesAllocated
    const resources = await Resource.find({
      '_id': { $in: user.resourcesAllocated }  // Find resources whose IDs are in resourcesAllocated
    });

    // If no resources are found, return a message
    if (resources.length === 0) {
      return res.status(404).json({ msg: 'No resources found for this user' });
    }

    // Return the assigned resources
    res.json({ msg: 'Assigned resources retrieved successfully', resources });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
