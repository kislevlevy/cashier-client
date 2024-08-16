// Imports:
const mongoose = require('mongoose');
const Product = require('./productModel');

// Schema
const feedbackSchema = new mongoose.Schema({
  rating: {
    type: Number,
    min: [1, 'Rating must be at least 1.'],
    max: [10, 'Rating cannot exceed 10.'],
    required: [true, 'Rating is required.'],
  },
  body: {
    type: String,
    maxLength: [300, 'Feedback body cannot exceed 300 characters.'],
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Author is required.'],
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product',
    required: [true, 'Product ID is required.'],
  },
});

// Middleware:
feedbackSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'author',
    select: 'name',
  });
  next();
});

feedbackSchema.post('save', async function () {
  // Calculate new average rating:
  const product = await Product.findById(this.product);
  const avgRating =
    product.feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0) /
    product.feedbacks.length;

  // Update product's average rating:
  await Product.findByIdAndUpdate(product._id, { avgRating });
});

// Export
const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;
