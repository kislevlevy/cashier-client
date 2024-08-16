// Imports:
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const productRoutes = require('./routes/productRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const usersRoutes = require('./routes/userRoutes');
const AppError = require('./utils/appError');

// App initiation:
const app = express();

// Middleware:
app.use(cookieParser());
app.use('/public', express.static('public'));
app.use(
  cors({
    origin: process.env.FRONT_END,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());
app.use(morgan('dev'));

// Routes middleware:
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/feedbacks', feedbackRoutes);

// All routes:
app.all('*', (req, res, next) => {
  return next(new AppError(404, 'Path does not exist.'));
});

// Error handler:
app.use((err, req, res, next) => {
  console.log(err);

  res.status(err.status).json({
    status: 'fail',
    message: err.message,
  });
});

// Export:
module.exports = app;
