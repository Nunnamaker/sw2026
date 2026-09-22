const express = require('express');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const authRoutes = require('./routes/authRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
const healthRoutes = require('./routes/healthRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());

const swaggerDocument = YAML.load(path.join(__dirname, '..', 'swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api', authRoutes);
app.use('/api', checkoutRoutes);
app.use('/api', healthRoutes);

app.use(errorHandler);

module.exports = app;
