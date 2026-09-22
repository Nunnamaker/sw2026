const productModel = require('../models/productModel');

const PAYMENT_METHODS = ['cash', 'credit_card'];
const CASH_DISCOUNT_RATE = 0.1;

function checkout({ items, paymentMethod }) {
  if (!Array.isArray(items) || items.length === 0) {
    const error = new Error('items must be a non-empty array');
    error.status = 400;
    throw error;
  }

  if (!PAYMENT_METHODS.includes(paymentMethod)) {
    const error = new Error(`paymentMethod must be one of: ${PAYMENT_METHODS.join(', ')}`);
    error.status = 400;
    throw error;
  }

  const orderItems = items.map(({ productId, quantity }) => {
    const product = productModel.findById(productId);
    if (!product) {
      const error = new Error(`product ${productId} not found`);
      error.status = 404;
      throw error;
    }
    if (!Number.isInteger(quantity) || quantity <= 0) {
      const error = new Error(`quantity for product ${productId} must be a positive integer`);
      error.status = 400;
      throw error;
    }

    const subtotal = product.price * quantity;
    return {
      productId: product.id,
      name: product.name,
      unitPrice: product.price,
      quantity,
      subtotal,
    };
  });

  const subtotal = orderItems.reduce((sum, item) => sum + item.subtotal, 0);
  const discount = paymentMethod === 'cash' ? subtotal * CASH_DISCOUNT_RATE : 0;
  const total = subtotal - discount;

  return {
    items: orderItems,
    paymentMethod,
    subtotal,
    discount,
    total,
  };
}

module.exports = { checkout, PAYMENT_METHODS };
