const express = require('express');
const path = require('path');
const cors = require('cors'); // Import the cors middleware
const studentRoutes = require('./routes/studentRoutes');
const userRoutes = require('./routes/userRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
// const authRoutes = require('./routes/authRoutes');
const adminTeacherRoutes = require('./routes/adminTeacherRoutes');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const app = express();
const port = 3000;

// CORS configuration
const corsOptions = {
  origin: '*', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions)); 
app.use(express.json());

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'DanceClubJunia',
      version: '0.1'
    },
    servers: [
      {
        url: 'http://90.110.227.143'
      }
    ]
  },
  apis: [
    path.join(__dirname, './routes/*.js')
  ]
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use('/api/student', studentRoutes);
app.use('/api/user', userRoutes);
app.use('/api/teacher', teacherRoutes);
// app.use('/api/auth', authRoutes);
app.use('/api/adminTeacher', adminTeacherRoutes);

// app.use(express.static(path.join(__dirname, '../frontend/build')));

/*app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});*/

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
