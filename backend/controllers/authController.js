// Imports:
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { promisify } = require('util');

const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { sendMail } = require('../utils/email');

//////////////////////////////////////////////////
// Register:
exports.newUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  if (!newUser)
    return next(new AppError(404, 'Connot create new user, check your fields.'));

  // Server response:
  return res.status(200).json({
    status: 'success',
    user: newUser,
  });
});

// Login:
exports.loginUser = catchAsync(async (req, res, next) => {
  // Get variables:
  const { email, password } = req.body;
  if (!email || !password) return next(new AppError(404, 'Missing email/password.'));

  // Find user by Email:
  const user = await User.findOne({
    email: email.toLowerCase().trim(),
  }).select('+password');

  if (!user) return next(new AppError(403, 'Email or password is incorrect.'));

  // Check password:
  if (!(await user.checkPassword(password, user.password)))
    return next(new AppError(403, 'Email or password is incorrect.'));

  // Generate Token:
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  // Cookie assign:
  res.cookie('jwt', token, {
    expires: new Date(Date.now() + 86_400_000 * 14),
    sameSite: 'none',
    secure: true,
  });

  // Server response:
  res.status(200).json({
    status: 'success',
    user,
  });
});

// Check token:
exports.checkToken = catchAsync(async (req, res, next) => {
  //Get token from req:
  if (!req.cookies || !req.cookies.jwt)
    return next(new AppError(403, 'User not logged in. - cookies'));
  const { jwt: token } = req.cookies;

  // Verify token:
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  if (!decoded || decoded.exp < Date.now() / 1000)
    return next(
      new AppError(403, 'User session has expierd. please log in. - decoded')
    );

  // Get user by id:
  req.user = await User.findById(decoded.id);
  if (!req.user) return next(new AppError(403, 'User not logged in. - user'));

  // Check for password change:
  if (req.user.passwordChangedAt > new Date(decoded.iat * 1000))
    return next(
      new AppError(
        403,
        'Password has changed, Token is not valid anymore. please login again.'
      )
    );

  // Go to next function:
  next();
});

// Restrict by role:
exports.restrictByRole = (...allowdRoles) => {
  return function (req, res, next) {
    if (!allowdRoles.includes(req.user.role))
      return next(new AppError(403, 'Role is not allowd for this opperation.'));
    return next();
  };
};

// User logout:
exports.logoutUser = function (req, res, next) {
  res.clearCookie('jwt');

  // Server response:
  return res.status(200).json({
    status: 'success',
    user: null,
  });
};

// Forgot password logic:
exports.forgotPassword = catchAsync(async (req, res, next) => {
  // Assign email varieble:
  const email = req.body.email.toLowerCase().trim();

  // Find user by email:
  const user = await User.findOne({ email });
  if (!email || !user)
    return next(new AppError(400, 'This email adress dose not exist.'));

  // Create reset token:
  const resetToken = crypto.randomBytes(32).toString('hex');
  const hashedResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Save user with hashed reset token:
  user.passwordResetToken = hashedResetToken;
  user.passwordResetTokenExpiers = new Date(Date.now() + 86_400_000 * 0.5);
  await user.save({ validateBeforeSave: false });

  // Send email with reset token:
  await sendMail({
    from: 'KL - Cashier Client <noreply@kislev.me>',
    to: user.email,
    subject: 'Passwird reset link for your - Cashier Client account',
    html: `
    <h2>To reset the password copy this code and insert it in the website:</h2>
    <a>${resetToken}</a>`,
  });

  // Server response:
  return res.status(200).json({
    status: 'success',
    message: 'Password reset link had been sent to email.',
    resetToken,
  });
});

// Reset password:
exports.resetPassword = catchAsync(async (req, res, next) => {
  // Veriables:
  const { password, passwordConfirm } = req.body,
    { passwordResetToken } = req.params;
  if (!password || !passwordConfirm || !passwordResetToken)
    return next(new AppError(400, 'Reset password reqest could not be submitted.'));

  // Hash token:
  const hash = crypto.createHash('sha256').update(passwordResetToken).digest('hex');

  // Find User:
  const user = await User.findOne({ passwordResetToken: hash }).select('+password');
  if (!user || user.passwordResetTokenExpiers < Date.now())
    return next(new AppError(400, 'Reset password reqest could not be submitted.'));

  // Check same password:
  if (await user.checkPassword(password, user.password))
    return next(
      new AppError(400, 'This password has already been use, try a diffrent one.')
    );

  // Change password:
  user.password = password;
  user.passwordConfirm = passwordConfirm;
  await user.save();

  // Server response:
  return res.status(200).json({
    status: 'success',
    message: 'Password has changed successfully, you may now login.',
  });
});
