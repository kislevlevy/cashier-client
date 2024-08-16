// Imports:
const Feedback = require('../models/feedbackModel');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { getDocs, newDoc } = require('../utils/methodesFactory');

//////////////////////////////////////////////////
// Post new feedback: (2 functions:)
exports.setCreateFeedback = catchAsync(async (req, res, next) => {
  // Assign author to feedback:
  req.body.author = req.user._id;
  const { product, author } = req.body;

  // Check if user posted two reviews for the same product:
  const usersFeedback = await Feedback.find({ author, product });
  if (usersFeedback.length > 0)
    return next(
      new AppError(403, "You can't post two reviews for the same product.")
    );

  next();
});
exports.createFeedback = newDoc(Feedback, 'newFeedback');

// Get feedback by ID:
exports.getFeedbacks = getDocs(Feedback, 'feedbacks');
