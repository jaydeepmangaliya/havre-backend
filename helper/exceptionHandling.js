// Global error handler middleware
export const globalErrorHandler = (err, req, res, next) => {
  console.error("Global Error Handler:", err.stack);

  let status = err.status || err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Handle different types of errors
  if (err.name === "ValidationError") {
    status = 400;
    message = "Validation Error";
  } else if (err.name === "CastError") {
    status = 400;
    message = "Invalid ID format";
  } else if (err.code === 11000) {
    status = 409;
    message = "Duplicate field value";
  } else if (err.name === "JsonWebTokenError") {
    status = 401;
    message = "Invalid token";
  } else if (err.name === "TokenExpiredError") {
    status = 401;
    message = "Token expired";
  }

  // Send error response
  res.status(status).json({
    success: false,
    error: {
      message: message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    },
  });
};

// Handle 404 - Page Not Found
export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    error: {
      message: `Route ${req.originalUrl} not found`,
    },
  });
};

// Async error wrapper to catch async errors
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Custom error class
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
