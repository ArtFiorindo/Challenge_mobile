const express = require('express');
const app = express();
const cors = require('cors'); 
const userRoutes = require('./routes/userRoutes');
const authMiddleware = require('./middlewares/authMiddleware'); 
const patientRoutes = require('./routes/patientRoutes'); 

app.use(express.json());
app.use(cors());

// Defina as rotas de usuários e pacientes
app.use('/api', userRoutes);
app.use('/api', patientRoutes); 


module.exports = app;
