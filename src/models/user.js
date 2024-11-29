const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  department: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'internee','superadmin'], // Valid roles
  },
  resourcesAllocated: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resource', // References the Resource model
    },
  ],
  assignedAdmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // References an Admin user
    default: null, // Null for non-internees
  },
});

// Hash the password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Compare passwords
UserSchema.methods.comparePassword = async function (inputPassword) {
    return await bcrypt.compare(inputPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
