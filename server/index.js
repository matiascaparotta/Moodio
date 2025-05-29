// server/index.js
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const sequelize = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3001;

// 🛡️ Middlewares
app.use(cors());

// ✅ Procesar JSON y formularios comunes (no imágenes)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 📁 Servir archivos estáticos (como imágenes de perfil)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 📦 Rutas
const emotionRoutes = require('./routes/emotions');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');

app.use('/api/emotions', emotionRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

// 🛠️ Conexión a la base de datos
sequelize.authenticate()
  .then(() => console.log('✅ Conexión a MySQL exitosa'))
  .catch((err) => console.error('❌ Error al conectar a la base de datos:', err));

// 🔁 Sincronizar tablas automáticamente con alteraciones
sequelize.sync({ alter: true })
  .then(() => console.log('📦 Tablas sincronizadas'))
  .catch((err) => console.error('❌ Error al sincronizar las tablas:', err));

// 🚀 Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});