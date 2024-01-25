exports.sendSuccess = (res, statusCode, status, message, data = null) => {
  res.status(statusCode).json({
    status: status,
    message: message,
    data: data,
  });
};

exports.sendError = (res, statusCode, status, message) => {
  res.status(statusCode).json({
    status: status,
    message: message,
  });
};
