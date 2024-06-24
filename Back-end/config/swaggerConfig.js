const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Dance Club Junia',
      version: '0.1.5',
      description: "API documentation pour Dance Club Junia \n Token dispo 1000 heures :\nStudent (ID 7) :\neyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywidXNlclR5cGUiOiJzdHVkZW50IiwiaWF0IjoxNzE4NjcxOTg3LCJleHAiOjE3MjIyNzE5ODd9.iMJdk2qWKm_RCpdD9bIR9SoT6pnkIWEHLoQBQPORUyc\nTeacher (ID 16) :\neyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsInVzZXJUeXBlIjoidGVhY2hlciIsImlhdCI6MTcxODY3MTc2NywiZXhwIjoxNzIyMjcxNzY3fQ.XPKy_3mprdoYb5OHFTZGRKUA2C3W0mCw9-jkGAVdiWI\nAdmin (ID 15) :\neyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInVzZXJUeXBlIjoiYWRtaW4iLCJpYXQiOjE3MTg2NzE4ODUsImV4cCI6MTcyMjI3MTg4NX0.u6CrsHeqtqO8abl_F7psAebhWuBBWoQO7jVPUnW1L90 ",
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
