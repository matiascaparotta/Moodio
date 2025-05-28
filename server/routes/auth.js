// server/routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

// Configuración de multer para guardar imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Asegúrate de que esta carpeta exista
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  }
});

const upload = multer({ storage });

// 📝 Registro con imagen obligatoria
router.post('/register', upload.single('image'), async (req, res) => {
  try {
    const { fullName, lastName, username, birthYear, email, password } = req.body;
    const image = req.file;

    if (!image) {
      return res.status(400).json({ error: 'La imagen de perfil es obligatoria' });
    }

    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(400).json({ error: 'Email ya registrado' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      lastName,
      username,
      birthYear,
      email,
      password: hashedPassword,
      profileImage: image.filename
    });

    res.status(201).json({ message: 'Usuario creado con éxito', userId: newUser.id });
  } catch (error) {
    console.error('❌ Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

// 🔐 Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validación básica
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña requeridos' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, userId: user.id });
  } catch (error) {
    console.error('❌ Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

// 👇 Exportar rutas
module.exports = router;