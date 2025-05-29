const Emotion = require('../models/Emotion');

const createEmotion = async (req, res) => {
  try {
    const { message, feeling } = req.body;

    if (!message || !feeling) {
      return res.status(400).json({ error: 'Faltan datos requeridos.' });
    }

    const newEmotion = await Emotion.create({ message, feeling });
    res.status(201).json(newEmotion);
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar la emoción.' });
  }
};
const getAllEmotions = async (req, res) => {
  try {
    const emotions = await Emotion.findAll({ order: [['timestamp', 'DESC']] });
    res.status(200).json(emotions);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las emociones.' });
  }
};

module.exports = {
  createEmotion,
  getAllEmotions,
};