const express = require('express');
const router = express.Router();
const Emotion = require('../models/Emotion');
const User = require('../models/User');
const verifyToken = require('../middlewares/verifyToken');

// 🧠 Asociación: una emoción pertenece a un usuario
Emotion.belongsTo(User, { foreignKey: 'userId' });

/* ────────────────────────────────────────────────────────
 🔓 1. Obtener todas las emociones públicas (para el feed)
──────────────────────────────────────────────────────── */
router.get('/', async (req, res) => {
  try {
    const emotions = await Emotion.findAll({
      where: { isAnonymous: false },
      order: [['timestamp', 'DESC']],
      include: { model: User, attributes: ['username'] },
    });
    res.json(emotions);
  } catch (err) {
    console.error('❌ Error al obtener emociones:', err);
    res.status(500).json({ error: 'Error al obtener emociones' });
  }
});

/* ────────────────────────────────────────────────────────
 🔐 2. Crear nueva emoción (requiere login, múltiples por día)
──────────────────────────────────────────────────────── */
router.post('/', verifyToken, async (req, res) => {
  const { message, feeling, isAnonymous } = req.body;

  // Validación básica
  if (!message || !feeling || typeof isAnonymous !== 'boolean') {
    return res.status(400).json({ error: 'Datos incompletos o inválidos' });
  }

  try {
    const emotion = await Emotion.create({
      message,
      feeling,
      isAnonymous,
      userId: req.user.id,
    });

    res.status(201).json(emotion);
  } catch (err) {
    console.error('❌ Error al guardar emoción:', err);
    res.status(500).json({ error: 'Error al guardar emoción' });
  }
});

/* ────────────────────────────────────────────────────────
 🔐 3. Emociones del usuario autenticado (historial privado)
──────────────────────────────────────────────────────── */
router.get('/mine', verifyToken, async (req, res) => {
  try {
    const emotions = await Emotion.findAll({
      where: { userId: req.user.id },
      order: [['timestamp', 'DESC']],
      include: { model: User, attributes: ['username'] },
    });
    res.json(emotions);
  } catch (err) {
    console.error('❌ Error al obtener tus emociones:', err);
    res.status(500).json({ error: 'Error al obtener tus emociones' });
  }
});

/* ────────────────────────────────────────────────────────
 🔐 4. Verificación: ¿ya escribió una emoción hoy?
──────────────────────────────────────────────────────── */
// (esto ahora siempre devolverá false si hay varias entradas por día)
router.get('/check/today', verifyToken, async (req, res) => {
  res.json({ hasWrittenToday: false });
});

/* ────────────────────────────────────────────────────────
 🔓 5. Ver emociones públicas de un usuario (perfil público)
──────────────────────────────────────────────────────── */
router.get('/user/:id', async (req, res) => {
  try {
    const emotions = await Emotion.findAll({
      where: {
        userId: req.params.id,
        isAnonymous: false,
      },
      order: [['timestamp', 'DESC']],
      include: { model: User, attributes: ['username'] },
    });
    res.json(emotions);
  } catch (error) {
    console.error('❌ Error al obtener emociones públicas del usuario:', error);
    res.status(500).json({ error: 'Error al obtener emociones públicas' });
  }
});

/* ────────────────────────────────────────────────────────
 ❤️ 6. Reaccionar a una emoción (support o seen)
──────────────────────────────────────────────────────── */
router.patch('/:id/react', async (req, res) => {
  const { type } = req.body;
  const { id } = req.params;

  try {
    const emotion = await Emotion.findByPk(id);
    if (!emotion) return res.status(404).json({ error: 'No encontrado' });

    if (type === 'support') emotion.support += 1;
    else if (type === 'seen') emotion.seen += 1;
    else return res.status(400).json({ error: 'Tipo inválido' });

    await emotion.save();
    res.json(emotion);
  } catch (error) {
    console.error('❌ Error al reaccionar:', error);
    res.status(500).json({ error: 'Error al reaccionar' });
  }
});

module.exports = router;