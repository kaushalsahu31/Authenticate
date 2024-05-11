const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'test',
      version: '1.0.0',
      description: 'test',
    },
  },
  apis: ['./config/swagger-docs.js'],
};

const specs = swaggerJsdoc(options);

module.exports = specs;