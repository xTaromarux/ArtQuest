const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node Service API',
      version: '1.0.0',
      description: 'API for Node Service in ArtQuest project'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local server'
      }
    ]
  },
  apis: ['./src/routes/*.js']
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
