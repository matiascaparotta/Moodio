const express = require('express');
const router = express.Router();
const Emotion = require('../models/Emotion');

// GET todas las emociones
router.get('/', async (req, res) => {
  try {
    const emotions = await Emotion.findAll({ order: [['timestamp', 'DESC']] });
    res.json(emotions);
  } catch (err) {
    console.error('❌ Error al obtener emociones:', err);
    res.status(500).json({ error: 'Error al obtener emociones' });
  }
});

// POST nueva emoción
router.post('/', async (req, res) => {
  const { message, feeling } = req.body;
  try {
    const emotion = await Emotion.create({ message, feeling });
    res.status(201).json(emotion);
  } catch (err) {
    res.status(500).json({ error: 'Error al guardar emoción' });
  }
});

// PATCH para reaccionar
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
    res.status(500).json({ error: 'Error al reaccionar' });
  }
});

module.exports = router;