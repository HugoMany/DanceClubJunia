const fs = require('fs');
const https = require('https');
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

// Charger les certificats SSL/TLS auto-signés
const privateKey = fs.readFileSync('./certificate/selfsigned.key', 'utf8');
const certificate = fs.readFileSync('./certificate/selfsigned.crt', 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate
};

/*
// Créer un serveur HTTPS
const httpsServer = https.createServer(credentials, app);

// Démarrer le serveur HTTPS
httpsServer.listen(3000, () => {
  console.log('HTTPS Server running on port 3000');
});

// Optionnel : Rediriger les requêtes HTTP vers HTTPS
const http = require('http');
const httpApp = express();
httpApp.use((req, res) => {
  res.redirect(`https://${req.headers.host}${req.url}`);
});
http.createServer(httpApp).listen(3001, () => {
  console.log('HTTP Server running on port 80, redirecting to HTTPS');
});*/



// app.use(express.static(path.join(__dirname, '../frontend/build')));

/*app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});*/

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
