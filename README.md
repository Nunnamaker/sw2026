# sw2026

AI Driven API Test and Automation tutorial

## Description

REST API for a simple e-commerce built with Node.js and Express. It allows users to register,
log in to receive a JWT token, and check out a cart with cash or credit card. All data (users,
products, orders) lives in memory — nothing is persisted to a database.

## Installation

Requirements: [Node.js](https://nodejs.org/) 18+ and npm.

```bash
npm install
```

## How to Run

```bash
npm start
```

The API starts on `http://localhost:3000` by default (override with the `PORT` environment
variable). Interactive API docs are served at `http://localhost:3000/api-docs`.

## Rules

- Checkout accepts only `cash` or `credit_card` as the payment method.
- Paying with `cash` gives a 10% discount on the order subtotal.
- Only authenticated users (valid JWT in the `Authorization` header) can check out.

## Existent Data

The API is seeded in memory with 3 users and 3 products on startup.

### Users

All seed users share the password `Password123!`.

| id | username | name       |
|----|----------|------------|
| 1  | jdoe     | John Doe   |
| 2  | asmith   | Anna Smith |
| 3  | mjones   | Mary Jones |

### Products

| id | name           | price  |
|----|----------------|--------|
| 1  | Running Shoes  | 120.00 |
| 2  | Sports T-Shirt | 35.50  |
| 3  | Training Shorts| 28.00  |

## How to Use the REST API

Base path: `/api`

### 1. Healthcheck

```
GET /api/health
```

### 2. Register

```
POST /api/register
Content-Type: application/json

{
  "username": "newuser",
  "password": "Password123!",
  "name": "New User"
}
```

### 3. Login

```
POST /api/login
Content-Type: application/json

{
  "username": "jdoe",
  "password": "Password123!"
}
```

Response contains a `token` field — use it as a Bearer token for checkout.

### 4. Checkout (requires authentication)

```
POST /api/checkout
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [
    { "productId": 1, "quantity": 1 },
    { "productId": 2, "quantity": 2 }
  ],
  "paymentMethod": "cash"
}
```

### API Documentation (Swagger)

The full OpenAPI specification is available in [swagger.yaml](swagger.yaml) and rendered via
Swagger UI at `GET /api-docs` once the server is running.
