// Imports:
const express = require('express');
const router = express.Router({ mergeParams: true });

const {
  createFeedback,
  getFeedbacks,
  setCreateFeedback,
} = require('../controllers/feedbackController');
const { checkToken, restrictByRole } = require('../controllers/authController');

// Routing:
router
  .route('/')
  .post(
    checkToken,
    restrictByRole('premium', 'admin'),
    setCreateFeedback,
    createFeedback
  )
  .get(checkToken, getFeedbacks);

// Export module:
module.exports = router;
