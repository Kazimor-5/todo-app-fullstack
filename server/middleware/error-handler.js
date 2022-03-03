const { CustomAPIError } = require('../errors/custom-errors');

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);

  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  return res
    .status(500)
    .json({ msg: 'Une erreur est survenue, veuillez réessayer plus tard' });
};

module.exports = errorHandlerMiddleware;
