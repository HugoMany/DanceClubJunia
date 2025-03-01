const express = require('express');
const cookieParser = require('cookie-parser');
const { swaggerUi, swaggerSpec } = require('./config/swaggerConfig');
const cors = require('cors'); 
const authRoutes = require('./routes/authRoutes');
const { authorize } = require('./middlewares/auth');

const port = 3000;
const app = express();
const studentRoutes = require('./routes/studentRoutes');
const userRoutes = require('./routes/userRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const adminRoutes = require('./routes/adminRoutes');
const guestRoutes = require('./routes/guestRoutes');

// CORS configuration
const corsOptions = {
  origin: '*', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true
};

app.use(cors(corsOptions)); 

app.use(express.json());
app.use(cookieParser());

app.use('/api/guest', guestRoutes);
app.use('/api/user', authorize(['student', 'teacher', 'admin']), userRoutes);
app.use('/api/student', authorize(['student', 'teacher', 'admin']), studentRoutes);
app.use('/api/teacher', authorize(['teacher', 'admin']), teacherRoutes);
app.use('/api/admin', authorize(['admin']), adminRoutes);
app.use('/api/auth', authRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});