const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Acceso denegado. Token faltante o mal formado' });
  }

  const token = authHeader.split(' ')[1]; // extrae solo el token

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contiene { id: userId }
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido' });
  }
};

module.exports = verifyToken;