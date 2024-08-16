// Imports:
const express = require('express');

const feedbackRoutes = require('./feedbackRoutes');
const {
  getProducts,
  newProduct,
  getProductById,
  editProductById,
  deleteProductById,
  uploadImage,
  editImageToUpload,
} = require('../controllers/productsController');
const { checkToken, restrictByRole } = require('../controllers/authController');

// Initiation for router:
const router = express.Router();

// Routing:
router.use('/:id/feedbacks', feedbackRoutes);
router
  .route('/')
  .get(checkToken, getProducts)
  .post(
    checkToken,
    restrictByRole('premium', 'admin'),
    uploadImage,
    newProduct,
    editImageToUpload
  );

router
  .route('/:id')
  .get(checkToken, getProductById)
  .patch(
    checkToken,
    restrictByRole('premium', 'admin'),
    uploadImage,
    editProductById,
    editImageToUpload
  )
  .delete(checkToken, restrictByRole('admin'), deleteProductById);

// Export router:
module.exports = router;
