const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

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
});

module.exports = Emotion