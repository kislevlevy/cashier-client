// Imports:
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

// Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Name is a required field.'],
    validate: {
      validator: (val) => validator.isAlphanumeric(val, ['en-US'], { ignore: ' ' }),
      message: 'User name may only contain characters',
    },
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    required: [true, 'Email is a required field.'],
    validate: {
      validator: (val) => validator.isEmail(val),
      message: 'Please provide a valid email address.',
    },
  },
  password: {
    type: String,
    select: false,
    minLength: [8, 'Password must contain at least 8  characters or longer.'],
    required: [true, 'Password is a required field.'],
  },
  passwordConfirm: {
    type: String,
    minLength: [8, 'Password must contain at least 8  characters or longer.'],
    required: [true, 'Password confirm is a required field.'],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "Password don't match",
    },
  },
  role: {
    type: String,
    enum: {
      values: ['free', 'premium', 'admin'],
      message: 'The role can only be free, premium admin',
    },
    default: 'free',
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetTokenExpiers: {
    type: Date,
  },
  passwordChangedAt: {
    type: Date,
  },
});

// Middleware:
userSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    this.passwordChangedAt = Date.now();

    this.passwordConfirm = undefined;
    this.passwordResetToken = undefined;
    this.passwordResetTokenExpiers = undefined;

    this.password = await bcrypt.hash(this.password, await bcrypt.genSalt(10));
  }

  next();
});

userSchema.methods.checkPassword = function (password, hash) {
  return bcrypt.compare(password, hash);
};

// Export
const User = mongoose.model('User', userSchema);
module.exports = User;
