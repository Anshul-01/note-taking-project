const express = require('express');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/noteRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // Add your Swagger JSON documentation here

require('dotenv').config();

const app = express();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', noteRoutes);

module.exports = app;
