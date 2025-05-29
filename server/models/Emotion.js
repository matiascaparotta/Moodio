// server/models/Emotion.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Emotion = sequelize.define('Emotion', {
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  feeling: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  support: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  seen: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  isAnonymous: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Asociación con User
Emotion.belongsTo(User, { foreignKey: 'userId' });

module.exports = Emotion;