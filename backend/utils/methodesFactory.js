// Imports:
const catchAsync = require('./catchAsync');
const ApiFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');

//////////////////////////////////////////////////
// Get all products by query:
exports.getDocs = (Model, name) =>
  catchAsync(async (req, res, next) => {
    const filter = {};
    if (req.params.id) filter.product = req.params.id;

    const features = new ApiFeatures(req, Model.find())
      .filter()
      .sort()
      .fields()
      .pagination();

    // Fetch filterd docs:
    const docs = await features.res;
    if (!docs || docs.length < 1)
      return next(new AppError(404, 'Filter had returnd 0 results.'));

    // Server response:
    return res.status(200).json({
      status: 'success',
      results: docs.length,
      [name]: docs,
    });
  });

// GET document by ID:
exports.getDocById = (Model, name) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const doc = await Model.findById(id);
    if (!doc)
      return next(
        new AppError(404, `Connot find document with this query - ${id}.`)
      );

    // Server response:
    return res.status(200).json({
      status: 'success',
      [name]: doc,
    });
  });

// New Document:
exports.newDoc = (Model, name) =>
  catchAsync(async (req, res, next) => {
    // Create new product:
    req.doc = await Model.create(req.body);
    if (!req.doc)
      return next(
        new AppError(
          404,
          'Connot create document, check your body for correct layout.'
        )
      );
    if (req.file) return next();

    // Server response:
    return res.status(200).json({
      status: 'success',
      [name]: req.doc,
    });
  });

// Edit document by id:
exports.editDocById = (Model, name) =>
  catchAsync(async (req, res, next) => {
    req.doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!req.doc) return next(new AppError(404, 'Document ID was not found.'));

    if (req.file) return next();

    // Server response:
    return res.status(200).json({
      status: 'success',
      [name]: req.doc,
    });
  });

// Delete document by id:
exports.deleteDocById = (Model, name) =>
  catchAsync(async (req, res, next) => {
    const deletedDoc = await Model.findByIdAndDelete(req.params.id);
    if (!deletedDoc) return next(new AppError(404, 'Document ID was not found.'));

    // Server response:
    return res.status(204).json({
      status: 'success',
      [name]: null,
    });
  });
