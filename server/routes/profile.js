// routes/profile.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');

// Configuración de multer para subida de imagen
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, `profile-${Date.now()}${path.extname(file.originalname)}`);
  }
});
const upload = multer({ storage });

// ✅ Obtener perfil del usuario autenticado
router.get('/', verifyToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener perfil' });
  }
});

// ✅ Actualizar datos personales del perfil
router.put('/', verifyToken, async (req, res) => {
  const { fullName, lastName, username, birthYear } = req.body;

  try {
    await User.update(
      { fullName, lastName, username, birthYear },
      { where: { id: req.user.id } }
    );
    res.json({ message: 'Perfil actualizado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar perfil' });
  }
});

// ✅ Subir o actualizar imagen de perfil
router.post('/upload', verifyToken, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se subió ninguna imagen' });
    }

    await User.update(
      { profileImage: req.file.filename },
      { where: { id: req.user.id } }
    );

    res.json({
      message: 'Imagen de perfil actualizada',
      imageUrl: `/uploads/${req.file.filename}`
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al subir imagen de perfil' });
  }
});

module.exports = router;