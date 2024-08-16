// Imports:
const multer = require('multer');
const sharp = require('sharp');

const Product = require('../models/productModel');
const AppError = require('../utils/appError');
const {
  getDocs,
  getDocById,
  newDoc,
  editDocById,
  deleteDocById,
} = require('../utils/methodesFactory');
const catchAsync = require('../utils/catchAsync');

// Multer - image upload:
const memoryStorage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  const errStr = 'The file is not compatible with this application.';
  if (!file.mimetype.startsWith('image')) cb(new AppError(404, errStr), false);
  else cb(null, true);
};
const upload = multer({ fileFilter, memoryStorage });

//////////////////////////////////////////////////
// Get all products by query:
exports.getProducts = getDocs(Product, 'products');

// GET product by ID:
exports.getProductById = getDocById(Product, 'product');

// New Product:
exports.newProduct = newDoc(Product, 'newProduct');

// Edit product by id:
exports.editProductById = editDocById(Product, 'product');

// Delete product by id:
exports.deleteProductById = deleteDocById(Product, 'product');

// Upload image:
exports.uploadImage = upload.single('img');

exports.editImageToUpload = catchAsync(async (req, res, next) => {
  const filePath = `public/img/products/${req.doc._id}.jpeg`;

  await sharp(req.file.buffer)
    .toFormat('jpeg')
    .jpeg({ quality: 80 })
    .toFile(filePath);

  await Product.findByIdAndUpdate(req.doc._id, {
    img: `${process.env.BACK_END}/${filePath}`,
  });

  // Server response:
  return res.status(200).json({
    status: 'success',
    product: req.doc,
  });
});
