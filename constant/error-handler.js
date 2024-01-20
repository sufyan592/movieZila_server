exports.sendError = (res, statusCode, status, message) => {
  res.status(statusCode).json({
    status: status,
    message: message,
  });
};
