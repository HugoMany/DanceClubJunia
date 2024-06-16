const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Dance Club Junia',
      version: '0.1.5',
      description: 'API documentation pour Dance Club Junia \n Token dispo 1000 heures : \nadmin (id 15): eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVHlwZSI6ImFkbWluIiwiaWF0IjoxNzE3NzYxMjY4LCJleHAiOjE3MjEzNjEyNjh9.GjZ4hcki_d0pV9pppZPUETH-O2h2kZG8OeVlVIjcb-g\nteacher (id 16): eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVHlwZSI6InRlYWNoZXIiLCJpYXQiOjE3MTc3NjEzNzgsImV4cCI6MTcyMTM2MTM3OH0.5XEb1NWNQOcs8Dew2cDthVYN1d9M-LqR-VVa-EsTMTM\nstudent (id 8) : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVHlwZSI6InN0dWRlbnQiLCJpYXQiOjE3MTc3NjE0NTEsImV4cCI6MTcyMTM2MTQ1MX0.0JZ5wIHbLYcYyVWvmeVE0HKDMB0k_X23UXfscHQVPWM',
    },
    servers: [
      {
        url: 'http://90.110.227.143', 
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
