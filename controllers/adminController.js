const User = require('../models/User');
const Resource = require('../models/Resource.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const CONSTANTS = require('../config/constants');

// Create Super Admin
exports.createAdmin = async (req, res) => {
  const { secret, name, email, password } = req.body;

  if (secret !== process.env.ADMIN_SECRET) {
    return res.status(403).json({ msg: 'Unauthorized' });
  }

  try {
    const existingSuperAdmin = await User.findOne({ role: CONSTANTS.ROLES.ADMIN });

    if (existingSuperAdmin) {
      return res.status(400).json({ msg: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const superAdmin = new User({
      name,
      email,
      password: hashedPassword,
      role: 'superadmin',
    });

    await superAdmin.save();
    res.status(201).json({ msg: 'Admin created successfully!' });
  } catch (err) {
    console.error('Error:', err.message, err.stack);
    res.status(500).send('Server Error');
  }
};

// Get All Users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update User
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, role, password } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();
    res.json({ msg: 'User updated successfully', user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    await user.remove();
    res.json({ msg: 'User deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

