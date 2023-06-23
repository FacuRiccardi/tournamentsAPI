class AppError extends Error {
  constructor(appError) {
    super(appError.message);
    this.code = appError.code;
    this.message = appError.message;
  }
}

module.exports = AppError;
