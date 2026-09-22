const checkoutService = require('../services/checkoutService');

function checkout(req, res, next) {
  try {
    const order = checkoutService.checkout(req.body);
    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
}

module.exports = { checkout };
