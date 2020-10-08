exports.wrapTryCatch = (callback) => (req, res, next) => {
  return callback(req, res, next).catch((err) => next(err));
};
