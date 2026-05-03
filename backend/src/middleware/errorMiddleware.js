function notFoundHandler(req, res, next) {
  res.status(404).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
}

function errorHandler(error, req, res, next) {
  if (error.code === "23505") {
    return res.status(409).json({
      message: "A record with the same unique value already exists"
    });
  }

  if (error.code === "23503") {
    return res.status(400).json({
      message: "A referenced record does not exist"
    });
  }

  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    message: error.message || "Internal server error"
  });
}

module.exports = {
  notFoundHandler,
  errorHandler
};
