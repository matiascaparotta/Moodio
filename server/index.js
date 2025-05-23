const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const emotionRoutes = require('./routes/emotions');
app.use('/api/emotions', emotionRoutes);

sequelize.authenticate()
  .then(() => console.log('✅ Conexión a MySQL exitosa'))
  .catch((err) => console.error('❌ Error al conectar a la base de datos:', err));

sequelize.sync()
  .then(() => console.log('📦 Tablas sincronizadas'))
  .catch((err) => console.error('❌ Error al sincronizar las tablas:', err));

app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});