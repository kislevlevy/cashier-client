class AppError extends Error {
  constructor(status = 500, message) {
    super(message);
    this.status = status;
  }
}

module.exports = AppError;
