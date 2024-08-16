// Imports:
const express = require('express');
const router = express.Router();

const { getUsers, getUserById } = require('../controllers/userController');
const {
  newUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');
const { checkToken, restrictByRole } = require('../controllers/authController');

// Routing:
router.route('/').get(checkToken, restrictByRole('admin'), getUsers);
router.route('/:id').get(checkToken, restrictByRole('admin'), getUserById);

router.route('/login').post(loginUser);
router.route('/register').post(newUser);
router.route('/logout').post(logoutUser);
router.route('/forgotPassword').post(forgotPassword);
router.route('/resetPassword/:passwordResetToken').post(resetPassword);

module.exports = router;
