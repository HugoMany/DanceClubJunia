const express = require('express');
const path = require('path');
const studentRoutes = require('./routes/studentRoutes');
const userRoutes = require('./routes/userRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
//const authRoutes = require('./routes/authRoutes');
//const adminTeacherRoutes = require('./routes/adminTeacherRoutes');

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api/student', studentRoutes);
app.use('/api/user', userRoutes);
app.use('/api/teacher', teacherRoutes);
//app.use('/api/auth', authRoutes);
//app.use('/api/adminTeacher', adminTeacherRoutes);

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
