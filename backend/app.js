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

// Cors Configuration:
const corsWhiteList = [process.env.FRONT_END, process.env.FRONT_END + '/'];
const corsConfig = {
  origin: (origin, callback) => {
    if (!origin || corsWhiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middleware:
app.use('/public', express.static('public'));
app.use(cors(corsConfig));
app.use(cookieParser());
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === 'prod' ? 'combined' : 'dev'));

// Routes middleware:
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/products', productRoutes);
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
