const express = require('express');
const cookieParser = require('cookie-parser');
const { swaggerUi, swaggerSpec } = require('./config/swaggerConfig');
const cors = require('cors'); 
const authRoutes = require('./routes/authRoutes');

const port = 3000;
const app = express();
const studentRoutes = require('./routes/studentRoutes');
const userRoutes = require('./routes/userRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const adminRoutes = require('./routes/adminRoutes');
const guestRoutes = require('./routes/guestRoutes');
const adminTeacherRoutes = require('./routes/adminTeacherRoutes');

app.use(express.json());
app.use(cookieParser());

app.use('/api/student', studentRoutes);
app.use('/api/user', userRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/guest', guestRoutes);
app.use('/api/adminTeacher', adminTeacherRoutes);
app.use('/api/auth', authRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// CORS configuration
const corsOptions = {
  origin: '*', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true
};

app.options('/api/guest/login', function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.end();
});

app.use(cors(corsOptions)); 

// app.use(express.static(path.join(__dirname, '../frontend/build')));

/*app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});*/

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
