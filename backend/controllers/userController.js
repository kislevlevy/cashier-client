// Imports:
const User = require('../models/userModel');
const { getDocs, getDocById } = require('../utils/methodesFactory');

//////////////////////////////////////////////////
// Get all users:
exports.getUsers = getDocs(User, 'users');

// Get user by ID:
exports.getUserById = getDocById(User, 'user');
