const { expect } = require('chai');
const request = require('supertest');

const api = request(process.env.API_BASE_URL || 'http://localhost:3000');

describe('API path coverage', () => {
  let token;

  it('GET /api/health returns the API status', async () => {
    const response = await api.get('/api/health');

    expect(response.status).to.equal(200);
    expect(response.body.status).to.equal('UP');
    expect(response.body.timestamp).to.be.a('string');
  });

  it('POST /api/register creates the documented sample user', async () => {
    const response = await api.post('/api/register').send({
      username: 'newuser',
      password: 'Password123!',
      name: 'New User',
    });

    expect(response.status).to.equal(201);
    expect(response.body).to.include({ username: 'newuser', name: 'New User' });
    expect(response.body.id).to.be.a('number');
  });

  it('POST /api/login returns a token for the seeded user', async () => {
    const response = await api.post('/api/login').send({
      username: 'jdoe',
      password: 'Password123!',
    });

    expect(response.status).to.equal(200);
    expect(response.body.token).to.be.a('string').and.not.empty;
    token = response.body.token;
  });

  it('POST /api/checkout processes the documented cash cart', async () => {
    const response = await api
      .post('/api/checkout')
      .set('Authorization', `Bearer ${token}`)
      .send({
        items: [
          { productId: 1, quantity: 1 },
          { productId: 2, quantity: 2 },
        ],
        paymentMethod: 'cash',
      });

    expect(response.status).to.equal(200);
    expect(response.body).to.include({ paymentMethod: 'cash', subtotal: 191, discount: 19.1, total: 171.9 });
    expect(response.body.items).to.have.lengthOf(2);
  });
});