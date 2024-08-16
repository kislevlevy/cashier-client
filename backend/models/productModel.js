// Imports:
const mongoose = require('mongoose');
const validator = require('validator');

// Schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: [true, 'A product must have a name.'],
      validate: {
        validator: (val) =>
          validator.isAlphanumeric(val, ['en-US'], { ignore: ' ' }),
        message: 'Product name may only contain characters.',
      },
    },
    price: {
      type: Number,
      required: [true, 'A product must have a price.'],
      min: [1, "price can't be negative."],
    },
    cat: {
      type: String,
      required: [true, 'A product must have a category.'],
      enum: {
        values: ['food', 'clothing', 'animals'],
        message: "Category can be either: 'food', 'clothing', or 'animals'.",
      },
    },
    img: {
      type: String,
      default: 'https://static.thenounproject.com/png/187803-200.png',
    },
    quantity: {
      type: Number,
      min: [1, 'Product has to have at lease one in stock.'],
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    id: {
      type: mongoose.Schema.ObjectId,
      select: false,
    },
    avgRating: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual fields:
productSchema.virtual('feedbacks', {
  ref: 'Feedback',
  foreignField: 'product',
  localField: '_id',
});

// Middleware:
productSchema.pre(/^findOne/, function (next) {
  this.populate('feedbacks');
  next();
});

// Export
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
