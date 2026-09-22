// In-memory product catalog, seeded with 3 products.
const products = [
  { id: 1, name: 'Running Shoes', price: 120.0 },
  { id: 2, name: 'Sports T-Shirt', price: 35.5 },
  { id: 3, name: 'Training Shorts', price: 28.0 },
];

function findById(id) {
  return products.find((p) => p.id === id);
}

function findAll() {
  return products;
}

module.exports = { products, findById, findAll };
