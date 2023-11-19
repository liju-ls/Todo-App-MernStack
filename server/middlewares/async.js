module.exports = (routeFunc) => {
  return async (req, res, next) => {
    try {
      await routeFunc(req, res);
    } catch (err) {
      next(err);
    }
  };
};
